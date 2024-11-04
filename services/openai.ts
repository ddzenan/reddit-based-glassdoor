import { openaiClient } from "@/lib/openai";
import ChatCompletion from "openai";
import { RedditPostWithComments, RedditComment } from "@/types";

/**
 * Represents the response from the OpenAI chat completion API.
 * This type encapsulates the structure of the chat completion response,
 * including the generated messages and any associated metadata.
 *
 * @see ChatCompletion.Chat.Completions.ChatCompletion - Original type definition from the OpenAI library.
 */
type ChatCompletionResponse = ChatCompletion.Chat.Completions.ChatCompletion;

const MODEL = "gpt-3.5-turbo";

const SENTIMENTS = {
  "0": "Positive",
  "1": "Neutral",
  "2": "Negative",
};
const SENTIMENTS_TEMPERATURE = 0.3;
const SENTIMENTS_MAX_TOKENS = 100;

/**
 * Analyzes the sentiments of Reddit posts and their comments using OpenAI.
 *
 * @param {RedditPostWithComments[]} postsWithComments - Array of Reddit posts with comments.
 * @param companyName - The name of the company to analyze sentiments for.
 *                      This parameter is optional; if not provided,
 *                      sentiment analysis will not be focused on a specific company.
 * @returns {Promise<RedditPostWithComments[]>} - Array of posts with associated sentiment analysis.
 */
export async function analyzeSentiments(
  postsWithComments: RedditPostWithComments[],
  companyName?: string
): Promise<RedditPostWithComments[]> {
  const prompt = generatePromptForSentiments(postsWithComments, companyName);
  const response = await openaiClient.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: SENTIMENTS_TEMPERATURE,
    max_tokens: SENTIMENTS_MAX_TOKENS,
  });

  return parseSentimentResponse(response, postsWithComments);
}

/**
 * Converts an array of Reddit comments to a single text block.
 *
 * @param {RedditComment[]} comments - Array of Reddit comments.
 * @returns {string} - Formatted string representation of comments.
 */
function convertCommentsToText(comments: RedditComment[]): string {
  return comments
    .map((comment, i) => `Comment ${i + 1}: ${comment.text}`)
    .join("\n");
}

/**
 * Converts an array of Reddit posts with comments to a single text block.
 *
 * @param {RedditPostWithComments[]} postsWithComments - Array of Reddit posts with their comments.
 * @returns {string} - Formatted string representation of posts with comments.
 */
function convertPostsWithCommentsToText(
  postsWithComments: RedditPostWithComments[]
): string {
  return postsWithComments
    .map(
      (post, i) =>
        `Post ${i + 1} title: ${post.title}\nPost ${i + 1} body: ${
          post.text
        }\nPost ${i + 1} comments:\n${convertCommentsToText(
          post.comments
        )}\nPost ${i + 1} end.\n\n`
    )
    .join("\n");
}

/**
 * Generates a prompt for OpenAI to perform sentiment analysis on Reddit posts.
 *
 * @param {RedditPostWithComments[]} postsWithComments - Array of Reddit posts with comments.
 * @param companyName - The name of the company to analyze sentiments for.
 *                      This parameter is optional; if not provided,
 *                      sentiment analysis will not be focused on a specific company.
 * @returns {string} - The formatted prompt for OpenAI.
 */
function generatePromptForSentiments(
  postsWithComments: RedditPostWithComments[],
  companyName?: string
): string {
  const companyRelatedPart =
    typeof companyName === "string"
      ? ` related to the employer ${companyName}`
      : "";
  const postsAmount = postsWithComments.length;
  const postsWithCommentsText =
    convertPostsWithCommentsToText(postsWithComments);
  return `Analyze the sentiment${companyRelatedPart} using the ${postsAmount} given Reddit posts with comments, focusing on the experiences of employees/candidates related to salaries, interviews and general working conditions. For each post, please classify the sentiment as either 0 for positive, 1 for neutral, or 2 for negative. Please ensure that you return exactly ${postsAmount} classifications separated by commas without additional characters or words. Posts with comments:\n${postsWithCommentsText}`;
}

/**
 * Parses the sentiment response from OpenAI and maps it to an array of Reddit posts.
 *
 * @param {ChatCompletionResponse} response - The response object from OpenAI containing sentiment analysis data.
 * @param {RedditPostWithComments[]} postsWithComments - Array of Reddit posts with their associated comments.
 * @returns {RedditPostWithComments[]} - Array of Reddit posts with the sentiment analysis result added.
 * @throws Will throw an error if no content is received from OpenAI or if the response index exceeds the array length.
 */
function parseSentimentResponse(
  response: ChatCompletionResponse,
  postsWithComments: RedditPostWithComments[]
): RedditPostWithComments[] {
  const responseContent = response.choices?.[0]?.message?.content;
  if (!responseContent) {
    throw new Error("No content received from OpenAI API.");
  }
  return responseContent
    .trim()
    .split(",")
    .map((sentiment, i) => {
      if (postsWithComments.length <= i) {
        throw new Error(
          `Index out of bounds for sentiment mapping at index ${i}`
        );
      }
      const key = sentiment.trim() as keyof typeof SENTIMENTS;
      return {
        ...postsWithComments[i],
        sentiment: SENTIMENTS[key],
      };
    });
}
