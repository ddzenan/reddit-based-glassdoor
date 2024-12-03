"use client";

import Card from "@/components/shared/Card";
import CompanyNameWithLogo from "@/components/shared/CompanyNameWithLogo";
import BasicCompanyData from "./BasicCompanyData";
import { CompanyBasicInfoWithLogo, CompanyDetailsInfo } from "@/types";

/**
 * Props for the `CompanyHeader` component.
 *
 * Combines the props from `CompanyBasicInfoWithLogo` and `CompanyDetailsInfo` components.
 */
type CompanyHeaderProps = Omit<CompanyBasicInfoWithLogo, "slug"> &
  CompanyDetailsInfo;

/**
 * A React component that renders a company header.
 * Displays the company name and logo along with basic company information.
 *
 * @param {CompanyHeaderProps} props - The properties passed to the `CompanyHeader` component.
 * @returns {JSX.Element} A JSX element that renders the company header.
 */
export default function CompanyHeader({
  name,
  logo,
  website,
  yearFounded,
  numberOfEmployees,
  estimatedRevenue,
}: CompanyHeaderProps) {
  return (
    <Card>
      <CompanyNameWithLogo name={name} logo={logo} size="lg" />
      <BasicCompanyData
        website={website}
        yearFounded={yearFounded}
        numberOfEmployees={numberOfEmployees}
        estimatedRevenue={estimatedRevenue}
      />
    </Card>
  );
}
