import { ANALYSIS_TYPES } from "@/utils/constants";

/**
 * Represents a Reddit post along with its comments and metadata.
 *
 * @property {string} id - Unique identifier for the Reddit post.
 * @property {number} created - Timestamp indicating when the post was created.
 * @property {number} upvotes - The number of upvotes the post has received.
 * @property {number} downvotes - The number of downvotes the post has received.
 * @property {string} subreddit - The name of the subreddit where the post was posted.
 * @property {string} url - URL of the post.
 * @property {string} title - Title of the post.
 * @property {string} text - Body text of the post.
 * @property {string} [sentiment] - Sentiment analysis result for the post (e.g., "positive", "neutral", or "negative").
 * @property {string[]} comments - Array containing the text of comments associated with the post.
 */
export type RedditPostWithComments = {
  id: string;
  created: number;
  upvotes: number;
  downvotes: number;
  subreddit: string;
  url: string;
  title: string;
  text: string;
  sentiment?: string;
  comments: string[];
};

/**
 * Represents the type of analysis to be performed on Reddit posts. Options are defined
 * in `ANALYSIS_TYPES` and include, for example, sentiment analysis or generating a company summary.
 */
export type AnalysisType = (typeof ANALYSIS_TYPES)[keyof typeof ANALYSIS_TYPES];

/**
 * Represents a company with relevant metadata.
 *
 * @property {string} id - Unique identifier for the company.
 * @property {string} slug - URL-friendly identifier for the company, used in the company's URL.
 * @property {string} name - The name of the company.
 * @property {string} [website] - The company's official website URL (optional).
 * @property {number} [positiveSentiments] - The count of positive sentiments related to the company (optional).
 * @property {number} [negativeSentiments] - The count of negative sentiments related to the company (optional).
 * @property {number} [neutralSentiments] - The count of neutral sentiments related to the company (optional).
 * @property {string} [summary] - A brief summary of the company, based on Reddit posts (optional).
 */
export type Company = {
  id: string;
  slug: string;
  name: string;
  website?: string;
  positiveSentiments?: number;
  negativeSentiments?: number;
  neutralSentiments?: number;
  summary?: string;
};
