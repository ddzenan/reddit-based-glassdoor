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

/**
 * Trims the provided text to a maximum length and appends an ellipsis.
 *
 * @param text - The text to be shortened.
 * @param maxLength - The maximum length of the text.
 * @returns A shortened version of the text.
 */
export function truncateText(text: string, maxLength: number): string {
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Generates a slug from the provided text.
 *
 * @param text - The text to be converted to a slug.
 * @returns A slug version of the text.
 */
export function generateSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0100-\uFFFF\w\-]/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
