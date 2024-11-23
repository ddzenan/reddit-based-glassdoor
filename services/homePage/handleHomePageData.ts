import {
  getDocumentByPath,
  updateDocumentAndAddToSubcollection,
  getAllDocuments,
} from "@/lib/firebaseAdmin/dataServices";
import { fetchPostsAndComments } from "../reddit/fetchPostsAndComments";
import { analyzeRedditPosts } from "../openai/analyzeRedditPosts";
import { RedditPostWithComments, ReducedRedditPost } from "@/types";
import { countSentiments } from "@/utils/helpers";
import { ANALYSIS_TYPES } from "@/utils/constants";

/**
 * Represents the analysis of an industry, including sentiment counts and a summary.
 *
 * @property {number} positiveSentiments - The number of positive sentiments identified in the industry.
 * @property {number} neutralSentiments - The number of neutral sentiments identified in the industry.
 * @property {number} negativeSentiments - The number of negative sentiments identified in the industry.
 * @property {string} summary - A summary of the overall sentiment and discussions about the industry.
 */
type IndustryAnalysis = {
  positiveSentiments?: number;
  neutralSentiments?: number;
  negativeSentiments?: number;
  summary?: string;
};

/**
 * Handles data processing for the home page, including fetching Reddit posts,
 * analyzing sentiments, and retrieving or updating industry analysis.
 *
 * @returns A promise resolving to an object containing industry analysis data
 * and a reduced list of Reddit posts.
 */
export async function handleHomePageData(): Promise<
  IndustryAnalysis & {
    redditPosts: ReducedRedditPost[];
  }
> {
  let analysisData: IndustryAnalysis | undefined = await getDocumentByPath(
    "industries/tech"
  );
  let redditPosts: RedditPostWithComments[] = await getAllDocuments(
    "industries/tech/redditPosts"
  );
  if (!redditPosts.length) {
    redditPosts = await fetchPostsAndComments();
    const [summary, redditPostsWithSentiments] = await Promise.all([
      analyzeRedditPosts(
        ANALYSIS_TYPES.techIndustrySummary,
        redditPosts
      ) as Promise<string>,
      analyzeRedditPosts(ANALYSIS_TYPES.sentiments, redditPosts) as Promise<
        RedditPostWithComments[]
      >,
    ]);
    const sentimentCounts = countSentiments(redditPostsWithSentiments);
    analysisData = {
      ...analysisData,
      ...sentimentCounts,
      summary,
    };
    await updateDocumentAndAddToSubcollection(
      "industries/tech",
      analysisData,
      "redditPosts",
      redditPostsWithSentiments
    );
  }
  const reducedRedditPosts: ReducedRedditPost[] = redditPosts.map(
    ({ title, text, url }) => ({
      title,
      text,
      url,
    })
  );
  return {
    ...(analysisData as IndustryAnalysis),
    redditPosts: reducedRedditPosts,
  };
}
