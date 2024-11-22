"use client";

import Card from "@/components/shared/Card";

/**
 * Props for the `TextWithTitleCard` component.
 *
 * @property {string} title - The title to be displayed at the top of the card.
 * @property {string} content - The text content to be displayed inside the card.
 */
type TextWithTitleCardProps = {
  title: string;
  content: string;
};

/**
 * A React component that renders a card with a title and text content.
 *
 * @param {TextWithTitleCardProps} props - The properties passed to the `TextWithTitleCard` component, including a title and content.
 * @returns {JSX.Element} A JSX element that renders the card with the specified title and content.
 */
export default function TextWithTitleCard({
  title,
  content,
}: TextWithTitleCardProps) {
  return (
    <Card title={title}>
      <p className="text-sm text-muted-foreground">{content}</p>
    </Card>
  );
}
