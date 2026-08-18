import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { aiConfig } from "@/lib/ai/config";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return Response.json(
        {
          error:
            "Missing GOOGLE_GENERATIVE_AI_API_KEY. Add your Gemini API key to a .env.local file in the project root before using the assistant.",
        },
        { status: 500 }
      );
    }

    const result = streamText({
      model: aiConfig.model,
      system: aiConfig.systemPrompt,
      messages: await convertToModelMessages(messages),
      temperature: aiConfig.temperature,
      maxOutputTokens: aiConfig.maxTokens,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error("Chat route error:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate a response. Please check your OpenAI configuration.",
      },
      { status: 500 }
    );
  }
}
