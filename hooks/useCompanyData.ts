import { useState, useEffect } from "react";
import { fetchCompany } from "@/services/companies/basicCompanyActions";
import { Company, CompanyKey } from "@/types";

/**
 * This hook retrieves company data from an API based on the provided company ID and specified fields.
 * It manages loading state, ensures data is fetched only once per company ID, and handles errors gracefully.
 *
 * @param companyId - The ID of the company to fetch. If not provided, no data will be fetched.
 * @param fields - The specific fields of the company to include in the fetch. Defaults to an empty array.
 * @returns An object containing:
 * - `data`: The fetched company data. Initially an empty object, updated once the data is successfully fetched.
 * - `isLoading`: Boolean indicating whether the data is currently being loaded.
 * - `isError`: Boolean indicating whether an error occurred during the data fetch.
 */
export function useCompanyData(companyId?: string, fields?: CompanyKey[]) {
  const [data, setData] = useState<Partial<Company>>({});
  const [isLoading, setIsLoading] = useState(!!companyId);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);
      try {
        if (companyId) {
          const company = await fetchCompany(companyId, fields);
          if (company) setData(company);
        }
      } catch (error) {
        setIsError(true);
        setData({});
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [companyId, fields]);

  return { data, isLoading, isError };
}
