import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebaseClient";

/**
 * Fetches a document from a Firestore collection based on its path.
 * Optionally, specific fields can be selected to limit the returned data.
 *
 * @param documentPath - The path to the Firestore document to fetch.
 * @param selectFields - An optional array of field names to retrieve from the document.
 * @returns A promise that resolves to the document data or undefined if the document does not exist.
 */
export async function getDocument<T = Record<string, any>>(
  documentPath: string,
  selectFields?: (keyof T)[]
): Promise<T | undefined> {
  const documentRef = doc(firestore, documentPath);
  const documentSnapshot = await getDoc(documentRef);

  if (!documentSnapshot.exists()) return undefined;

  const data = documentSnapshot.data() as T;

  if (selectFields && selectFields.length > 0) {
    const selectedData = {} as T;
    selectFields.forEach((field) => {
      if (data[field] !== undefined) selectedData[field] = data[field];
    });
    return selectedData as T;
  }

  return data;
}
