import { useState, useEffect } from "react";
import { fetchCompany } from "@/services/companies/basicCompanyActions";
import { Company, CompanyKey } from "@/types";

/**
 * Represents the return type of the `useCompanyData` hook.
 *
 * This type encapsulates the state and data fetched by the hook for a company.
 *
 * @property {Partial<Company>} data - The fetched company data, containing only the requested fields. Initially an empty object.
 * @property {boolean} isLoading - Indicates whether the data fetch is currently in progress.
 * @property {boolean} isError - Indicates whether an error occurred during the data fetch.
 */
type UseCompanyDataReturn = {
  data: Partial<Company>;
  isLoading: boolean;
  isError: boolean;
};

/**
 * This hook retrieves company data from an API based on the provided company ID and specified fields.
 * It manages loading state, ensures data is fetched only once per company ID, and handles errors gracefully.
 *
 * @param companyId - The ID of the company to fetch. If not provided, no data will be fetched.
 * @param fields - The specific fields of the company to include in the fetch. Defaults to an empty array.
 * @returns The state of the fetch operation, including the fetched data, loading state, and error state.
 */
export function useCompanyData(
  companyId?: string,
  fields?: CompanyKey[]
): UseCompanyDataReturn {
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
      } catch {
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
