"use client";

import { revalidate } from "@/services/next/revalidation";
import { isValidPath } from "@/utils/helpers";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSuccessToast, useErrorToast } from "@/hooks/useToasts";

/**
 * A Next.js page component that renders a form for revalidating a page.
 *
 * @returns A JSX element that renders the company form.
 */
export default function RevalidationPage() {
  const [path, setPath] = useState("");
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();

  async function handleRevalidate() {
    if (!isValidPath(path)) {
      showErrorToast(`Invalid path: ${path}`);
      return;
    }
    try {
      await revalidate(path);
      showSuccessToast(`Revalidated: ${path}`);
    } catch (error) {
      showErrorToast(`Failed to revalidate: ${path}`);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPath(e.target.value);
  }
  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") await handleRevalidate();
  }
  async function handleClick() {
    await handleRevalidate();
  }

  return (
    <div className="max-w-screen-sm mx-auto px-2 py-8 sm:py-16 flex space-x-2">
      <Input
        placeholder="/companies"
        value={path}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleClick} className="text-normal">
        Revalidate
      </Button>
    </div>
  );
}
