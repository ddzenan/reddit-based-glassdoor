/**
 * Basic metadata for Reddit content.
 * @typedef {Object} RedditMetadata
 * @property {string} id - Unique ID of the content.
 * @property {number} created - Creation time in UNIX format.
 * @property {number} upvotes - Number of upvotes for the content.
 * @property {number} downvotes - Number of downvotes for the content.
 */
export type RedditMetadata = {
  id: string;
  created: number;
  upvotes: number;
  downvotes: number;
};

/**
 * Represents a Reddit comment with metadata.
 * @typedef {RedditMetadata} RedditComment
 * @property {string} text - Text content of the comment.
 */
export type RedditComment = RedditMetadata & {
  text: string;
};

/**
 * Represents a Reddit post with comments.
 * @typedef {RedditMetadata} RedditPostWithComments
 * @property {string} title - Title of the post.
 * @property {string} text - Body text of the post.
 * @property {RedditComment[]} comments - List of comments associated with the post.
 */
export type RedditPostWithComments = RedditMetadata & {
  title: string;
  text: string;
  sentiment?: string;
  comments: RedditComment[];
};
