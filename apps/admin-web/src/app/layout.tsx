import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@repo/ui/utils";
import "./globals.css";
import "@repo/ui/styles.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SessionProvider } from "next-auth/react";
import { SWRProvider } from "@/components/swr-provider";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lokalz - Admin",
  description: "Admin panel for Lokalz app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="dark:bg-boxdark-0 dark:text-bodydark">
          <SessionProvider session={session}>
            <SWRProvider>{children}</SWRProvider>
          </SessionProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
