"use client";

import { useEffect } from "react";
import { NotFound } from "@repo/ui/components";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // console.error(error); // TO-DO Fix this eslint issue on build
  }, [error]);

  return <NotFound />;
}
