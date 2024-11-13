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

  return await Promise.all(
    posts.map(async (post) => {
      const fetchedComments = await fetchCommentsForPost(post);
      const comments = fetchedComments.map((comment: Comment) => comment.body);
      return {
        id: post.id,
        created: post.created_utc,
        upvotes: post.ups,
        downvotes: post.downs,
        subreddit: subreddit,
        url: post.url,
        title: post.title,
        text: post.selftext,
        comments: comments,
      };
    })
  );
}
