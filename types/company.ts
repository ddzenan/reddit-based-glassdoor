import { RevenueOptionsType } from "@/types";

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
