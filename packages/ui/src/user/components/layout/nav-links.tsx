"use client";

import { cn } from "@repo/ui/utils";
import { usePathname } from "next/navigation";

type NavLinksProps = {
  handleLinkClick: (route: string) => void;
};

export const NavLinks = ({ handleLinkClick }: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <ul className="ui-items-center ui-hidden ui-space-x-8 md:ui-flex">
      <li>
        <button
          onClick={() => handleLinkClick("/about")}
          className={cn(
            pathname === "/about"
              ? "ui-text-deep-purple-accent-700"
              : "ui-text-gray-800",
            "ui-items-center ui-pl-4 ui-whitespace-nowrap ui-inline-flex ui-transition-colors ui-duration-200 hover:ui-text-deep-purple-accent-700",
          )}
          aria-label="About Us"
        >
          About Us
        </button>
      </li>
      <li>
        <button
          onClick={() => handleLinkClick("/onboard")}
          className={cn(
            pathname === "/onboard"
              ? "ui-text-deep-purple-accent-700"
              : "ui-text-gray-800",
            "ui-items-center ui-pl-4 ui-whitespace-nowrap ui-inline-flex ui-transition-colors ui-duration-200 hover:ui-text-deep-purple-accent-700",
          )}
          aria-label="Vendor Onboarding"
        >
          Vendor Onboarding
        </button>
      </li>
      <li>
        <button
          onClick={() => handleLinkClick("/future")}
          className={cn(
            pathname === "/future"
              ? "ui-text-deep-purple-accent-700"
              : "ui-text-gray-800",
            "ui-items-center ui-pl-4 ui-whitespace-nowrap ui-inline-flex ui-transition-colors ui-duration-200 hover:ui-text-deep-purple-accent-700",
          )}
          aria-label="What's Coming"
        >
          What&apos;s Coming?
        </button>
      </li>
    </ul>
  );
};
