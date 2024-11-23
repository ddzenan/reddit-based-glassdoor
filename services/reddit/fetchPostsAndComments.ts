import { BaseSearchOptions, Comment } from "snoowrap";
import { RedditPostWithComments } from "@/types";
import {
  getTopPosts,
  searchPosts,
  fetchCommentsForPost,
} from "@/lib/reddit/dataServices";

const DEFAULT_SUBREDDIT = "cscareerquestions";
const DEFAULT_POSTS_TIME_PERIOD = "year";
const DEFAULT_POSTS_SORT_OPTION = "new";
const BASIC_POSTS_COMMENTS_AMOUNT = 5;
const TOP_POSTS_COMMENTS_AMOUNT = 15;

const DELETED_COMMENTS_KEYWORS = ["[deleted]", "[removed]"];

/**
 * Fetches posts and their comments from a specified subreddit.
 *
 * @param options - Options for fetching posts.
 * @param options.searchTerm - Optional search term to filter posts by.
 * @param options.subreddit - Subreddit name.
 * @param options.time - Time filter for posts.
 * @param options.sort - Sorting option for posts.
 * @returns Array of posts with comments.
 */
export async function fetchPostsAndComments({
  searchTerm,
  subreddit = DEFAULT_SUBREDDIT,
  time = DEFAULT_POSTS_TIME_PERIOD,
  sort = DEFAULT_POSTS_SORT_OPTION,
}: {
  searchTerm?: string;
  subreddit?: string;
  time?: BaseSearchOptions["time"];
  sort?: BaseSearchOptions["sort"];
} = {}): Promise<RedditPostWithComments[]> {
  const posts = searchTerm
    ? await searchPosts(subreddit, searchTerm, time, sort)
    : await getTopPosts(subreddit, time);

  const commentsAmount = searchTerm
    ? BASIC_POSTS_COMMENTS_AMOUNT
    : TOP_POSTS_COMMENTS_AMOUNT;

  return await Promise.all(
    posts.map(async (post) => {
      const fetchedComments = await fetchCommentsForPost(post);
      const filteredComments = filterComments(fetchedComments, commentsAmount);
      return {
        id: post.id,
        created: post.created_utc,
        upvotes: post.ups,
        downvotes: post.downs,
        subreddit: subreddit,
        url: post.url,
        title: post.title,
        text: post.selftext,
        comments: filteredComments,
      };
    })
  );
}

/**
 * Filters a list of Reddit comments to extract the text content (body) and removes deleted comments.
 * It returns the specified number of comments, excluding any that have been deleted.
 *
 * @param comments - An array of Reddit comment objects to be filtered.
 * @param amount - The maximum number of comments to return.
 * @returns A list of strings representing the bodies of the filtered comments, up to the specified amount.
 */
function filterComments(comments: Comment[], amount: number): string[] {
  return comments
    .map((comment) => comment.body)
    .filter((comment) => comment && !DELETED_COMMENTS_KEYWORS.includes(comment))
    .slice(0, amount);
}
