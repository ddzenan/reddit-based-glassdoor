"use client";

import {
  Card as DefaultCard,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

/**
 * Props for the `Card` component.
 *
 * @property {string} [title] - The title of the card, displayed at the top of the card.
 * @property {string} [description] - The description of the card, displayed below the title.
 * @property {React.ReactNode} children - The content to be displayed within the card.
 */
type CardProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

/**
 * A React component that renders a card with an optional title and description.
 * The card content is customizable via the `children` prop.
 *
 * @param {CardProps} props - The properties passed to the `Card` component, including title, description, and children content.
 * @returns A JSX element that renders the card with optional title, description, and content.
 */
export default function Card({ title, description, children }: CardProps) {
  return (
    <DefaultCard className="w-full my-4 p-4 sm:p-8">
      {(title || description) && (
        <CardHeader className="p-0 mb-4">
          {title && (
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          )}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="p-0">{children}</CardContent>
    </DefaultCard>
  );
}
