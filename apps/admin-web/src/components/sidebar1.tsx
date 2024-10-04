"use client";

import Link from "next/link";
import { Logo } from "@repo/ui/components";
import { usePathname } from "next/navigation";
import {
  EnvelopeClosedIcon,
  FileTextIcon,
  MixIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const SideBar = () => {
  const pathName = usePathname();

  return (
    <aside
      className={`absolute top-0 left-0 bottom-0 min-h-screen bg-white shadow border-r border-r-slate-200 text-slate-700`}
    >
      <Link href={"/store/list"}>
        <div className="flex gap-2 items-end p-6">
          <Logo iconOnly={true} />
          {/* <div className={`text-xl pl-1 text-gray-900 ${!showLabels && "hidden"}`}>
            Lokalz
            <span className="pl-2 text-xs text-slate-700">ADMIN</span>
          </div> */}
        </div>
      </Link>
      <ul className="p-3">
        <li
          className={`p-3 mb-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 ${pathName == "/store/list" ? "bg-slate-100 text-deep-purple-accent-400 hover:text-deep-purple-accent-400" : ""}`}
        >
          <Link href={"/store/list"}>
            <div className="flex items-center justify-center">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <MixIcon className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={15}>
                    <p>Stores</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* <div className={`pl-2 text-base ${!showLabels && "hidden"}`}>Stores</div> */}
            </div>
          </Link>
        </li>
        <li
          className={`p-3 mb-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 ${pathName == "/messages/user" ? "bg-slate-100 text-deep-purple-accent-400 hover:text-deep-purple-accent-400" : ""}`}
        >
          <Link href={"/messages/user"}>
            <div className="flex items-center justify-center">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <PersonIcon className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={15}>
                    <p>User Messages</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* <span className={`pl-2 text-base ${!showLabels && "hidden"}`}>User Messages</span> */}
            </div>
          </Link>
        </li>
        <li
          className={`p-3 mb-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 ${pathName == "/messages/vendor" ? "bg-slate-100 text-deep-purple-accent-400 hover:text-deep-purple-accent-400" : ""}`}
        >
          <Link href={"/messages/vendor"}>
            <div className="flex items-center justify-center">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <FileTextIcon className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={15}>
                    <p>Vendor Messages</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* <span className={`pl-2 text-base ${!showLabels && "hidden"}`}>Vendor Messages</span> */}
            </div>
          </Link>
        </li>
        <li
          className={`p-3 mb-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 ${pathName == "/subscription" ? "bg-slate-100 text-deep-purple-accent-400 hover:text-deep-purple-accent-400" : ""}`}
        >
          <Link href={"/subscription"}>
            <div className="flex items-center justify-center">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <EnvelopeClosedIcon className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={15}>
                    <p>Email Subscribers</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* <span className={`pl-2 text-base ${!showLabels && "hidden"}`}>Mailing List</span> */}
            </div>
          </Link>
        </li>
      </ul>
    </aside>
  );
};
