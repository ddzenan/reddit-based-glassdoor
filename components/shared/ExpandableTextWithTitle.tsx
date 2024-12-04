"use client";

import Card from "@/components/shared/Card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { truncateText } from "@/utils/helpers";
import ReactMarkdown from "react-markdown";

const SHORT_TEXT_MAX_LENGTH = 600;

/**
 * Props for the `ExpandableTextWithTitle` component.
 *
 * @property {string} [title] - The optional title displayed at the top of the card.
 * @property {string} text - The main content text to be displayed, which can be toggled between a truncated and full view.
 */
type ExpandableTextWithTitleProps = {
  title?: string;
  text: string;
};

/**
 * A React component that renders a card with an optional title and expandable text content.
 * The text is initially displayed in a truncated form, but can be expanded or collapsed
 * using a toggle button.
 *
 * @param {ExpandableTextWithTitleProps} props - The properties for the component, including an optional title and the main content text.
 * @returns A JSX element that displays a card with expandable text functionality.
 */
export default function ExpandableTextWithTitle({
  title,
  text,
}: ExpandableTextWithTitleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => setIsExpanded((prev) => !prev);

  const displayedText = isExpanded
    ? text
    : truncateText(text, SHORT_TEXT_MAX_LENGTH);

  return (
    <Card title={title}>
      <div className="text-sm text-muted-foreground">
        <ReactMarkdown>{displayedText}</ReactMarkdown>
      </div>
      <Button
        variant="outline"
        className="mt-4 text-xs font-normal"
        onClick={toggleText}
      >
        {isExpanded ? "Show less" : "Show more"}
      </Button>
    </Card>
  );
}
