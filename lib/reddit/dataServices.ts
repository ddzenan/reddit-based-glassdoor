import { Submission, BaseSearchOptions } from "snoowrap";
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
