import { useState } from "react";
import { deleteCompany as deleteCompanyById } from "@/services/companies/basicCompanyActions";
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
 * - `deleteCompany`: Function to delete a company by its ID.
 */
export function useCompanyDeletion<T extends { id: string }>(
  setCompanies: React.Dispatch<React.SetStateAction<T[]>>
) {
  const [isDeleting, setIsDeleting] = useState(false);
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();

  async function deleteCompany(companyId: string) {
    setIsDeleting(true);
    try {
      await deleteCompanyById(companyId);
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

  return { isDeleting, deleteCompany };
}
