import { useState } from "react";
import { deleteCompany } from "@/services/companies/basicCompanyActions";
import { Company } from "@/types";
import { useSuccessToast, useErrorToast } from "@/hooks/useToasts";

/**
 * Custom hook for managing company deletion functionality.
 *
 * This hook handles the deletion of a company by its ID, providing loading state,
 * error handling, and success/error notifications.
 *
 * @param setCompanies - A state updater function
 * for the companies list, used to remove the deleted company.
 * @returns An object containing:
 * - `isDeleting`: Boolean indicating if a deletion is in progress.
 * - `deleteCompanyById`: Function to delete a company by its ID.
 */
export function useCompanyDeletion(
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>
) {
  const [isDeleting, setIsDeleting] = useState(false);
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();

  async function deleteCompanyById(companyId: string) {
    setIsDeleting(true);
    try {
      await deleteCompany(companyId);
      setCompanies((prev) =>
        prev.filter((company) => company.id !== companyId)
      );
      showSuccessToast("Company deleted successfully!");
    } catch (error) {
      showErrorToast();
    } finally {
      setIsDeleting(false);
    }
  }

  return { isDeleting, deleteCompanyById };
}
