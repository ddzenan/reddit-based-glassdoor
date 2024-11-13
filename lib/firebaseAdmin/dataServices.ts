import { firestore } from "./firebaseAdmin";

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
