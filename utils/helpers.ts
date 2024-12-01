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

/**
 * Transform an object to ensure all keys from the given array exist in the output,
 * replacing `undefined` with `null` and adding missing keys with `null` values.
 *
 * @param data - The input object with original data.
 * @param keys - An array of keys to enforce in the output object.
 * @returns A new object with `undefined` values replaced by `null` and missing keys added as `null`.
 */
export function transformToNull(
  data: Record<string, any>,
  keys: string[]
): Record<string, any> {
  const result: Record<string, any> = {};
  keys.forEach((key) => {
    result[key] = data[key] === undefined ? null : data[key];
  });
  return result;
}

/**
 * Transform an object to replace all `null` values with `undefined`.
 *
 * @param data - The input object with original data.
 * @returns A new object with `null` values replaced by `undefined`.
 */
export function transformToUndefined(
  data: Record<string, any>
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === null ? undefined : value,
    ])
  );
}

/**
 * A helper function to handle input changes, allowing optional parsing and transforming empty values to `null`.
 *
 * @template T - The type of the parsed value.
 * @param parser - A function to parse the input value. Defaults to a passthrough parser that returns the input as-is.
 * @returns A function to handle the `onChange` event, transforming the raw input value before invoking the native `onChange` handler.
 *
 * @param e - The input change event.
 * @param nativeOnChange - The native `onChange` handler from the form field.
 */
export function handleInputNullableFieldChange<T>(
  parser: (value: string) => T | undefined = (v) => v as unknown as T
) {
  return (
    e: React.ChangeEvent<HTMLInputElement>,
    nativeOnChange?: (value: any) => void
  ) => {
    const rawValue = e.target.value;
    const parsedValue = rawValue === "" ? null : parser(rawValue);
    if (typeof parsedValue === "number" && isNaN(parsedValue)) {
      nativeOnChange?.(null);
    } else {
      nativeOnChange?.(parsedValue);
    }
  };
}
