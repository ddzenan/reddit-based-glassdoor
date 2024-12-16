//import { handleCompaniesPageData } from "@/services/companies/handleCompaniesPageData";
import CompanyList from "@/components/companies/CompanyList";
import { CompanyBasicInfoWithLogo } from "@/types";

/**
 * A Next.js page component that renders a list of companies.
 *
 * @returns A JSX element that renders the companies page.
 */
export default async function CompaniesPage() {
  const companies: CompanyBasicInfoWithLogo[] = [];
  return (
    <div className="max-w-screen-md mx-auto px-2 py-8 sm:py-16">
      <CompanyList companies={companies} />
    </div>
  );
}
