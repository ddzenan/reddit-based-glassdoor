"use client";

import Card from "@/components/shared/Card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RedditPostWithComments } from "@/types";
import { truncateText } from "@/utils/helpers";

const TEXT_MAX_LENGTH = 200;

/**
 * Represents a reduced version of a Reddit post, containing only the necessary fields.
 *
 * @property {string} title - The title of the Reddit post.
 * @property {string} text - The text content of the Reddit post.
 * @property {string} url - The URL of the Reddit post.
 */
type ReducedRedditPost = Pick<RedditPostWithComments, "title" | "text" | "url">;

/**
 * Props for the `RedditPostList` component.
 *
 * @property {ReducedRedditPost[]} posts - An array of reduced Reddit posts to be displayed in the list.
 */
type RedditPostListProps = {
  posts: ReducedRedditPost[];
};

/**
 * A React component that renders a scrollable list of Reddit posts within a card.
 * Each post is displayed as a clickable link, showing the title and a shortened version of the text.
 *
 * @param {RedditPostListProps} props - The properties passed to the `RedditPostList` component, including an array of Reddit posts.
 * @returns {JSX.Element} A JSX element that renders the list of Reddit posts.
 */
export default function RedditPostList({ posts }: RedditPostListProps) {
  return (
    <Card title="Reddit Posts Used for Analysis">
      <ScrollArea className="h-72 overflow-y-auto">
        <ul className="space-y-2">
          {posts.map((post, i) => (
            <li key={i}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 rounded-md hover:bg-muted transition-colors no-underline"
              >
                <h3 className="text-base font-medium text-primary">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {truncateText(post.text, TEXT_MAX_LENGTH)}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </Card>
  );
}
