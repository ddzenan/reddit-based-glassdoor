import { firestore } from "./firebaseAdmin";
import { firestore as firestoreAdmin } from "firebase-admin";

/**
 * Fetches documents from a Firestore collection based on a specific field and its value.
 *
 * @param collection - The name of the Firestore collection to query.
 * @param field - The name of the field to filter documents by.
 * @param value - The value of the field to match documents against, allowing any data type Firestore supports.
 * @returns A promise that resolves to the objects that match the query, or undefined if no matching documents are found.
 */
export async function getDocumentsByField(
  collection: string,
  field: string,
  value: unknown
): Promise<Record<string, unknown>[] | undefined> {
  const snapshot = await firestore
    .collection(collection)
    .where(field, "==", value)
    .get();

  if (snapshot.empty) {
    return undefined;
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/**
 * Updates a main document in Firestore and creates new documents in a subcollection in a single batch.
 *
 * @param docPath - The path of the main document.
 * @param updateData - The data to update in the main document.
 * @param subcollection - The name of the subcollection to add new documents to (e.g., "redditPosts").
 * @param subcollectionData - An array of data objects to create as new documents in the subcollection.
 */
export async function updateDocumentAndAddToSubcollection(
  docPath: string,
  updateData: Record<string, any>,
  subcollection: string,
  subcollectionData: Record<string, any>[]
): Promise<void> {
  const docRef = firestore.doc(docPath);
  const batch = firestore.batch();
  batch.update(docRef, updateData);
  subcollectionData.forEach((data) => {
    const subDocRef = data.id
      ? docRef.collection(subcollection).doc(data.id)
      : docRef.collection(subcollection).doc();
    batch.set(subDocRef, data);
  });
  await batch.commit();
}

/**
 * Fetches all documents from a Firestore collection or subcollection based on a specified field.
 *
 * @param collectionPath - Path to the Firestore collection (e.g., "/companies" or "/companies/{companyId}/redditPosts").
 * @param selectFields - Optional array of field names to include in the query results.
 * @returns A promise that resolves to an array of documents, each containing only the specified fields or all fields if none are specified.
 */
export async function fetchAllDocuments<T = Record<string, any>>(
  collectionPath: string,
  selectFields?: (keyof T)[]
): Promise<T[]> {
  const collectionRef = firestore.collection(collectionPath);
  let query = collectionRef as firestoreAdmin.Query<T>;

  if (selectFields && selectFields.length > 0)
    query = query.select(...(selectFields as string[]));

  const snapshot = await query.get();
  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
}
