"use client";

import { SWRConfig } from "swr";

const swrFetcher = (url: string) => {
  return fetch(url).then((response) => response.json());
};

export const SWRProvider = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ fetcher: swrFetcher }}>{children}</SWRConfig>
);
