import { getAllDocuments } from "@/lib/firebaseAdmin/dataServices";
import { fetchClearbitLogo } from "@/lib/clearbit/dataServices";
import { CompanyCardProps } from "@/types";

/**
 * Handles fetching and processing data for the /companies page.
 *
 * @returns A promise that resolves to an array of company objects that contains name, slug and logo.
 */
export async function handleCompaniesPageData(): Promise<CompanyCardProps[]> {
  const companies = await getAllDocuments("companies", [
    "name",
    "slug",
    "website",
  ]);
  const companiesWithLogos = await Promise.all(
    companies.map(async (company) => {
      if (!company.website) return company;
      const logo = await fetchClearbitLogo(company.website);
      delete company.website;
      if (logo) return { ...company, logo };
      return company;
    })
  );
  return companiesWithLogos;
}
