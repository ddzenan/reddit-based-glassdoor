import { SENTIMENTS, ANALYSIS_TYPES, REVENUE_OPTIONS } from "@/utils/constants";
import ChatCompletion from "openai";

/**
 * A type representing the possible sentiment values as defined in the SENTIMENTS object.
 *
 * This type will be one of the values in the SENTIMENTS object, which currently includes:
 * "positive", "negative" or "neutral".
 */
export type SentimentType = (typeof SENTIMENTS)[keyof typeof SENTIMENTS];

/**
 * Represents a Reddit post along with its comments and metadata.
 *
 * @property {string} id - Unique identifier for the Reddit post.
 * @property {number} created - Timestamp indicating when the post was created.
 * @property {number} upvotes - The number of upvotes the post has received.
 * @property {number} downvotes - The number of downvotes the post has received.
 * @property {string} subreddit - The name of the subreddit where the post was posted.
 * @property {string} url - URL of the post.
 * @property {string} title - Title of the post.
 * @property {string} text - Body text of the post.
 * @property {SentimentType} [sentiment] - Sentiment analysis result for the post (e.g., "positive", "neutral", or "negative").
 * @property {string[]} comments - Array containing the text of comments associated with the post.
 */
export type RedditPostWithComments = {
  id: string;
  created: number;
  upvotes: number;
  downvotes: number;
  subreddit: string;
  url: string;
  title: string;
  text: string;
  sentiment?: SentimentType;
  comments: string[];
};

/**
 * Represents the type of analysis to be performed on Reddit posts. Options are defined
 * in `ANALYSIS_TYPES` and include, for example, sentiment analysis or generating a company summary.
 */
export type AnalysisType = (typeof ANALYSIS_TYPES)[keyof typeof ANALYSIS_TYPES];

/**
 * Represents the type of revenue options for a company.
 */
export type RevenueOptionsType = (typeof REVENUE_OPTIONS)[number];

/**
 * Represents a company with relevant metadata.
 *
 * @property {string} id - Unique identifier for the company.
 * @property {string} slug - URL-friendly identifier for the company, used in the company's URL.
 * @property {string} name - The name of the company.
 * @property {string} [logo] - The URL of the company's logo.
 * @property {string} [website] - The company's official website URL (optional).
 * @property {number} [positiveSentiments] - The count of positive sentiments related to the company (optional).
 * @property {number} [negativeSentiments] - The count of negative sentiments related to the company (optional).
 * @property {number} [neutralSentiments] - The count of neutral sentiments related to the company (optional).
 * @property {string} [summary] - A brief summary of the company, based on Reddit posts (optional).
 * @property {number} [yearFounded] - The year the company was founded.
 * @property {string} [numberOfEmployees] - The total number of employees in the company.
 * @property {RevenueOptionsType} [estimatedRevenue] - The company's estimated annual revenue.
 */
export type Company = {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  website?: string;
  positiveSentiments?: number;
  negativeSentiments?: number;
  neutralSentiments?: number;
  summary?: string;
  yearFounded?: number;
  numberOfEmployees?: number;
  estimatedRevenue?: RevenueOptionsType;
};

/**
 * Represents the response from the OpenAI chat completion API.
 * This type encapsulates the structure of the chat completion response,
 * including the generated messages and any associated metadata.
 *
 * @see ChatCompletion.Chat.Completions.ChatCompletion - Original type definition from the OpenAI library.
 */
export type ChatCompletionResponse =
  ChatCompletion.Chat.Completions.ChatCompletion;

/**
 * Props for the CompanyNameWithLogo component.
 *
 * @property {string} name - The name of the company.
 * @property {string | null} logo - The URL of the company's logo.
 * @property {"sm" | "md" | "lg"} [size] - The size of the component, which determines the logo dimensions and text styling.
 */
export type CompanyNameWithLogoProps = Pick<Company, "name" | "logo"> & {
  size?: "sm" | "md" | "lg";
};

/**
 * Props for the `BasicCompanyData` component.
 *
 * @property {string} [website] - The website of the company.
 * @property {number} [yearFounded] - The year the company was founded.
 * @property {string} [numberOfEmployees] - The total number of employees in the company.
 * @property {string} [estimatedRevenue] - The company's estimated annual revenue.
 */
export type BasicCompanyDataProps = Pick<
  Company,
  "website" | "yearFounded" | "numberOfEmployees" | "estimatedRevenue"
>;

/**
 * Props for the `CompanyCard` component.
 *
 * @property {string} name - The name of the company.
 * @property {string} logo - The URL of the company's logo.
 * @property {string} slug - The unique identifier for the company used in its URL.
 */
export type CompanyCardProps = Pick<Company, "name" | "logo" | "slug">;

/**
 * Represents a reduced version of a Reddit post, containing only the necessary fields.
 *
 * @property {string} title - The title of the Reddit post.
 * @property {string} text - The text content of the Reddit post.
 * @property {string} url - The URL of the Reddit post.
 */
export type ReducedRedditPost = Pick<
  RedditPostWithComments,
  "title" | "text" | "url"
>;
