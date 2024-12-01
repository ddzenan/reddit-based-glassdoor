import CompanyCard from "@/components/admin/companies/CompanyCard";
import { Company } from "@/types";

/**
 * Props for the `CompaniesList` component.
 *
 * @property {Company[]} companies - Array of company objects to display.
 * @property {(companyId: string) => void} onDeleteCompany - Function to trigger the deletion of a company.
 * @property {boolean} isDeleting - Indicates whether a company is currently being deleted.
 */
type CompaniesListProps = {
  companies: Company[];
  onDeleteCompany: (companyId: string) => void;
  isDeleting: boolean;
};

/**
 * A React component that renders a list of companies.
 * Displays a message if no companies are available.
 *
 * @param {CompaniesListProps} props - The properties for the component, including company data and action handlers.
 * @returns {JSX.Element} A JSX element containing a list of companies or a fallback message.
 */
export default function CompaniesList({
  companies,
  onDeleteCompany,
  isDeleting,
}: CompaniesListProps) {
  return (
    <div className="grid gap-4">
      {companies.length === 0 ? (
        <p className="text-center">No companies found.</p>
      ) : (
        companies.map((company) => (
          <CompanyCard
            key={company.id}
            {...company}
            onDeleteCompany={onDeleteCompany}
            isDeleting={isDeleting}
          />
        ))
      )}
    </div>
  );
}
