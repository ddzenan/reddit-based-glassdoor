import { handleHomePageData } from "@/services/homePage/handleHomePageData";
import ExpandableTextWithTitle from "@/components/shared/ExpandableTextWithTitle";
import RedditPostList from "@/components/shared/RedditPostList";
import SentimentChart from "@/components/shared/SentimentChart";
import WordFrequencyChart from "@/components/home/WordFrequencyChart";

/**
 * A Next.js page component that renders the home page.
 * The page includes analysis data for the tech industry (e.g., sentiment chart, summary, sentiment words chart).
 *
 * @returns A JSX element that renders the home page.
 */
export default async function HomePage() {
  const {
    summary,
    positiveSentiments,
    neutralSentiments,
    negativeSentiments,
    sentimentWords,
    redditPosts,
  } = await handleHomePageData();
  const hasAnySentimentData =
    positiveSentiments || neutralSentiments || negativeSentiments;
  return (
    <div className="max-w-screen-md mx-auto px-2 py-8 sm:py-16">
      <div className="grid md:grid-cols-2 md:gap-4">
        {hasAnySentimentData && (
          <SentimentChart
            positive={positiveSentiments ?? 0}
            neutral={neutralSentiments ?? 0}
            negative={negativeSentiments ?? 0}
          />
        )}
        {sentimentWords && sentimentWords.length && (
          <WordFrequencyChart data={sentimentWords} />
        )}
      </div>
      {summary && <ExpandableTextWithTitle title="Summary" text={summary} />}
      {redditPosts.length && <RedditPostList posts={redditPosts} />}
    </div>
  );
}
