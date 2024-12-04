"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import NavigationMenuPopover from "./NavigationMenuPopover";

const NAVIGATION_ITEMS = [
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
                <NavigationMenuPopover
                  triggerLabel={item.label}
                  popoverItems={item.children}
                />
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
