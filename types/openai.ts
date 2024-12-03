import ChatCompletion from "openai";

/**
 * Represents the response from the OpenAI chat completion API.
 * This type encapsulates the structure of the chat completion response,
 * including the generated messages and any associated metadata.
 *
 * @see ChatCompletion.Chat.Completions.ChatCompletion - Original type definition from the OpenAI library.
 */
export type ChatCompletionResponse =
  ChatCompletion.Chat.Completions.ChatCompletion;
