import ChatCompletion from "openai";
import { AnalysisType } from "@/types";

/**
 * Represents the response from the OpenAI chat completion API.
 * This type encapsulates the structure of the chat completion response,
 * including the generated messages and any associated metadata.
 *
 * @see ChatCompletion.Chat.Completions.ChatCompletion - Original type definition from the OpenAI library.
 */
export type ChatCompletionResponse =
  ChatCompletion.Chat.Completions.ChatCompletion;

/**
 * Configuration for a single API request, specifying the model,
 * maximum token limit, and temperature settings.
 *
 * @property {string} model - The name of the model to use for the request.
 * @property {number} max_tokens - The maximum number of tokens allowed for the request.
 * @property {number} temperature - The temperature setting for the model, affecting response randomness.
 */
export type OpenaiApiRequestConfig = {
  model: string;
  max_tokens: number;
  temperature: number;
};
