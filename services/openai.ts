import {
  RedditPostWithComments,
  AnalysisType,
  ChatCompletionResponse,
} from "@/types";
import { SENTIMENTS, ANALYSIS_TYPES } from "@/utils/constants";
import { generateChatResponse } from "@/lib/openai/dataServices";

const API_CONFIG = {
  [ANALYSIS_TYPES.sentiments]: {
    model: "gpt-4o-mini",
    max_tokens: 100,
    temperature: 0.3,
  },
  [ANALYSIS_TYPES.companySummary]: {
    model: "gpt-4o-mini",
    max_tokens: 300,
    temperature: 1.0,
  },
};

/**
 * Analyzes Reddit posts and comments based on the specified analysis type.
 *
 * @param analysisType - Specifies the type of analysis to perform, using one of the options
 * in `ANALYSIS_TYPES`, such as `"sentiments"` for sentiment analysis or `"companySummary"`
 * for generating a company summary.
 * @param postsWithComments - Array of Reddit posts with associated comments to analyze.
 * @param companyName - (Optional) The company name, required for company-specific analysis.
 * @returns A promise that resolves to a string (company summary) or an array of posts with sentiment classifications.
 *
 * @throws Error if required data (e.g., company name for companySummary) is missing.
 */
export async function analyzeRedditPosts(
  analysisType: AnalysisType,
  postsWithComments: RedditPostWithComments[],
  companyName?: string
): Promise<string | RedditPostWithComments[]> {
  const prompt = generateAnalysisPrompt(
    analysisType,
    postsWithComments,
    companyName
  );
  const response = await generateChatResponse(prompt, API_CONFIG[analysisType]);
  return parseAnalysisResponse(analysisType, response, postsWithComments);
}

/**
 * Converts an array of Reddit comments to a single text block.
 *
 * @param comments - Array of Reddit comments.
 * @returns Formatted string representation of comments.
 */
function convertCommentsToText(comments: string[]): string {
  return comments
    .map((comment, i) => `Comment ${i + 1}: ${comment}`)
    .join("\n");
}

/**
 * Converts an array of Reddit posts with comments to a single text block.
 *
 * @param postsWithComments - Array of Reddit posts with their comments.
 * @returns Formatted string representation of posts with comments.
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
 * Generates a prompt for analyzing Reddit posts and comments based on the specified analysis type.
 *
 * @param analysisType - Specifies the type of analysis to perform, using one of the options
 * in `ANALYSIS_TYPES`, such as `"sentiments"` for sentiment analysis or `"companySummary"` for
 * generating a company summary.
 * @param postsWithComments - Array of Reddit posts with comments for analysis.
 * @param companyName - (Optional) Name of the company, required for company-specific prompts.
 * @returns A string prompt tailored to the specified analysis type.
 *
 * @throws Error if companyName is missing when analysisType is "companySummary".
 */
function generateAnalysisPrompt(
  analysisType: AnalysisType,
  postsWithComments: RedditPostWithComments[],
  companyName?: string
): string {
  if (
    typeof companyName === "undefined" &&
    analysisType === ANALYSIS_TYPES.companySummary
  )
    throw new Error("Company name is missing.");
  const postsWithCommentsText =
    convertPostsWithCommentsToText(postsWithComments);
  switch (analysisType) {
    case ANALYSIS_TYPES.sentiments:
      const postsAmount = postsWithComments.length;
      const companyRelatedPart =
        typeof companyName === "string"
          ? ` related to the employer ${companyName}`
          : "";
      const sentimentInstructions = Object.entries(SENTIMENTS)
        .map(([key, label]) => `${key} for ${label}`)
        .join(", ");
      return `Analyze the sentiment${companyRelatedPart} using the ${postsAmount} given Reddit posts with comments, focusing on the experiences of employees/candidates related to salaries, interviews and general working conditions. For each post, please classify the sentiment as either ${sentimentInstructions}. Please ensure that you return exactly ${postsAmount} classifications separated by commas without additional characters or words. Posts with comments:\n${postsWithCommentsText}`;
    case ANALYSIS_TYPES.companySummary:
      return `Based on the given Reddit posts about the company ${companyName}, write a brief summary that captures the general sentiment and conclusions of employees and applicants regarding working conditions, salary, benefits, and interview experiences. Instead of listing discussion topics, summarize the key insights and common opinions expressed in the posts and comments. Where applicable, provide conclusions on why employees or applicants view the company in a certain way (e.g., positive feedback about salary competitiveness, or concerns about work-life balance). The summary should feel as though the posts and comments have been thoroughly reviewed and the main points clearly conveyed, offering a well-rounded understanding of the company as an employer. The text may also contain additional insights or general information that contribute to a better understanding of the company as an employer. Make the summary objective and concise. Posts with comments:\n${postsWithCommentsText}`;
  }
}

/**
 * Parses the response from OpenAI based on the specified analysis type.
 *
 * @param analysisType - Specifies the type of analysis to interpret, using one of the options
 * in `ANALYSIS_TYPES`, such as `"sentiments"` for sentiment analysis or `"companySummary"` for a
 * general company summary.
 * @param response - Response received from OpenAI API containing the analysis results.
 * @param postsWithComments - (Optional) Original array of Reddit posts, required if analysisType is "sentiments".
 * @returns Either a string (company summary) or an array of Reddit posts with added sentiment classifications.
 *
 * @throws Error if response content is missing or if data required for sentiment mapping is unavailable.
 */
function parseAnalysisResponse(
  analysisType: AnalysisType,
  response: ChatCompletionResponse,
  postsWithComments?: RedditPostWithComments[]
): string | RedditPostWithComments[] {
  const responseContent = response.choices?.[0]?.message?.content;
  if (!responseContent) {
    throw new Error("No content received from OpenAI API.");
  }
  switch (analysisType) {
    case ANALYSIS_TYPES.sentiments:
      if (typeof postsWithComments === "undefined")
        throw new Error("The array of posts with comments is missing.");
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
    case ANALYSIS_TYPES.companySummary:
      return responseContent;
  }
}
