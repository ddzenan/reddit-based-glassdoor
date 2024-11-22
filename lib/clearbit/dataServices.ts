const BASE_URL = "https://logo.clearbit.com";

/**
 * Fetches the logo URL for a given website from Clearbit's API.
 *
 * @param website - The website domain for which to fetch the logo (e.g., "example.com").
 * @returns A promise that resolves to the logo URL as a string if the logo is fetched successfully,
 *                                  or `null` if the logo cannot be retrieved or an error occurs.
 */

export async function fetchClearbitLogo(
  website: string
): Promise<string | null> {
  try {
    const logoUrl = `${BASE_URL}/${website}`;
    const response = await fetch(logoUrl);
    const status = response.status;
    if (status === 200) return logoUrl;
  } finally {
    return null;
  }
}
