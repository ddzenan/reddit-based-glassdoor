import { Button } from "@/components/ui/button";
import { CompanyBasicInfoWithId } from "@/types";
import AlertDialogModal from "@/components/shared/AlertDialogModal";
import Link from "next/link";

/**
 * Props for the `CompanyCard` component.
 *
 * @property {CompanyBasicInfoWithId} - Contains the basic information about the company.
 * @property {(companyId: string) => void} onDeleteCompany - Function to trigger the deletion of the company.
 * @property {boolean} isDeleting - Indicates whether the company is currently being deleted.
 */
type CompanyCardProps = CompanyBasicInfoWithId & {
  onDeleteCompany: (companyId: string) => void;
  isDeleting: boolean;
};

/**
 * A React component that displays information about a company.
 * Includes options for editing or deleting the company.
 *
 * @param {CompanyCardProps} props - The properties for the component, including company details and action handlers.
 * @returns {JSX.Element} A JSX element containing the company details and action buttons.
 */
export default function CompanyCard({
  id,
  slug,
  name,
  onDeleteCompany,
  isDeleting,
}: CompanyCardProps) {
  return (
    <div className="flex justify-between items-center border p-4 rounded">
      <h2 className="font-semibold text-blue-500 hover:underline">
        <Link href={`/company/${slug}`}>{name}</Link>
      </h2>
      <div className="flex space-x-2">
        <Button asChild className="bg-blue-500 text-normal">
          <Link href={`/admin/company/form?id=${id}`}>Edit</Link>
        </Button>
        <AlertDialogModal
          triggerButtonLabel="Delete"
          triggerButtonVariant="destructive"
          title="Are you sure?"
          description="This action cannot be undone. It will permanently delete this company."
          actionButtonClassName="text-normal"
          onAction={() => {
            onDeleteCompany(id);
          }}
          isActionButtonDisabled={isDeleting}
        />
      </div>
    </div>
  );
}
