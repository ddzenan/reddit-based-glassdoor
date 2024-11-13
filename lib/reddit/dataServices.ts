import { Submission, BaseSearchOptions, Comment } from "snoowrap";
import { redditClient } from "./reddit";

/**
 * Fetches top posts from a subreddit within a specified time period.
 *
 * @param subreddit - The subreddit to retrieve posts from.
 * @param time - The time period for filtering top posts.
 * @returns A promise that resolves to an array of posts.
 */
export async function getTopPosts(
  subreddit: string,
  time: BaseSearchOptions["time"]
): Promise<Submission[]> {
  return await redditClient.getSubreddit(subreddit).getTop({ time });
}

/**
 * Searches posts in a subreddit based on a search term and sorting options.
 *
 * @param subreddit - The subreddit to search in.
 * @param searchTerm - The search term to filter posts by.
 * @param time - The time filter for posts.
 * @param sort - The sorting option for posts.
 * @returns A promise that resolves to an array of posts.
 */
export async function searchPosts(
  subreddit: string,
  searchTerm: string,
  time: BaseSearchOptions["time"],
  sort: BaseSearchOptions["sort"]
): Promise<Submission[]> {
  return await redditClient.getSubreddit(subreddit).search({
    query: searchTerm,
    time,
    sort,
  });
}

/**
 * Fetches a specified number of comments for a given post.
 *
 * @param post - Reddit post to retrieve comments for.
 * @param amount - Number of comments to fetch.
 * @returns Array of strings representing comments.
 */
export async function fetchCommentsForPost(
  post: Submission,
  amount: number
): Promise<Comment[]> {
  return await post.comments.fetchMore({ amount });
}
