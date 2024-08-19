"use client";

import { useEffect } from "react";
import { Error } from "@repo/ui/components";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <Error reset={reset} />;
}
