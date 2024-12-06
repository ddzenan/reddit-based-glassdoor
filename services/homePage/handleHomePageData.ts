import {
  getDocumentByPath,
  updateDocumentAndAddToSubcollection,
  getAllDocuments,
} from "@/lib/firebaseAdmin/dataServices";
import { fetchPostsAndComments } from "../reddit/fetchPostsAndComments";
import { analyzeRedditPosts } from "../openai/analyzeRedditPosts";
import {
  RedditPostWithComments,
  ReducedRedditPost,
  WordFrequency,
} from "@/types";
import { countSentiments } from "@/utils/helpers";
import { ANALYSIS_TYPES } from "@/utils/constants";

/**
 * Represents the analysis of an industry, including sentiment counts and a summary.
 *
 * @property {number} positiveSentiments - The number of positive sentiments identified in the industry.
 * @property {number} neutralSentiments - The number of neutral sentiments identified in the industry.
 * @property {number} negativeSentiments - The number of negative sentiments identified in the industry.
 * @property {string} summary - A summary of the overall sentiment and discussions about the industry.
 * @property {WordFrequency[]} sentimentWords - An array of sentiment words and their counts.
 */
type IndustryAnalysis = {
  positiveSentiments?: number;
  neutralSentiments?: number;
  negativeSentiments?: number;
  summary?: string;
  sentimentWords?: WordFrequency[];
};

/**
 * Data returned by the `handleHomePageData` function.
 *
 * @property {IndustryAnalysis} IndustryAnalysis - The main industry analysis data.
 * @property {ReducedRedditPost[]} redditPosts - Array of reduced Reddit posts related to the analysis.
 */
type HomePageData = IndustryAnalysis & {
  redditPosts: ReducedRedditPost[];
};

/**
 * Handles data processing for the home page, including fetching Reddit posts,
 * analyzing sentiments, and retrieving or updating industry analysis.
 *
 * @returns A promise resolving to an object containing industry analysis data
 * and a reduced list of Reddit posts.
 */
export async function handleHomePageData(): Promise<HomePageData> {
  let analysisData: IndustryAnalysis | undefined = await getDocumentByPath(
    "industries/tech"
  );
  let redditPosts: RedditPostWithComments[] = await getAllDocuments(
    "industries/tech/redditPosts"
  );
  if (!redditPosts.length) {
    redditPosts = await fetchPostsAndComments();
    const [summary, redditPostsWithSentiments, sentimentWords] =
      await Promise.all([
        analyzeRedditPosts(
          ANALYSIS_TYPES.techIndustrySummary,
          redditPosts
        ) as Promise<string>,
        analyzeRedditPosts(ANALYSIS_TYPES.sentiments, redditPosts) as Promise<
          RedditPostWithComments[]
        >,
        analyzeRedditPosts(
          ANALYSIS_TYPES.techIndustrySentimentWords,
          redditPosts
        ) as Promise<WordFrequency[]>,
      ]);
    const sentimentCounts = countSentiments(redditPostsWithSentiments);
    analysisData = {
      ...analysisData,
      ...sentimentCounts,
      summary,
      sentimentWords,
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
