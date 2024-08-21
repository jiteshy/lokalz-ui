import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { cn } from "@repo/ui/utils";
import { Footer } from "@repo/ui/user/components";
import { SWRProvider } from "@repo/ui/components";
import { Nav } from "@repo/ui/user/components";
import "@repo/ui/styles.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lokalz",
  description:
    "App which brings the community closer with local businesses e.g. food trucks, art vendors etc.",
};

export const viewport: Viewport = {
  viewportFit: "contain",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-white", inter.className)}>
        <SWRProvider>
          <Nav />
          {children}
          <div className="hidden md:block">
            <Footer />
          </div>
        </SWRProvider>
      </body>
    </html>
  );
}
