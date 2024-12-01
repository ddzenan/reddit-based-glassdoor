import {
  doc,
  getDoc,
  setDoc,
  collection,
  deleteField,
} from "firebase/firestore";
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

/**
 * Prepares the data for Firestore by removing fields that are undefined.
 * If a field has an undefined value, it is deleted from the data object.
 *
 * @param data - The data to be prepared for Firestore.
 * @returns A new data object with undefined values removed.
 */
function prepareDataForFirestore(data: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === undefined ? deleteField() : value,
    ])
  );
}

/**
 * Saves a document to a Firestore collection.
 * Optionally, merges the data with the existing document or overwrites it.
 *
 * @param collectionPath - The Firestore collection path where the document will be saved.
 * @param id - An optional ID for the document. If not provided, a new document will be created.
 * @param data - The data to be saved in the document.
 * @param merge - Whether to merge the data with the existing document (default is true).
 * @returns A promise that resolves to the document ID.
 */
export async function saveDocument({
  collectionPath,
  id,
  data,
  merge = true,
}: {
  collectionPath: string;
  id?: string;
  data: Record<string, any>;
  merge?: boolean;
}): Promise<string> {
  const preparedData = prepareDataForFirestore(data);
  const documentId = id ?? doc(collection(firestore, collectionPath)).id;
  const docRef = doc(firestore, collectionPath, documentId);
  await setDoc(docRef, preparedData, { merge });
  return documentId;
}
