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
    <div className="shadow min-h-[57px]">
      <div className="px-6 py-3 md:py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-8 lg:px-24 mb-[2px]">
        {/* Desktop nav bar */}
        <div className="hidden md:flex relative items-center justify-between">
          <NavLogo />
          <NavLinks handleLinkClick={handleLinkClick} />
        </div>

        {/* Mobile nav bar */}
        <div className="md:hidden relative">
          <div className={`flex items-center gap-6 ${isMenuOpen && "fixed bg-white w-full left-0 top-0 px-6 py-3 z-10 border-b border-b-gray-200"}`}>
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="text-deep-purple-accent-400 transition duration-200 focus:outline-none focus:shadow-outline"
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
            className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"} fixed top-[57px] left-0 h-full w-10/12 bg-white z-10 transition-all duration-500 transform shadow-lg`}
          >
            <div className="h-screen">
              <div className="px-6">
                <NavLinksMobile handleLinkClick={handleLinkClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
