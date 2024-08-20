"use client";

import { cn } from "@repo/ui/utils";
import { usePathname } from "next/navigation";

type NavLinksProps = {
  handleLinkClick: (route: string) => void;
};

export const NavLinks = ({ handleLinkClick }: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <ul className="items-center hidden space-x-8 md:flex">
      <li>
        <button
          onClick={() => handleLinkClick("/about")}
          className={cn(
            pathname === "/about"
              ? "text-deep-purple-accent-700"
              : "text-gray-800",
            "items-center pl-4 text-nowrap font-semibold inline-flex transition-colors duration-200 hover:text-deep-purple-accent-700",
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
              ? "text-deep-purple-accent-700"
              : "text-gray-800",
            "items-center pl-4 text-nowrap font-semibold inline-flex transition-colors duration-200 hover:text-deep-purple-accent-700",
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
              ? "text-deep-purple-accent-700"
              : "text-gray-800",
            "items-center pl-4 text-nowrap font-semibold inline-flex transition-colors duration-200 hover:text-deep-purple-accent-700",
          )}
          aria-label="What's Coming"
        >
          What&apos;s Coming?
        </button>
      </li>
    </ul>
  );
};
