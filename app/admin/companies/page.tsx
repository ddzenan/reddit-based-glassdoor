"use client";

import { useState } from "react";
import {
  searchCompaniesByName,
  deleteCompany,
} from "@/services/companies/basicCompanyActions";
import { Company } from "@/types";
import SearchBar from "@/components/admin/companies/SearchBar";
import CompaniesList from "@/components/admin/companies/CompaniesList";
import { useSuccessToast, useErrorToast } from "@/hooks/useToasts";

/**
 * A Next.js page component that renders search bar and admin's companies list.
 * The search bar allows users to search for companies by name.
 * For each company it is possible to edit or delete it.
 *
 * @returns {Promise<JSX.Element>} A JSX element that renders search bar and companies list.
 */
export default function AdminCompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();

  async function handleSearch() {
    if (!searchQuery.trim()) return;
    setIsLoadingCompanies(true);
    setIsError(false);
    try {
      const result = (await searchCompaniesByName(searchQuery, [
        "id",
        "name",
        "slug",
      ])) as Company[];
      setCompanies(result);
    } catch (error) {
      setCompanies([]);
      setIsError(true);
    } finally {
      setIsLoadingCompanies(false);
    }
  }

  async function handleDeleteCompany(companyId: string) {
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

  return (
    <div className="max-w-screen-sm mx-auto px-2 py-8 sm:py-16">
      <SearchBar
        isLoading={isLoadingCompanies}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <div className="mt-16">
        {isLoadingCompanies ? (
          <p className="text-center">Loading...</p>
        ) : isError ? (
          <p className="text-red-500 text-center">
            An error occurred, please try again.
          </p>
        ) : (
          <CompaniesList
            companies={companies}
            onDeleteCompany={handleDeleteCompany}
            isDeleting={isDeleting}
          />
        )}
      </div>
    </div>
  );
}
