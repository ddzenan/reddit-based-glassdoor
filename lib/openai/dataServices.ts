import { openaiClient } from "@/lib/openai/openaiClient";
import { ChatCompletionResponse } from "@/types";

/**
 * Generates a chat response based on the user's prompt using OpenAI's chat API.
 *
 * @param prompt - The user's prompt or message to send to the OpenAI API.
 * @param config - Configuration for the API call, including model, max_tokens, temperature, etc.
 * @returns A promise that resolves to the API's response, containing the generated chat response.
 */
export async function generateChatResponse(
  prompt: string,
  config: { model: string; max_tokens: number; temperature: number }
): Promise<ChatCompletionResponse> {
  return await openaiClient.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    ...config,
  });
}
