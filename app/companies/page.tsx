import { handleCompaniesPageData } from "@/services/companies/handleCompaniesPageData";
import CompanyList from "@/components/companies/CompanyList";

/**
 * A Next.js page component that renders a list of companies.
 *
 * @returns {Promise<JSX.Element>} A JSX element that renders the companies page.
 */
export default async function CompaniesPage() {
  const companies = await handleCompaniesPageData();
  return (
    <div className="max-w-screen-md mx-auto px-2 py-8 sm:py-16">
      <CompanyList companies={companies} />
    </div>
  );
}
