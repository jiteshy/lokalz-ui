"use client";

import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const swrFetcher = useCallback(
    (url: string) => {
      const headers = new Headers();
      if (session?.user?.accessToken) {
        headers.append("Authorization", `Bearer ${session.user.accessToken}`);
      }
      return fetch(url, {
        headers: headers,
      }).then((response) => response.json());
    },
    [session?.user?.accessToken],
  );

  return <SWRConfig value={{ fetcher: swrFetcher }}>{children}</SWRConfig>;
};
