import { handleHomePageData } from "@/services/homePage/handleHomePageData";
import { WordFrequency } from "@/types";
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
  return (
    <div className="max-w-screen-md mx-auto px-2 py-8 sm:py-16">
      <div className="grid md:grid-cols-2 md:gap-4">
        <SentimentChart
          positive={positiveSentiments as number}
          neutral={neutralSentiments as number}
          negative={negativeSentiments as number}
        />
        <WordFrequencyChart data={sentimentWords as WordFrequency[]} />
      </div>
      <ExpandableTextWithTitle title="Summary" text={summary as string} />
      <RedditPostList posts={redditPosts} />
    </div>
  );
}
