"use client";

import { useState } from "react";
import { Logo } from "@repo/ui/components";
import { NavLinks } from "./nav-links";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NavLinksMobile } from "./nav-links-mobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const NavLogo = () => {
  return (
    <Link href="/">
      <Logo />
    </Link>
  );
};

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLinkClick = (route: string) => {
    if (isMenuOpen) setIsMenuOpen(false);
    router.push(route);
  };

  return (
    <div className="ui-shadow ui-min-h-[57px]">
      <div className="ui-px-8 ui-py-3 md:ui-py-5 ui-mx-auto sm:ui-max-w-xl md:ui-max-w-full lg:ui-max-w-screen-xl md:ui-px-8 lg:ui-px-24 ui-mb-[2px]">
        {/* Desktop nav bar */}
        <div className="ui-hidden md:ui-flex ui-relative ui-items-center ui-justify-between">
          <NavLogo />
          <NavLinks handleLinkClick={handleLinkClick} />
        </div>

        {/* Mobile nav bar */}
        <div className="md:ui-hidden ui-relative">
          <div
            className={`ui-flex ui-items-center ui-gap-6 ${isMenuOpen && "ui-fixed ui-bg-white ui-w-full ui-left-0 ui-top-0 ui-px-8 ui-py-3 ui-z-10 ui-border-b ui-border-b-gray-200"}`}
          >
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="ui-text-deep-purple-accent-400 ui-transition ui-duration-200 focus:ui-outline-none focus:ui-shadow-outline"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faXmark} size="xl" />
              ) : (
                <FontAwesomeIcon icon={faBars} size="xl" />
              )}
            </button>
            <NavLogo />
          </div>

          <div
            className={`${isMenuOpen ? "ui-translate-x-0" : "-ui-translate-x-full"} ui-fixed ui-top-[57px] ui-left-0 ui-h-full ui-w-10/12 ui-bg-white ui-z-10 ui-transition-all ui-duration-500 ui-transform ui-shadow-lg`}
          >
            <div className="ui-h-screen">
              <div className="ui-px-8">
                <NavLinksMobile handleLinkClick={handleLinkClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
