import { handleCompaniesPageData } from "@/services/companies/handleCompaniesPageData";
import CompanyList from "@/components/companies/CompanyList";
import { CompanyBasicInfoWithLogo } from "@/types";

/**
 * Props for the `CompaniesPage` component.
 */
type CompaniesPageProps = {
  companies: CompanyBasicInfoWithLogo[];
};

/**
 * A Next.js page component that renders a list of companies.
 *
 * @returns A JSX element that renders the companies page.
 */
export default async function CompaniesPage({ companies }: CompaniesPageProps) {
  return (
    <div className="max-w-screen-md mx-auto px-2 py-8 sm:py-16">
      <CompanyList companies={companies} />
    </div>
  );
}

export async function getServerSideProps() {
  const companies = await handleCompaniesPageData();

  return {
    props: {
      companies,
    },
  };
}
