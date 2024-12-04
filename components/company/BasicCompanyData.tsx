"use client";

import { BASIC_COMPANY_DATA_FIELDS } from "@/utils/constants";
import { CompanyDetailsInfo } from "@/types";

/**
 * Props for the `BasicCompanyData` component.
 */
type BasicCompanyDataProps = CompanyDetailsInfo;

/**
 * A React component that displays basic data about a company.
 * Information includes website, year founded, number of employees, and estimated revenue.
 *
 * @param {BasicCompanyDataProps} props - The company data to display.
 * @returns A JSX element rendering the company's information in a grid layout.
 */
export default function BasicCompanyData(props: BasicCompanyDataProps) {
  const infoItems = Object.entries(BASIC_COMPANY_DATA_FIELDS)
    .map(([key, field]) => ({
      label: field.label,
      value: props[key as keyof BasicCompanyDataProps],
    }))
    .filter((item) => item.value);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
      {infoItems.map((item) => (
        <div key={item.label} className="flex flex-col items-start">
          <span className="text-md font-semibold text-foreground">
            {item.value}
          </span>
          <span className="text-sm text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
