import { google } from "@ai-sdk/google";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
  console.warn(
    "GOOGLE_GENERATIVE_AI_API_KEY is not set. Add it to your .env.local file before running the assistant."
  );
}

/**
 * Shared AI configuration for the Nomad Flow assistant.
 * Centralizing model and generation settings keeps prompts and behavior
 * consistent across routes and components.
 */
export type AIConfig = {
  /**
   * The language model used by the app for itinerary planning and travel guidance.
   * This is the model that powers the Nomad Flow AI assistant.
   */
  model: ReturnType<typeof google>;

  /**
   * System instruction that defines the assistant's identity, expertise, and
   * behavioral expectations for trip planning and itinerary support.
   */
  systemPrompt: string;

  /**
   * Sampling temperature that balances creativity with factual consistency.
   * Lower values keep responses more deterministic while still allowing nuance.
   */
  temperature: number;

  /**
   * Maximum number of tokens the model may generate per response.
   * This helps constrain response length while keeping trip recommendations detailed.
   */
  maxTokens: number;
};

export const aiConfig: AIConfig = {
  model: google("gemini-3.6-flash"),
  systemPrompt: `You are Nomad Flow AI, an expert trip planner and itinerary assistant for a travel-focused capstone application.

Your job is to help users discover destinations, plan practical and enjoyable trips, and structure itineraries that are realistic, personalized, and well-balanced.

Guidelines:
- Be helpful, clear, and concise while still providing useful detail.
- Prioritize traveler logistics: timing, transportation, pacing, accommodation fit, budget considerations, and local experience.
- Suggest realistic day-by-day plans when asked, with clear activity sequencing and practical transitions.
- Balance must-see highlights with downtime, local culture, and accessibility considerations where relevant.
- Ask clarifying questions when the user's preferences are unclear, especially around budget, trip length, travel style, pace, and destination.
- When providing recommendations, explain trade-offs and give actionable next steps.
- Keep responses travel-focused and polished, as if speaking with a professional itinerary consultant.
- Do not invent flights, hotel bookings, or local policies unless the user asks for speculative ideas.

Your tone should feel warm, knowledgeable, and confident without being overly verbose.`,
  temperature: 0.7,
  maxTokens: 1000,
};
