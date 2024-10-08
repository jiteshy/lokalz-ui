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
    // console.error(error); // TO-DO Fix this eslint issue on build
  }, [error]);

  return <Error reset={reset} />;
}
