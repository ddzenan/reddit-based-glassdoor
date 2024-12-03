"use client";

import CompanyCard from "./CompanyCard";
import { CompanyBasicInfoWithLogo } from "@/types";

/**
 * Props for the `CompanyList` component.
 *
 * @property {CompanyBasicInfoWithLogo[]} companies - An array of company data to be displayed as individual cards.
 */
type CompanyListProps = {
  companies: CompanyBasicInfoWithLogo[];
};

/**
 * Component that renders a list of companies as a responsive grid of cards.
 *
 * @param {CompanyListProps} props - The properties for the `CompanyList` component, including an array of companies.
 * @returns {JSX.Element} A JSX element that displays a grid of `CompanyCard` components.
 */
export default function CompanyList({ companies }: CompanyListProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-12">
        List of Companies
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <CompanyCard
            key={company.slug}
            name={company.name}
            logo={company.logo}
            slug={company.slug}
          />
        ))}
      </div>
    </div>
  );
}
