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
 * Represents the key of a company object.
 */
export type CompanyKey = keyof Company;

/**
 * Basic company information.
 */
export type CompanyBasicInfo = Pick<Company, "name" | "slug">;

/**
 * Basic company information with ID.
 */
export type CompanyBasicInfoWithId = CompanyBasicInfo & Pick<Company, "id">;

/**
 * Basic company information with logo.
 */
export type CompanyBasicInfoWithLogo = CompanyBasicInfo & Pick<Company, "logo">;

/**
 * Company name with logo and size.
 *
 * @property {"sm" | "md" | "lg"} [size] - The size of the component, which determines the logo dimensions and text styling.
 */
export type CompanyNameWithLogoAndSize = Pick<Company, "name" | "logo"> & {
  size?: "sm" | "md" | "lg";
};

/**
 * Additional company details typically used for forms or detailed views.
 */
export type CompanyDetailsInfo = Pick<
  Company,
  "website" | "yearFounded" | "numberOfEmployees" | "estimatedRevenue"
>;
