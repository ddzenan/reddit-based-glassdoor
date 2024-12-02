import { useState } from "react";
import { searchCompaniesByName } from "@/services/companies/basicCompanyActions";
import { Company } from "@/types";

/**
 * Custom hook for managing the search functionality for companies.
 *
 * This hook provides state and functions to handle searching for companies by name.
 * It includes query input handling, API interaction, and error/loading state management.
 *
 * @returns An object containing:
 * - `searchQuery`: The current search query string.
 * - `setSearchQuery`: Function to update the search query.
 * - `companies`: The list of companies fetched from the API.
 * - `setCompanies`: Function to update the companies list manually.
 * - `isLoading`: Boolean indicating if the search is in progress.
 * - `isError`: Boolean indicating if an error occurred during the search.
 * - `search`: Function to initiate the company search.
 */
export function useCompaniesSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function search() {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setIsError(false);
    try {
      const result = (await searchCompaniesByName(searchQuery, [
        "id",
        "name",
        "slug",
      ])) as Company[];
      setCompanies(result);
    } catch {
      setCompanies([]);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    searchQuery,
    setSearchQuery,
    companies,
    setCompanies,
    isLoading,
    isError,
    search,
  };
}
