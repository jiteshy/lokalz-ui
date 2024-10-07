"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ClickOutside } from "@repo/ui/components";
import { CaretDownIcon, CaretUpIcon, PersonIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { Logout } from "./logout";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-1"
        href="#"
      >
        <span className="hidden text-right lg:block pr-2">
          <span className="block text-sm font-medium text-whiter dark:text-whiter">
            {session?.user?.name || "User"}
          </span>
          <span className="block text-xs text-slate-200 dark:text-slate-400">
            Super Admin
          </span>
        </span>

        <span className="h-10 w-10 rounded-full dark:text-white">
          {session?.user?.image ? (
            <Image
              width={40}
              height={40}
              src={session.user.image}
              style={{
                width: "40px",
                height: "40px",
              }}
              alt="User"
            />
          ) : (
            <PersonIcon className="h-5 w-5" />
          )}
        </span>

        {dropdownOpen ? (
          <CaretUpIcon className="h-5 w-5 text-white" />
        ) : (
          <CaretDownIcon className="h-5 w-5 text-white" />
        )}
      </Link>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-2 flex w-50 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-4 dark:border-strokedark">
            <li>
              <Link
                onClick={() => setDropdownOpen(false)}
                href="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary"
              >
                <PersonIcon className="h-5 w-5" />
                My Profile
              </Link>
            </li>
          </ul>
          <Logout />
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
