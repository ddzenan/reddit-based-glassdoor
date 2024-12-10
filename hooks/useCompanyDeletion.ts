import { useState } from "react";
import { deleteCompany as deleteCompanyById } from "@/services/companies/basicCompanyActions";
import { useSuccessToast, useErrorToast } from "@/hooks/useToasts";

/**
 * Represents the return type of the `useCompanyDeletion` hook.
 *
 * This type encapsulates the state and actions provided by the hook for managing company deletion.
 *
 * @property {boolean} isDeleting - Indicates whether a company deletion is currently in progress.
 * @property {(companyId: string) => Promise<void>} deleteCompany - Function to delete a company by its ID.
 * It returns a promise that resolves once the deletion is complete.
 */
type UseCompanyDeletionReturn = {
  isDeleting: boolean;
  deleteCompany: (companyId: string) => Promise<void>;
};

/**
 * Custom hook for managing company deletion functionality.
 *
 * This hook handles the deletion of a company by its ID, providing loading state,
 * error handling, and success/error notifications.
 *
 * @param setCompanies - A state updater function
 * for the companies list, used to remove the deleted company.
 * @returns The state and functions for handling company deletion.
 */
export function useCompanyDeletion<T extends { id: string }>(
  setCompanies: React.Dispatch<React.SetStateAction<T[]>>
): UseCompanyDeletionReturn {
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
    } catch {
      showErrorToast();
    } finally {
      setIsDeleting(false);
    }
  }

  return { isDeleting, deleteCompany };
}
