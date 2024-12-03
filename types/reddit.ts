import { SentimentType } from "@/types";

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
 * @property {SentimentType} [sentiment] - Sentiment analysis result for the post (e.g., "positive", "neutral", or "negative").
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
  sentiment?: SentimentType;
  comments: string[];
};

/**
 * Represents a reduced version of a Reddit post, containing only the necessary fields.
 */
export type ReducedRedditPost = Pick<
  RedditPostWithComments,
  "title" | "text" | "url"
>;
