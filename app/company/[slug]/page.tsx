import { handleCompanyPageData } from "@/services/companies/handleCompanyPageData";
import CompanyHeader from "@/components/company/CompanyHeader";
import ExpandableTextWithTitle from "@/components/shared/ExpandableTextWithTitle";
import RedditPostList from "@/components/shared/RedditPostList";
import SentimentChart from "@/components/shared/SentimentChart";

/**
 * Props for the `CompanyPage` component.
 *
 * @property {Object} params - The parameters for the page, typically provided by the router.
 * @property {string} params.slug - The unique identifier (slug) for the company.
 */
type CompanyPageProps = {
  params: {
    slug: string;
  };
};

/**
 * A Next.js page component that renders detailed information about a company.
 * The page includes a company header, sentiment analysis chart, a summary, and Reddit posts.
 *
 * @param {CompanyPageProps} props - The properties passed to the `CompanyPage` component.
 * @returns A JSX element that renders the company details page.
 */
export default async function CompanyPage(props: CompanyPageProps) {
  const { params } = await props;
  const { slug } = await params;
  const { company, redditPosts } = await handleCompanyPageData(slug);
  const {
    name,
    logo,
    website,
    yearFounded,
    numberOfEmployees,
    estimatedRevenue,
    positiveSentiments,
    neutralSentiments,
    negativeSentiments,
    summary,
  } = company;
  let companyHeader = {
    name,
    logo,
    website,
    yearFounded,
    numberOfEmployees,
    estimatedRevenue,
  };
  return (
    <div className="max-w-screen-md mx-auto px-2 py-8 sm:py-16">
      <CompanyHeader {...companyHeader} />
      <SentimentChart
        positive={positiveSentiments as number}
        neutral={neutralSentiments as number}
        negative={negativeSentiments as number}
      />
      <ExpandableTextWithTitle title="Summary" text={summary as string} />
      <RedditPostList posts={redditPosts} />
    </div>
  );
}
