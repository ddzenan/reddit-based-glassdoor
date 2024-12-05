"use client";

import { NavigationMenuPopoverItem } from "@/types";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import NavigationMenuPopover from "./NavigationMenuPopover";

/**
 * Represents a navigation item.
 *
 * @property {string} label - The label for the navigation item.
 * @property {string} [href] - The URL that the navigation item links to. This is either this or `children` must be provided.
 * @property {NavigationMenuPopoverItem[]} [children] - A list of child items in the navigation item. This is either this or `href` must be provided.
 */
type NavigationItem = {
  label: string;
} & (
  | { href: string; children?: never }
  | { children: NavigationMenuPopoverItem[]; href?: never }
);

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Companies",
    href: "/companies",
  },
  {
    label: "Admin",
    children: [
      {
        label: "Add Company",
        href: "/admin/company/form",
      },
      {
        label: "Edit Companies",
        href: "/admin/companies",
      },
      {
        label: "Revalidate",
        href: "/admin/revalidation",
      },
    ],
  },
];

/**
 * A header component with navigation links and admin options.
 *
 * @returns A sticky header with a modern blur effect and navigation.
 */
export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 p-4 backdrop-filter backdrop-blur-lg">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList>
          {NAVIGATION_ITEMS.map((item) => (
            <NavigationMenuItem key={item.label}>
              {item.children ? (
                <>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuPopover popoverItems={item.children} />
                </>
              ) : item.href ? (
                <Link href={item.href} className={navigationMenuTriggerStyle()}>
                  {item.label}
                </Link>
              ) : null}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
