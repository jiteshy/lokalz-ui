"use client";

import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const swrFetcher = useCallback((url: string) => {
    const headers = new Headers();
    if (session?.accessToken) {
      headers.append("Authorization", session.accessToken);
    }
    return fetch(url, {
      headers: headers,
    }).then((response) => response.json());
  }, []);

  return <SWRConfig value={{ fetcher: swrFetcher }}>{children}</SWRConfig>;
};
