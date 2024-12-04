import { z } from "zod";
import { REVENUE_OPTIONS } from "@/utils/constants";

const CURRENT_YEAR = new Date().getFullYear();

export const CompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  website: z.string().url().nullable(),
  yearFounded: z
    .number()
    .int("Year must be an integer")
    .positive("Year must be positive")
    .min(1900, "Year must be at least 1900")
    .max(CURRENT_YEAR, `Year cannot be later than ${CURRENT_YEAR}`)
    .nullable(),
  numberOfEmployees: z
    .number()
    .int("Number of employees must be an integer")
    .positive("Number must be positive")
    .nullable(),
  estimatedRevenue: z.enum(REVENUE_OPTIONS).nullable(),
});
