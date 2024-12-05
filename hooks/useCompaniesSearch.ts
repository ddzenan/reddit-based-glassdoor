import { useState } from "react";
import { searchCompaniesByName } from "@/services/companies/basicCompanyActions";
import { CompanyBasicInfoWithId } from "@/types";

/**
 * Represents the return type of the `useCompaniesSearch` custom hook.
 *
 * This type encapsulates the state and functions for managing the search process for companies.
 *
 * @property {string} searchQuery - The current search query string entered by the user.
 * @property {Dispatch<SetStateAction<string>>} setSearchQuery - A function to update the search query, accepting either a new string or a function that computes the new string based on the previous value.
 * @property {CompanyBasicInfoWithId[]} companies - The list of companies fetched from the API based on the search query.
 * @property {Dispatch<SetStateAction<CompanyBasicInfoWithId[]>>} setCompanies - A function to update the list of companies, accepting either a new array or a function that computes the new array based on the previous value.
 * @property {boolean} isLoading - A boolean indicating if the search request is currently in progress.
 * @property {boolean} isError - A boolean indicating if an error occurred during the search.
 * @property {Function} search - A function to initiate the company search.
 */
type UseCompaniesSearchReturn = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  companies: CompanyBasicInfoWithId[];
  setCompanies: React.Dispatch<React.SetStateAction<CompanyBasicInfoWithId[]>>;
  isLoading: boolean;
  isError: boolean;
  search: () => Promise<void>;
};

/**
 * Custom hook for managing the search functionality for companies.
 *
 * This hook handles the state and functionality for searching companies by name,
 * including query input handling, API interaction, and managing loading and error states.
 *
 * @returns The state and functions for managing the company search process.
 */
export function useCompaniesSearch(): UseCompaniesSearchReturn {
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState<CompanyBasicInfoWithId[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function search() {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setIsError(false);
    try {
      const result: CompanyBasicInfoWithId[] = (await searchCompaniesByName(
        searchQuery,
        ["id", "name", "slug"]
      )) as CompanyBasicInfoWithId[];
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
