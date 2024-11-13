import { RedditPostWithComments } from "@/types";
import { SENTIMENTS } from "./constants";

/**
 * Counts occurrences of each sentiment type in a list of Reddit posts.
 *
 * @param posts - List of Reddit posts with sentiment annotations.
 * @returns A record with sentiment counts.
 */
export function countSentiments(
  posts: RedditPostWithComments[]
): Record<string, number> {
  const sentiments = Object.values(SENTIMENTS);
  const initialCounts: Record<string, number> = sentiments.reduce(
    (acc, value) => {
      acc[`${value}Sentiments`] = 0;
      return acc;
    },
    {} as Record<string, number>
  );

  return posts.reduce((acc, post) => {
    const sentimentLabel = `${post.sentiment}Sentiments`;
    if (acc[sentimentLabel] !== undefined) acc[sentimentLabel] += 1;
    return acc;
  }, initialCounts);
}
