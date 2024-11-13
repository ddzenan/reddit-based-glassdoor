import { ANALYSIS_TYPES } from "@/utils/constants";

/**
 * Represents a Reddit post along with its comments and metadata.
 *
 * @property {string} id - Unique identifier for the Reddit post.
 * @property {number} created - Timestamp indicating when the post was created.
 * @property {number} upvotes - The number of upvotes the post has received.
 * @property {number} downvotes - The number of downvotes the post has received.
 * @property {string} subreddit - The name of the subreddit where the post was posted.
 * @property {string} url - Url of the post.
 * @property {string} title - Title of the post.
 * @property {string} text - Body text of the post.
 * @property {string} [sentiment] - Sentiment analysis result for the post (e.g., "Positive", "Neutral", or "Negative").
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
