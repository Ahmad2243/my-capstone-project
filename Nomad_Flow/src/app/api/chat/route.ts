import { createGoogle } from '@ai-sdk/google';
import { streamText, tool, convertToModelMessages } from 'ai';
import { z } from 'zod';
import { aiConfig } from '../../../lib/ai/config';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

const google = createGoogle({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const destinationWeatherTool = tool({
  description: 'Get current weather and packing advice for a destination city',
  inputSchema: z.object({
    location: z.string().describe('The name of the city, e.g. Tokyo, Paris, London'),
    units: z.enum(['celsius', 'fahrenheit']).default('celsius').optional().describe('Temperature unit preference'),
  }),
  execute: async ({ location, units }) => {
    const cityName = location || 'Destination';
    const isFahrenheit = units === 'fahrenheit';
    return {
      location: cityName.charAt(0).toUpperCase() + cityName.slice(1),
      temperature: isFahrenheit ? 72 : 22,
      condition: 'Partly Cloudy',
      humidity: '55%',
      windSpeed: isFahrenheit ? '7 mph' : '12 km/h',
      recommendation: 'Pack a light jacket and comfortable walking shoes for the evening breeze.',
    };
  },
});

const FALLBACK_ITINERARY = {
  title: '3-Day Sample Itinerary — Fallback',
  days: [
    { day: 'Day 1', title: 'Arrival & Local Exploration', activities: ['Check in', 'Walk around the neighborhood', 'Try a local cafe'] },
    { day: 'Day 2', title: 'Highlights Tour', activities: ['Morning sightseeing', 'Local market visit', 'Sunset viewpoint'] },
    { day: 'Day 3', title: 'Departure', activities: ['Relaxed morning', 'Pack & depart'] },
  ],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // If request contains a simple prompt and Anthropic key is set, use Anthropic Claude
    if (typeof body.prompt === 'string') {
      const prompt = body.prompt.trim();
      if (!prompt) return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });

      const anthropicKey = process.env.ANTHROPIC_API_KEY;
      if (!anthropicKey) {
        return NextResponse.json({ fallback: true, itinerary: FALLBACK_ITINERARY, note: 'Anthropic API key missing' });
      }

      try {
        const anthropicRes = await fetch('https://api.anthropic.com/v1/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicKey,
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            prompt: `User: ${prompt}\n\nAssistant:`,
            max_tokens_to_sample: 800,
            temperature: 0.2,
          }),
        });

        if (!anthropicRes.ok) {
          const text = await anthropicRes.text();
          console.error('Anthropic API error', anthropicRes.status, text);
          return NextResponse.json({ fallback: true, itinerary: FALLBACK_ITINERARY, note: 'Anthropic API error' });
        }

        const data = await anthropicRes.json();
        // anthorpic response may include 'completion' or 'completion' field
        const reply = data.completion || data.completion?.[0] || data.text || data.output || JSON.stringify(data);
        return NextResponse.json({ fallback: false, reply });
      } catch (err) {
        console.error('Anthropic request failed', err);
        return NextResponse.json({ fallback: true, itinerary: FALLBACK_ITINERARY, note: 'Anthropic request failed' });
      }
    }

    // Otherwise, assume the client is using the richer messages + tools path (existing Google implementation)
    if (Array.isArray(body.messages)) {
      try {
        const modelMessages = await convertToModelMessages(body.messages);

        const result = streamText({
          model: google('gemini-3.7-flash'),
          system: aiConfig.systemPrompt,
          messages: modelMessages,
          tools: {
            destinationWeatherTool,
            getDestinationWeather: destinationWeatherTool,
          },
        });

        return result.toUIMessageStreamResponse();
      } catch (err: any) {
        console.error('Google stream error', err);
        return new Response(JSON.stringify({ error: err?.message || 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
    }

    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  } catch (err: any) {
    console.error('Chat route unexpected error', err);
    return NextResponse.json({ fallback: true, itinerary: FALLBACK_ITINERARY, note: 'Unexpected server error' }, { status: 500 });
  }
}
