"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTruck } from "@fortawesome/free-solid-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { StoreType } from "@repo/ui/types";
import { cn } from "@repo/ui/utils";

const zipCodeRegex = /^\d{5}$/;

type StoreTypeValue = StoreType | undefined;
type HeroInputs = {
  updateZipCode: (zipCode: string) => void;
  filter: StoreTypeValue;
  updateFilter: (filter: StoreType) => void;
};

export const Hero = ({ updateZipCode, filter, updateFilter }: HeroInputs) => {
  const [text, setText] = useState<string>();
  const [invalidText, setInvalidText] = useState<boolean>(false);

  const onTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    if (!text) setInvalidText(false);
    setText(text);
  };

  const onFIndNowClick = () => {
    setInvalidText(false);
    if (text && zipCodeRegex.test(text)) {
      updateZipCode(text);
    } else {
      setInvalidText(true);
    }
  };

  const onFilterClick = (storeType: StoreType) => {
    updateFilter(storeType);
  };

  return (
    <>
      <div className="bg-indigo-50">
        <div className="px-8 pt-12 md:pt-16 pb-6 md:pb-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="max-w-xl mb-5 md:mb-8 md:mx-auto text-center lg:max-w-2xl">
            <h2 className="max-w-lg mb-5 md:mb-8 font-sans text-2xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 block"
                >
                  <defs>
                    <pattern
                      id="dc223fcc-6d72-4ebc-b4ef-abe121034d6e"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#dc223fcc-6d72-4ebc-b4ef-abe121034d6e)"
                    width="52"
                    height="24"
                  />
                </svg>
                <span className="relative">Find</span>
              </span>
              <span className="relative inline px-2">
                {/* <div className="absolute inset-0 transform -skew-x-12 bg-teal-accent-400" /> */}
                <span className="relative text-gray-900 bg-teal-accent-400 px-2 text-nowrap">
                  local vendors
                </span>
              </span>
              near <br></br> you
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Discover amazing food trucks or local vendors you might be missing
              out on. We help you find them!
            </p>
          </div>
          <div className="md:flex md:justify-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center justify-center bg-white py-4 px-8 sm:px-12 lg:px-16 shadow rounded-full w-auto"
            >
              <div className="w-full">
                <label htmlFor="zipcode" className="block mb-1 text-gray-700">
                  Zipcode{" "}
                  <span
                    className={cn(
                      invalidText ? "text-red-accent-400" : "hidden",
                      "italic text-sm",
                    )}
                  >
                    (Invalid Zip Code)
                  </span>
                </label>
                <input
                  placeholder="E.g. 32256"
                  onChange={onTextChange}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={`${
                    invalidText &&
                    "border-red-accent-400 focus:border-red-accent-100 focus:shadow-red-accent-100"
                  } h-12 px-4 w-full mb-2 text-slate-900 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline`}
                  name="zipcode"
                />
              </div>
              {/* <div className="w-full ml-2">
                <label
                  htmlFor="distance"
                  className="inline-block mb-1 text-gray-700"
                >
                  <span className="hidden lg:inline-block">Distance</span> Less
                  Than
                </label>
                <select
                  name="distance"
                  className="w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                >
                  <option value={5}>5 miles</option>
                  <option value={5}>10 miles</option>
                  <option value={5}>15 miles</option>
                  <option value={5}>20 miles</option>
                </select>
              </div> */}
              <div className="ml-4 mt-5 ">
                <button
                  type="submit"
                  onClick={onFIndNowClick}
                  className="inline-flex text-nowrap items-center justify-center w-full h-12 px-4 md:px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                >
                  {/* <span>Find Now</span> */}
                  <span className="hidden md:block whitespace-nowrap">
                    Find Now
                  </span>
                  <span className="md:hidden text-white">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                  </span>
                </button>
                {/* <a
                  href="/"
                  aria-label=""
                  className="items-center pl-4 text-nowrap font-semibold hidden xl:inline-flex text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  Learn more
                </a> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative px-8 bg-gray-100">
        <div className="absolute inset-0 bg-indigo-50 h-1/2" />
        <div className="relative grid border-b-gray-300 rounded-lg mx-auto overflow-hidden bg-white divide-y shadow sm:divide-y-0 divide-x sm:max-w-screen-sm grid-cols-4 lg:max-w-screen-md">
          <div
            onClick={() => onFilterClick(StoreType.FOOD_TRUCK)}
            className={`${
              filter === StoreType.FOOD_TRUCK
                ? "bg-slate-100 border-b-deep-purple-accent-400"
                : "border-b-slate-100"
            }
              "inline-block p-3 pb-2 !border-b-4 text-center cursor-pointer hover:bg-slate-100"
            `}
          >
            <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 rounded-full bg-indigo-50">
              <div className="p-3">
                <FontAwesomeIcon
                  className="text-deep-purple-accent-700 md:text-2xl"
                  icon={faTruck}
                />
              </div>
            </div>
            <div className="tracking-wide text-gray-800 text-[11px] sm:text-sm whitespace-normal md:whitespace-nowrap">
              Food <div className="sm:inline-block">Trucks</div>
            </div>
          </div>
          <div
            onClick={() => onFilterClick(StoreType.SHOP)}
            className={`${
              filter === StoreType.SHOP
                ? "bg-slate-100 border-b-deep-purple-accent-400"
                : "border-b-slate-100"
            }
              "inline-block p-3 pb-2 !border-b-4 text-center cursor-pointer hover:bg-slate-100"
            `}
          >
            <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 rounded-full bg-indigo-50">
              <div className="p-4">
                <FontAwesomeIcon
                  className="text-deep-purple-accent-700 md:text-2xl"
                  icon={faStore}
                />
              </div>
            </div>
            <div className="tracking-wide text-gray-800 text-[11px] sm:text-sm whitespace-normal md:whitespace-nowrap">
              Local <div className="sm:inline-block">Market</div>
            </div>
          </div>
          <div
            onClick={() => onFilterClick(StoreType.HOME_VENDOR)}
            className={`${
              filter === StoreType.HOME_VENDOR
                ? "bg-slate-100 border-b-deep-purple-accent-400"
                : "border-b-slate-100"
            }
              "inline-block p-3 pb-2 !border-b-4 text-center cursor-pointer hover:bg-slate-100"
            `}
          >
            <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 rounded-full bg-indigo-50">
              <div className="p-4">
                <FontAwesomeIcon
                  className="text-deep-purple-accent-700 md:text-2xl"
                  icon={faHouseUser}
                />
              </div>
            </div>
            <div className="tracking-wide text-gray-800 text-[11px] sm:text-sm whitespace-normal md:whitespace-nowrap">
              Home <div className="sm:inline-block">Vendors</div>
            </div>
          </div>
          <div
            onClick={() => onFilterClick(StoreType.OTHER)}
            className={`${
              filter === StoreType.OTHER
                ? "bg-slate-100 border-b-deep-purple-accent-400"
                : "border-b-slate-100"
            }
              "inline-block p-3 pb-2 !border-b-4 text-center cursor-pointer hover:bg-slate-100"
            `}
          >
            <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 rounded-full bg-indigo-50">
              <div className="p-3">
                <FontAwesomeIcon
                  className="text-deep-purple-accent-700 md:text-2xl"
                  icon={faEllipsis}
                />
              </div>
            </div>
            <div className="tracking-wide text-gray-800 text-[11px] sm:text-sm whitespace-normal md:whitespace-nowrap">
              All <div className="sm:inline-block">Others</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
