import { redditClient } from "@/lib/reddit/reddit";
import { Submission, Comment, BaseSearchOptions } from "snoowrap";
import { RedditPostWithComments } from "@/types";

const DEFAULT_SUBREDDIT = "cscareerquestions";
const DEFAULT_POSTS_TIME_PERIOD = "year";
const DEFAULT_POSTS_SORT_OPTION = "new";
const DEFAULT_COMMENTS_AMOUNT = 5;

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
  let posts = [];

  if (typeof searchTerm !== "undefined") {
    posts = await redditClient.getSubreddit(subreddit).search({
      query: searchTerm,
      time,
      sort,
    });
  } else {
    posts = await redditClient.getSubreddit(subreddit).getTop({ time });
  }

  return await Promise.all(
    posts.map(async (post) => {
      const comments = await fetchCommentsForPost(post);
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

/**
 * Fetches a specified number of comments for a given post.
 *
 * @param post - Reddit post to retrieve comments for.
 * @param amount - Number of comments to fetch.
 * @returns Array of strings representing comments.
 */
async function fetchCommentsForPost(
  post: Submission,
  amount: number = DEFAULT_COMMENTS_AMOUNT
): Promise<string[]> {
  const comments = await post.comments.fetchMore({ amount });
  return comments.map((comment: Comment) => comment.body);
}
