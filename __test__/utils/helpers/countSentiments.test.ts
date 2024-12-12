import { RedditPostWithComments, SentimentType } from "@/types";
import { countSentiments } from "@/utils/helpers";

describe("countSentiments", () => {
  it("should correctly count sentiments when posts contain mixed sentiments", () => {
    const posts = generatePosts([
      "positive",
      "negative",
      "positive",
      undefined,
    ]);
    const result = countSentiments(posts);
    expect(result).toEqual({
      positiveSentiments: 2,
      negativeSentiments: 1,
      neutralSentiments: 0,
    });
  });

  it("should return all counts as 0 when posts array is empty", () => {
    const posts: RedditPostWithComments[] = [];
    const result = countSentiments(posts);
    expect(result).toEqual({
      positiveSentiments: 0,
      negativeSentiments: 0,
      neutralSentiments: 0,
    });
  });

  it("should handle posts where all have no sentiment defined", () => {
    const posts = generatePosts([undefined, undefined]);
    const result = countSentiments(posts);
    expect(result).toEqual({
      positiveSentiments: 0,
      negativeSentiments: 0,
      neutralSentiments: 0,
    });
  });
});

function generatePosts(
  sentiments: (SentimentType | undefined)[]
): RedditPostWithComments[] {
  return sentiments.map((sentiment, index) => ({
    id: (index + 1).toString(),
    created: 0,
    upvotes: 0,
    downvotes: 0,
    subreddit: "test",
    url: "test",
    title: "test",
    text: "test",
    sentiment: sentiment,
    comments: [],
  }));
}
