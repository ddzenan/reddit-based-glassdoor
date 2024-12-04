import CompanyForm from "@/components/admin/company/form/CompanyForm";

/**
 * Props for the `CompanyFormPage` component.
 *
 * @property {Object} searchParams - The search parameters for the page, including the company ID.
 * @property {string} searchParams.id - The ID of the company to be edited.
 */
type CompanyFormPageProps = {
  searchParams: {
    id: string;
  };
};

/**
 * A Next.js page component that renders a form for adding or editing a company.
 *
 * @param {CompanyFormPageProps} props - The properties passed to the `CompanyFormPage` component.
 * @returns A JSX element that renders the company form.
 */
export default async function CompanyFormPage(props: CompanyFormPageProps) {
  const { searchParams } = await props;
  const { id } = await searchParams;
  return (
    <div className="max-w-screen-sm mx-auto px-2 py-8 sm:py-16">
      <CompanyForm companyId={id} />
    </div>
  );
}
