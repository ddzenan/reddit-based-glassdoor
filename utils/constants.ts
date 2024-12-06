export const SENTIMENTS = {
  "0": "positive",
  "1": "neutral",
  "2": "negative",
} as const;

export const ANALYSIS_TYPES = {
  sentiments: "sentiments",
  companySummary: "companySummary",
  techIndustrySummary: "techIndustrySummary",
  techIndustrySentimentWords: "techIndustrySentimentWords",
} as const;

export const BASIC_COMPANY_DATA_FIELDS = {
  website: { label: "Website" },
  yearFounded: { label: "Year Founded" },
  numberOfEmployees: { label: "# of Employees" },
  estimatedRevenue: { label: "Estimated Revenue" },
};

export const REVENUE_OPTIONS = [
  "<$100M",
  "$100M - $500M",
  "$500M - $1B",
  "$1B - $10B",
  "$10B - $50B",
  "$50B - $100B",
  "$100B+",
] as const;
