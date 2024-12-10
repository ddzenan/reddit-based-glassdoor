import {
  getDocumentsByField,
  updateDocumentAndAddToSubcollection,
  getAllDocuments,
} from "@/lib/firebaseAdmin/dataServices";
import { fetchPostsAndComments } from "../reddit/fetchPostsAndComments";
import { analyzeRedditPosts } from "../openai/analyzeRedditPosts";
import { RedditPostWithComments, Company, ReducedRedditPost } from "@/types";
import { countSentiments } from "@/utils/helpers";
import { ANALYSIS_TYPES } from "@/utils/constants";
import { fetchClearbitLogo } from "@/lib/clearbit/dataServices";

/**
 * Data returned by the `handleCompanyPageData` function.
 *
 * @property {Company} company - The detailed information of the company.
 * @property {ReducedRedditPost[]} redditPosts - Array of reduced Reddit posts related to the company.
 */
type CompanyPageData = {
  company: Company;
  redditPosts: ReducedRedditPost[];
};

/**
 * Retrieves and prepares company data for a company page based on the provided slug.
 * If the company has no summary, the function fetches Reddit posts, analyzes sentiments,
 * generates a summary, and updates Firestore with new data.
 *
 * @param slug - Unique identifier (slug) for the company.
 * @returns Returns the company data, including summary and sentiment counts.
 *
 * @throws Throws error if no company matches the provided slug or if data fetching fails.
 */
export async function handleCompanyPageData(
  slug: string
): Promise<CompanyPageData> {
  const companies = await getDocumentsByField("companies", "slug", slug);
  if (!companies || companies.length === 0)
    throw new Error(`There is no company with slug ${slug}.`);
  let company = companies[0] as Company;
  const { id, name, website } = company;
  let redditPosts: RedditPostWithComments[] = await getAllDocuments(
    `companies/${id}/redditPosts`
  );
  if (!redditPosts.length) {
    try {
      redditPosts = await fetchPostsAndComments({
        searchTerm: name,
      });
      if (!redditPosts.length) return { company, redditPosts: [] };
      const [summary, redditPostsWithSentiments] = await Promise.all([
        analyzeRedditPosts(
          ANALYSIS_TYPES.companySummary,
          redditPosts,
          name
        ) as Promise<string>,
        analyzeRedditPosts(
          ANALYSIS_TYPES.sentiments,
          redditPosts,
          name
        ) as Promise<RedditPostWithComments[]>,
      ]);
      const sentimentCounts = countSentiments(redditPostsWithSentiments);
      company = {
        ...company,
        ...sentimentCounts,
        summary,
      };
      await updateDocumentAndAddToSubcollection(
        `companies/${id}`,
        company,
        "redditPosts",
        redditPostsWithSentiments
      );
    } catch {
      return { company, redditPosts: [] };
    }
  }
  if (website) {
    const logo = await fetchClearbitLogo(website);
    if (logo) company = { ...company, logo };
  }
  const reducedRedditPosts: ReducedRedditPost[] = redditPosts.map(
    ({ title, text, url }) => ({
      title,
      text,
      url,
    })
  );
  return { company: company, redditPosts: reducedRedditPosts };
}
