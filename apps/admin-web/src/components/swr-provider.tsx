"use client";

import { useSession } from "next-auth/react";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  const swrFetcher = (url: string) => {
    const headers = new Headers();
    if (session?.data?.accessToken) {
      headers.append("Authorization", session.data.accessToken);
    }
    return fetch(url, {
      headers: headers,
    }).then((response) => response.json());
  };

  return <SWRConfig value={{ fetcher: swrFetcher }}>{children}</SWRConfig>;
};
