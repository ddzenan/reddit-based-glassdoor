import {
  getDocument,
  saveDocument,
  searchDocumentsByField,
  deleteDocument,
} from "@/lib/firebaseClient/dataServices";
import { Company, CompanyKey } from "@/types";
import { doc, collection } from "firebase/firestore";
import { firestore } from "@/lib/firebaseClient/firebaseClient";

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
  selectFields?: CompanyKey[]
): Promise<Partial<Company> | undefined> {
  return getDocument<Partial<Company>>(`/companies/${companyId}`, selectFields);
}

/**
 * Saves a company document to Firestore.
 * Optionally, an existing company document can be updated by providing the company ID.
 *
 * @param companyData - The company data to be saved.
 * @param companyId - An optional ID for the company document. If not provided, a new document will be created.
 * @returns A promise that resolves when the company document is saved.
 */
export async function saveCompany(
  companyData: Partial<Company>,
  companyId?: string
): Promise<string> {
  const collectionPath = "companies";
  const id = companyId ?? doc(collection(firestore, collectionPath)).id;
  const data = {
    id,
    ...companyData,
  };
  return await saveDocument({
    collectionPath,
    id,
    data,
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
  selectFields?: CompanyKey[]
): Promise<Partial<Pick<Company, CompanyKey>>[]> {
  return searchDocumentsByField<Company>(
    "companies",
    "name",
    companyName,
    selectFields as CompanyKey[]
  );
}

/**
 * Deletes a company document from Firestore.
 *
 * @param companyId - The ID of the company to be deleted.
 * @returns A promise that resolves when the company is deleted.
 */
export async function deleteCompany(companyId: string): Promise<void> {
  const docPath = `companies/${companyId}`;
  await deleteDocument(docPath);
}
