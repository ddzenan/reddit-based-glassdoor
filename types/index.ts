/**
 * Represents a Reddit post along with its comments and metadata.
 *
 * @property {string} id - Unique identifier for the Reddit post.
 * @property {number} created - Timestamp indicating when the post was created.
 * @property {number} upvotes - The number of upvotes the post has received.
 * @property {number} downvotes - The number of downvotes the post has received.
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
  title: string;
  text: string;
  sentiment?: string;
  comments: string[];
};

/**
 * Defines the types of analyses that can be performed on Reddit posts.
 * - "sentiments": Classifies the sentiment of posts as positive, neutral, or negative.
 * - "companySummary": Provides a summarized view of overall feedback related to a company.
 */
export type AnalysisType = "sentiments" | "companySummary";
