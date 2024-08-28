"use client";

import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "@/auth";

export const AdminNav = () => {
  const { data: session } = useSession();

  return (
    <div className="px-6 py-5 mx-auto w-full">
      <div className="relative flex items-center justify-between">
        <h4 className="text-xl font-semibold text-slate-700">
          Welcome, {session?.user?.name}!
        </h4>
        <ul className="flex items-center space-x-8">
          <li>
            <form
              action={async () => {
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="text-slate-700 items-center pl-4 text-nowrap font-semibold inline-flex transition-colors duration-200 hover:text-slate-800"
                aria-label="Logout"
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                <span className="pl-2">Logout</span>
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};
