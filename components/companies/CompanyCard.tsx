"use client";

import Link from "next/link";
import CompanyNameWithLogo from "@/components/shared/CompanyNameWithLogo";
import { CompanyCardProps } from "@/types";

/**
 * Component that renders a card displaying a company's name and logo.
 * The card is clickable and navigates to the company's page when clicked.
 *
 * @param {CompanyCardProps} props - The properties for the `CompanyCard` component, including the company name, logo, and slug.
 * @returns {JSX.Element} A JSX element that renders the company's card.
 */
export default function CompanyCard({ name, logo, slug }: CompanyCardProps) {
  return (
    <Link
      className="flex items-center border rounded-md p-4 cursor-pointer hover:bg-muted transition-colors no-underline"
      href={`/company/${slug}`}
      passHref
    >
      <CompanyNameWithLogo name={name} logo={logo} size="md" />
    </Link>
  );
}
