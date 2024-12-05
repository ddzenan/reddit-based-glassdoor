"use server";

import { revalidatePath } from "next/cache";

/**
 * Revalidates a page at the specified path.
 *
 * @param path - The path to revalidate.
 */
export async function revalidate(path: string): Promise<void> {
  revalidatePath(path);
}
