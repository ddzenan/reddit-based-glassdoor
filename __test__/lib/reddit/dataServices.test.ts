import {
  getTopPosts,
  searchPosts,
  fetchCommentsForPost,
} from "@/lib/reddit/dataServices";
import { redditClient } from "@/lib/reddit/redditClient";
import { Submission } from "snoowrap";

jest.mock("@/lib/reddit/redditClient");
const mockSubreddit = "cscareerqustions";
const mockTime = "year";
const mockPosts = [{ id: "1", title: "Post 1" }];

describe("Reddit API functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call getTopPosts with correct parameters", async () => {
    (redditClient.getSubreddit as jest.Mock).mockReturnValueOnce({
      getTop: jest.fn().mockResolvedValue(mockPosts),
    });

    const result = await getTopPosts(mockSubreddit, mockTime);

    expect(redditClient.getSubreddit).toHaveBeenCalledWith(mockSubreddit);
    expect(result).toEqual(mockPosts);
  });

  it("should call searchPosts with correct parameters", async () => {
    const mockQuery = "Google";
    const mockSort = "relevance";

    (redditClient.getSubreddit as jest.Mock).mockReturnValueOnce({
      search: jest.fn().mockResolvedValue(mockPosts),
    });

    const result = await searchPosts(
      mockSubreddit,
      mockQuery,
      mockTime,
      mockSort
    );

    expect(redditClient.getSubreddit).toHaveBeenCalledWith(mockSubreddit);
    expect(result).toEqual(mockPosts);
  });

  it("should call fetchCommentsForPost with correct parameters", async () => {
    const mockPost = {
      comments: {
        fetchMore: jest.fn().mockResolvedValue([{ id: "comment1" }]),
      },
    } as unknown as Submission;
    const mockComments = [{ id: "comment1" }];
    const amount = 25;

    const result = await fetchCommentsForPost(mockPost);

    expect(mockPost.comments.fetchMore).toHaveBeenCalledWith({ amount });
    expect(result).toEqual(mockComments);
  });
});
