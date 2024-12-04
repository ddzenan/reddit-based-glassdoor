"use client";

import { NavigationMenuPopoverItem } from "@/types";
import { NavigationMenuContent } from "@/components/ui/navigation-menu";
import Link from "next/link";

/**
 * Represents the props for the navigation menu popover.
 *
 * @property {NavigationMenuPopoverItem[]} popoverItems - A list of items to be displayed in the popover menu.
 */
type NavigationMenuPopoverProps = {
  popoverItems: NavigationMenuPopoverItem[];
};

/**
 * A React component that renders a popover menu within a navigation menu.
 * The popover is triggered by a label and displays a list of clickable items.
 *
 * @param {NavigationMenuPopoverProps} props - The properties passed to the component,
 * including `popoverItems` for the menu options.
 * @returns A JSX element that renders a popover navigation menu.
 */
export default function NavigationMenuPopover({
  popoverItems,
}: NavigationMenuPopoverProps) {
  return (
    <NavigationMenuContent>
      <ul className="grid gap-1 p-2 w-40">
        {popoverItems.map((item) => {
          return (
            <li key={item.label}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
    </NavigationMenuContent>
  );
}
