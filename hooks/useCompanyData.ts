import { useState, useEffect } from "react";
import { fetchCompany } from "@/services/companies/basicCompanyActions";
import { Company } from "@/types";
import { useErrorToast } from "./useToasts";

/**
 * This hook retrieves company data from an API based on the provided company ID and specified fields.
 * It manages loading state, ensures data is fetched only once per company ID, and handles errors gracefully.
 *
 * @param companyId - The ID of the company to fetch. If not provided, no data will be fetched.
 * @param fields - The specific fields of the company to include in the fetch. Defaults to an empty array.
 * @returns An object containing:
 * - `data`: The fetched company data. Initially an empty object, updated once the data is successfully fetched.
 * - `isLoading`: Boolean indicating whether the data is currently being loaded.
 */
export function useCompanyData(companyId?: string, fields?: (keyof Company)[]) {
  const [data, setData] = useState<Partial<Company>>({});
  const [isLoading, setIsLoading] = useState(!!companyId);
  const [areDataFetched, setAreDataFetched] = useState(false);
  const showErrorToast = useErrorToast();

  useEffect(() => {
    async function fetchData() {
      try {
        if (companyId && !areDataFetched) {
          setAreDataFetched(true);
          const company = await fetchCompany(companyId, fields);
          if (company) setData(company);
          setIsLoading(false);
        }
      } catch (error) {
        showErrorToast();
      }
    }
    fetchData();
  }, [companyId, fields, showErrorToast]);

  return { data, isLoading };
}
