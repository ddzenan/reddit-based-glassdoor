"use client";

import { useCompaniesSearch } from "@/hooks/useCompaniesSearch";
import { useCompanyDeletion } from "@/hooks/useCompanyDeletion";
import SearchBar from "@/components/admin/companies/SearchBar";
import CompaniesList from "@/components/admin/companies/CompaniesList";

/**
 * A Next.js page component that renders search bar and admin's companies list.
 * The search bar allows users to search for companies by name.
 * For each company it is possible to edit or delete it.
 *
 * @returns {Promise<JSX.Element>} A JSX element that renders search bar and companies list.
 */
export default function AdminCompaniesPage() {
  const {
    searchQuery,
    setSearchQuery,
    companies,
    setCompanies,
    isLoading,
    isError,
    search,
  } = useCompaniesSearch();
  const { isDeleting, deleteCompany } = useCompanyDeletion(setCompanies);

  return (
    <div className="max-w-screen-sm mx-auto px-2 py-8 sm:py-16">
      <SearchBar
        isLoading={isLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={search}
      />
      <div className="mt-16">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : isError ? (
          <p className="text-red-500 text-center">
            An error occurred, please try again.
          </p>
        ) : (
          <CompaniesList
            companies={companies}
            onDeleteCompany={deleteCompany}
            isDeleting={isDeleting}
          />
        )}
      </div>
    </div>
  );
}
