import { SENTIMENTS, ANALYSIS_TYPES, REVENUE_OPTIONS } from "@/utils/constants";

/**
 * A type representing the possible sentiment values as defined in the SENTIMENTS object.
 *
 * This type will be one of the values in the SENTIMENTS object, which currently includes:
 * "positive", "negative" or "neutral".
 */
export type SentimentType = (typeof SENTIMENTS)[keyof typeof SENTIMENTS];

/**
 * Represents the type of analysis to be performed on Reddit posts. Options are defined
 * in `ANALYSIS_TYPES` and include, for example, sentiment analysis or generating a company summary.
 */
export type AnalysisType = (typeof ANALYSIS_TYPES)[keyof typeof ANALYSIS_TYPES];

/**
 * Represents the type of revenue options for a company.
 */
export type RevenueOption = (typeof REVENUE_OPTIONS)[number];

/**
 * Represents an item in the navigation menu popover.
 *
 * @property {string} label - The label displayed for the navigation item.
 * @property {string} href - The URL that the navigation item links to.
 */
export type NavigationMenuPopoverItem = {
  label: string;
  href: string;
};
