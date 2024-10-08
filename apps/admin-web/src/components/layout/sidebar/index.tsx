"use client";

import Link from "next/link";
import { SidebarItem } from "@/components/layout/sidebar/sidebar-item";
import { ClickOutside, DarkModeSwitcher, Logo } from "@repo/ui/components";
import { useLocalStorage } from "@repo/ui/hooks";
import {
  BookmarkIcon,
  ChatBubbleIcon,
  DashboardIcon,
  EnvelopeClosedIcon,
  MixIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { FC, ReactElement } from "react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

type MenuItem = {
  icon: ReactElement;
  label: string;
  route: string;
};

type Menu = {
  name: string;
  menuItems: MenuItem[];
};

const menuGroups: Menu[] = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <DashboardIcon className="w-5 h-5" />,
        label: "Dashboard",
        route: "/store/list",
      },
      {
        icon: <PlusIcon className="h-5 w-5" />,
        label: "Create Store",
        route: "/store/new",
      },
    ],
  },
  {
    name: "SUPPORT",
    menuItems: [
      {
        icon: <EnvelopeClosedIcon className="h-5 w-5" />,
        label: "Vendor Messages",
        route: "/messages/vendor",
      },
      {
        icon: <ChatBubbleIcon className="h-5 w-5" />,
        label: "User Messages",
        route: "/messages/user",
      },
      {
        icon: <BookmarkIcon className="h-5 w-5" />,
        label: "Email Subscriptions",
        route: "/subscription",
      },
    ],
  },
];

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-67.5 flex-col overflow-y-hidden bg-gradient-to-b from-indigo-500 to-boxdark duration-300 ease-linear dark:from-boxdark dark:to-boxdark-3 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5">
          <Link
            href="/store/list"
            className="flex gap-3 items-center text-2xl text-slate-100"
          >
            {/* TO-DO: Replace with lokalz icon */}
            <MixIcon className="h-6 w-6" />{" "}
            <div className="flex items-baseline gap-2">
              <span className="font-medium">Lokalz</span>{" "}
              <span className="text-xs text-whiten">ADMIN</span>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current text-slate-100"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="relative no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="px-4 py-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-t-strokedark pt-3">
              <h3 className="ml-4 text-sm font-semibold text-bodydark2">
                DARK MODE
              </h3>
              <DarkModeSwitcher />
            </div>
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};
