"use client";

import Image from "next/image";
import { CompanyNameWithLogoAndSize } from "@/types";
import { CiImageOn } from "react-icons/ci";

const SIZE_CONFIG = {
  sm: {
    imgSize: 20,
    textClass: "text-sm font-normal",
  },
  md: {
    imgSize: 30,
    textClass: "text-lg font-medium",
  },
  lg: {
    imgSize: 40,
    textClass: "text-2xl font-semibold",
  },
};

/**
 * Props for the `CompanyNameWithLogo` component.
 */
type CompanyNameWithLogoProps = CompanyNameWithLogoAndSize;

/**
 * A React component that displays the name and logo of a company.
 * If the logo is unavailable, a placeholder image is displayed instead.
 * The component supports three different sizes: small (`sm`), medium (`md`), and large (`lg`).
 *
 * @param {CompanyNameWithLogoProps} props - Props for the component.
 * @returns A JSX element showing the company's name and logo.
 */
export default function CompanyNameWithLogo({
  name,
  logo,
  size = "md",
}: CompanyNameWithLogoProps) {
  const { imgSize, textClass } = SIZE_CONFIG[size];

  return (
    <div className="flex items-center space-x-4">
      {logo ? (
        <Image
          src={logo}
          alt={`${name} Logo`}
          width={imgSize}
          height={imgSize}
          className="rounded-md"
        />
      ) : (
        <CiImageOn className="text-foreground rounded-md" size={imgSize} />
      )}
      <h1 className={`${textClass} text-foreground`}>{name}</h1>
    </div>
  );
}
