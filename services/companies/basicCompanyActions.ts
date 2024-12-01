import {
  getDocument,
  saveDocument,
  searchDocumentsByField,
} from "@/lib/firebaseClient/dataServices";
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

/**
 * Saves a company document to Firestore.
 * Optionally, an existing company document can be updated by providing the company ID.
 *
 * @param data - The company data to be saved.
 * @param companyId - An optional ID for the company document. If not provided, a new document will be created.
 * @returns A promise that resolves when the company document is saved.
 */
export async function saveCompany(data: Company, companyId?: string) {
  return await saveDocument({
    collectionPath: "companies",
    id: companyId,
    data: data,
  });
}

/**
 * Fetches companies from Firestore based on name.
 *
 * @param companyName - The name of the company to search for.
 * @param selectFields - An optional array of field names to retrieve from the company documents.
 * @returns A promise that resolves to an array of company documents that match the name.
 */
export async function searchCompaniesByName(
  companyName: string,
  selectFields?: (keyof Company)[]
): Promise<Record<string, any>[]> {
  return searchDocumentsByField("companies", "name", companyName, selectFields);
}
