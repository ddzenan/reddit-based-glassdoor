export const SENTIMENTS = {
  "0": "positive",
  "1": "neutral",
  "2": "negative",
} as const;

export const ANALYSIS_TYPES = {
  sentiments: "sentiments",
  companySummary: "companySummary",
} as const;

export const BASIC_COMPANY_DATA_FIELDS = {
  website: { label: "Website" },
  yearFounded: { label: "Year Founded" },
  numberOfEmployees: { label: "# of Employees" },
  estimatedRevenue: { label: "Estimated Revenue" },
};
