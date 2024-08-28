import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@repo/ui/utils";
import { SWRProvider } from "@repo/ui/components";
import "./globals.css";
import "@repo/ui/styles.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lokalz - Admin",
  description: "Admin panel for Lokalz app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-white", inter.className)}>
        <SessionProvider>
          <SWRProvider>{children}</SWRProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
