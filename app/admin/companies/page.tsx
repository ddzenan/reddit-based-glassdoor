"use client";

import { useCompaniesSearch } from "@/hooks/useCompaniesSearch";
import { useCompanyDeletion } from "@/hooks/useCompanyDeletion";
import { CompanyBasicInfoWithId } from "@/types";
import SearchBar from "@/components/admin/companies/SearchBar";
import CompaniesList from "@/components/admin/companies/CompaniesList";
import ErrorAlert from "@/components/shared/ErrorAlert";

/**
 * A Next.js page component that renders search bar and admin's companies list.
 * The search bar allows users to search for companies by name.
 * For each company it is possible to edit or delete it.
 *
 * @returns A JSX element that renders search bar and companies list.
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
  const { isDeleting, deleteCompany } =
    useCompanyDeletion<CompanyBasicInfoWithId>(setCompanies);

  return (
    <div className="max-w-screen-sm mx-auto px-2 py-8 sm:py-16">
      <SearchBar
        isLoading={isLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={search}
      />
      <p className="text-xs text-muted-foreground">
        It is necessary to enter the correct name of the company (the search is
        case sensitive)
      </p>
      <div className="mt-16">
        {isLoading ? (
          <p className="text-center" data-cy="loading-companies">
            Loading...
          </p>
        ) : isError ? (
          <ErrorAlert />
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
