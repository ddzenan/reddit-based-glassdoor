import {
  getDocumentsByField,
  updateDocumentAndAddToSubcollection,
} from "@/lib/firebaseAdmin/dataServices";
import { fetchPostsAndComments } from "../reddit/fetchPostsAndComments";
import { analyzeRedditPosts } from "../openai/analyzeRedditPosts";
import { RedditPostWithComments, Company } from "@/types";
import { countSentiments } from "@/utils/helpers";
import { ANALYSIS_TYPES } from "@/utils/constants";
import { fetchClearbitLogo } from "@/lib/clearbit/dataServices";

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
export async function handleCompanyPageData(slug: string): Promise<Company> {
  const companies = await getDocumentsByField("companies", "slug", slug);
  if (!companies || companies.length === 0)
    throw new Error(`There is no company with slug ${slug}.`);
  let company = companies[0] as Company;
  const { id: companyId, name: companyName, summary: companySummary } = company;
  if (!companySummary) {
    const redditPosts = await fetchPostsAndComments({
      searchTerm: companyName,
    });
    const [summary, redditPostsWithSentiments] = await Promise.all([
      analyzeRedditPosts(
        ANALYSIS_TYPES.companySummary,
        redditPosts,
        companyName
      ) as Promise<string>,
      analyzeRedditPosts(
        ANALYSIS_TYPES.sentiments,
        redditPosts,
        companyName
      ) as Promise<RedditPostWithComments[]>,
    ]);
    const sentimentCounts = countSentiments(redditPostsWithSentiments);
    company = {
      ...company,
      ...sentimentCounts,
      summary,
    };
    await updateDocumentAndAddToSubcollection(
      `companies/${companyId}`,
      company,
      "redditPosts",
      redditPostsWithSentiments
    );
  }
  const logo = await fetchClearbitLogo(slug);
  if (logo) company = { ...company, logo };
  return company;
}
