import Link from "next/link";
import { DarkModeSwitcher, Logo } from "@repo/ui/components";
import DropdownNotification from "./dropdown-notification";
import DropdownUser from "./dropdown-user";
import { MixIcon } from "@radix-ui/react-icons";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full drop-shadow-none bg-slate-200 dark:bg-boxdark-0 dark:drop-shadow-none bg-gradient-to-r from-indigo-500 to-boxdark duration-300 ease-linear dark:from-boxdark dark:to-boxdark-3">
      <div className="flex flex-grow items-start justify-between px-4 py-4 md:px-6">
        <div>
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-300"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "delay-400 !w-full"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-500"
                    }`}
                  ></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-200"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
            {/* <!-- Hamburger Toggle BTN --> */}

            <Link
              href="/store/list"
              className="flex gap-2 pl-3 items-center text-2xl text-slate-100"
            >
              {/* TO-DO: Replace with lokalz icon */}
              <MixIcon className="h-6 w-6" />{" "}
              <div className="flex items-baseline gap-1">
                <span className="font-medium">Lokalz</span>{" "}
                <span className="text-xs text-whiten">ADMIN</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8 2xsm:gap-7">
          <ul className="flex items-center gap-4 2xsm:gap-4">
            <DarkModeSwitcher />
            <DropdownNotification />
          </ul>
          <DropdownUser />
        </div>
      </div>
      {/* </div> */}
    </header>
  );
};

export default Header;
