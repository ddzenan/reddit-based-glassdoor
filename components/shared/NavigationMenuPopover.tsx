"use client";

import {
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

/**
 * Props for the `NavigationMenuPopover` component.
 *
 * @property {string} triggerLabel - The label for the navigation menu trigger.
 * @property {Array<{ label: string; href: string }>} popoverItems - An array of items to display in the popover,
 * each with a `label` and `href` for navigation.
 */
type NavigationMenuPopoverProps = {
  triggerLabel: string;
  popoverItems: {
    label: string;
    href: string;
  }[];
};

/**
 * A React component that renders a popover menu within a navigation menu.
 * The popover is triggered by a label and displays a list of clickable items.
 *
 * @param {NavigationMenuPopoverProps} props - The properties passed to the component, including `triggerLabel`
 * for the menu trigger and `popoverItems` for the menu options.
 * @returns {JSX.Element} A JSX element that renders a popover navigation menu.
 */
export default function NavigationMenuPopover({
  triggerLabel,
  popoverItems,
}: NavigationMenuPopoverProps) {
  return (
    <>
      <NavigationMenuTrigger>{triggerLabel}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-1 p-2 w-40">
          {popoverItems.map((item) => {
            return (
              <li key={item.label}>
                <Link href={item.href} passHref>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </NavigationMenuContent>
    </>
  );
}
