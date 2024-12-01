import { getDocument } from "@/lib/firebaseClient/dataServices";
import { Company } from "@/types";

/**
 * Fetches a company document from Firestore based on its ID.
 * Optionally, specific fields can be selected to limit the returned data.
 *
 * @param companyId - The ID of the company document to fetch.
 * @param selectFields - An optional array of field names to retrieve from the company document.
 * @returns A promise that resolves to the company data or undefined if the document does not exist.
 */
export async function fetchCompany(
  companyId: string,
  selectFields?: (keyof Company)[]
): Promise<Company | undefined> {
  return getDocument<Company>(`/companies/${companyId}`, selectFields);
}
