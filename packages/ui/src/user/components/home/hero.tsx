"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTruck } from "@fortawesome/free-solid-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { StoreType } from "@repo/ui/types";
import { cn } from "@repo/ui/utils";
import { ZIPCODE_REGEX } from "@repo/ui/config";

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
    if (text && ZIPCODE_REGEX.test(text)) {
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
      <div className="ui-bg-indigo-50">
        <div className="ui-px-8 ui-pt-12 md:ui-pt-16 ui-pb-6 md:ui-pb-10 ui-mx-auto sm:ui-max-w-xl md:ui-max-w-full lg:ui-max-w-screen-xl md:ui-px-24 lg:ui-px-8">
          <div className="ui-max-w-xl ui-mb-5 md:ui-mb-8 md:ui-mx-auto ui-text-center lg:ui-max-w-2xl">
            <h2 className="ui-max-w-lg ui-mb-5 md:ui-mb-8 ui-font-sans ui-text-2xl ui-font-bold ui-leading-none ui-tracking-tight ui-text-gray-900 sm:ui-text-4xl md:ui-mx-auto">
              <span className="ui-relative ui-inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="ui-absolute ui-top-0 ui-left-0 ui-z-0 ui-w-32 -ui-mt-8 -ui-ml-20 ui-text-gray-400 lg:ui-w-32 lg:-ui-ml-28 lg:-ui-mt-10 ui-block"
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
                <span className="ui-relative">Find</span>
              </span>
              <span className="ui-relative ui-inline ui-px-2">
                {/* <div className="ui-absolute ui-inset-0 ui-transform -ui-skew-x-12 ui-bg-teal-accent-400" /> */}
                <span className="ui-relative ui-text-gray-900 ui-bg-teal-accent-400 ui-px-2 ui-whitespace-nowrap">
                  local vendors
                </span>
              </span>
              near <br></br> you
            </h2>
            <p className="ui-text-base ui-text-gray-700 md:ui-text-lg">
              Discover amazing food trucks or local vendors you might be missing
              out on. We help you find them!
            </p>
          </div>
          <div className="md:ui-flex md:ui-justify-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="ui-flex ui-items-center ui-justify-center ui-bg-white ui-py-4 ui-px-8 sm:ui-px-12 lg:ui-px-16 ui-shadow ui-rounded-full ui-w-auto"
            >
              <div className="ui-w-full">
                <label
                  htmlFor="zipcode"
                  className="ui-block ui-mb-1 ui-text-gray-700"
                >
                  Zipcode{" "}
                  <span
                    className={cn(
                      invalidText ? "ui-text-red-accent-400" : "ui-hidden",
                      "ui-italic ui-text-sm",
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
                    "ui-border-red-accent-400 focus:ui-border-red-accent-100 focus:ui-shadow-red-accent-100"
                  } ui-h-12 ui-px-4 ui-w-full ui-mb-2 ui-text-slate-900 ui-transition ui-duration-200 ui-bg-white ui-border ui-border-gray-300 ui-rounded ui-shadow-sm ui-appearance-none focus:ui-border-deep-purple-accent-400 focus:ui-outline-none focus:ui-shadow-outline`}
                  name="zipcode"
                />
              </div>
              {/* <div className="ui-w-full ui-ml-2">
                <label
                  htmlFor="distance"
                  className="ui-inline-block ui-mb-1 ui-text-gray-700"
                >
                  <span className="ui-hidden lg:ui-inline-block">Distance</span> Less
                  Than
                </label>
                <select
                  name="distance"
                  className="ui-w-full ui-h-12 ui-px-4 ui-mb-2 ui-transition ui-duration-200 ui-bg-white ui-border ui-border-gray-300 ui-rounded ui-shadow-sm ui-appearance-none focus:ui-border-deep-purple-accent-400 focus:ui-outline-none focus:ui-shadow-outline"
                >
                  <option value={5}>5 miles</option>
                  <option value={5}>10 miles</option>
                  <option value={5}>15 miles</option>
                  <option value={5}>20 miles</option>
                </select>
              </div> */}
              <div className="ui-ml-4 ui-mt-5 ">
                <button
                  type="submit"
                  onClick={onFIndNowClick}
                  className="ui-inline-flex ui-whitespace-nowrap ui-items-center ui-justify-center ui-w-full ui-h-12 ui-px-4 md:ui-px-6 ui-font-medium ui-tracking-wide ui-text-white ui-transition ui-duration-200 ui-rounded ui-shadow-md ui-bg-deep-purple-accent-400 hover:ui-bg-deep-purple-accent-700 focus:ui-shadow-outline focus:ui-outline-none"
                >
                  {/* <span>Find Now</span> */}
                  <span className="ui-hidden md:ui-block ui-whitespace-nowrap">
                    Find Now
                  </span>
                  <span className="md:ui-hidden ui-text-white">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                  </span>
                </button>
                {/* <a
                  href="/"
                  aria-label=""
                  className="ui-items-center ui-pl-4 ui-whitespace-nowrap ui-font-semibold ui-hidden xl:ui-inline-flex ui-text-gray-800 ui-transition-colors ui-duration-200 hover:ui-text-deep-purple-accent-700"
                >
                  Learn more
                </a> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="ui-relative ui-px-8 ui-bg-gray-100">
        <div className="ui-absolute ui-inset-0 ui-bg-indigo-50 ui-h-1/2" />
        <div className="ui-relative ui-grid ui-border-b-gray-300 ui-rounded-lg ui-mx-auto ui-overflow-hidden ui-bg-white ui-divide-y ui-shadow sm:ui-divide-y-0 ui-divide-x sm:ui-max-w-screen-sm ui-grid-cols-4 lg:ui-max-w-screen-md">
          <div
            onClick={() => onFilterClick(StoreType.FOOD_TRUCK)}
            className={`${
              filter === StoreType.FOOD_TRUCK
                ? "ui-bg-slate-100 ui-border-b-deep-purple-accent-400"
                : "ui-border-b-slate-100"
            }
              "ui-inline-block ui-p-3 ui-pb-2 !ui-border-b-4 ui-text-center ui-cursor-pointer hover:ui-bg-slate-100"
            `}
          >
            <div className="ui-flex ui-items-center ui-justify-center ui-w-10 ui-h-10 md:ui-w-14 md:ui-h-14 ui-mx-auto ui-mb-2 ui-rounded-full ui-bg-indigo-50">
              <div className="ui-p-3">
                <FontAwesomeIcon
                  className="ui-text-deep-purple-accent-700 md:ui-text-2xl"
                  icon={faTruck}
                />
              </div>
            </div>
            <div className="ui-tracking-wide ui-text-gray-800 ui-text-[11px] sm:ui-text-sm ui-whitespace-normal md:ui-whitespace-nowrap">
              Food <div className="sm:ui-inline-block">Trucks</div>
            </div>
          </div>
          <div
            onClick={() => onFilterClick(StoreType.SHOP)}
            className={`${
              filter === StoreType.SHOP
                ? "ui-bg-slate-100 ui-border-b-deep-purple-accent-400"
                : "ui-border-b-slate-100"
            }
              "ui-inline-block ui-p-3 ui-pb-2 !ui-border-b-4 ui-text-center ui-cursor-pointer hover:ui-bg-slate-100"
            `}
          >
            <div className="ui-flex ui-items-center ui-justify-center ui-w-10 ui-h-10 md:ui-w-14 md:ui-h-14 ui-mx-auto ui-mb-2 ui-rounded-full ui-bg-indigo-50">
              <div className="ui-p-4">
                <FontAwesomeIcon
                  className="ui-text-deep-purple-accent-700 md:ui-text-2xl"
                  icon={faStore}
                />
              </div>
            </div>
            <div className="ui-tracking-wide ui-text-gray-800 ui-text-[11px] sm:ui-text-sm ui-whitespace-normal md:ui-whitespace-nowrap">
              Local <div className="sm:ui-inline-block">Market</div>
            </div>
          </div>
          <div
            onClick={() => onFilterClick(StoreType.HOME_VENDOR)}
            className={`${
              filter === StoreType.HOME_VENDOR
                ? "ui-bg-slate-100 ui-border-b-deep-purple-accent-400"
                : "ui-border-b-slate-100"
            }
              "ui-inline-block ui-p-3 ui-pb-2 !ui-border-b-4 ui-text-center ui-cursor-pointer hover:ui-bg-slate-100"
            `}
          >
            <div className="ui-flex ui-items-center ui-justify-center ui-w-10 ui-h-10 md:ui-w-14 md:ui-h-14 ui-mx-auto ui-mb-2 ui-rounded-full ui-bg-indigo-50">
              <div className="ui-p-4">
                <FontAwesomeIcon
                  className="ui-text-deep-purple-accent-700 md:ui-text-2xl"
                  icon={faHouseUser}
                />
              </div>
            </div>
            <div className="ui-tracking-wide ui-text-gray-800 ui-text-[11px] sm:ui-text-sm ui-whitespace-normal md:ui-whitespace-nowrap">
              Home <div className="sm:ui-inline-block">Vendors</div>
            </div>
          </div>
          <div
            onClick={() => onFilterClick(StoreType.OTHER)}
            className={`${
              filter === StoreType.OTHER
                ? "ui-bg-slate-100 ui-border-b-deep-purple-accent-400"
                : "ui-border-b-slate-100"
            }
              "ui-inline-block ui-p-3 ui-pb-2 !ui-border-b-4 ui-text-center ui-cursor-pointer hover:ui-bg-slate-100"
            `}
          >
            <div className="ui-flex ui-items-center ui-justify-center ui-w-10 ui-h-10 md:ui-w-14 md:ui-h-14 ui-mx-auto ui-mb-2 ui-rounded-full ui-bg-indigo-50">
              <div className="ui-p-3">
                <FontAwesomeIcon
                  className="ui-text-deep-purple-accent-700 md:ui-text-2xl"
                  icon={faEllipsis}
                />
              </div>
            </div>
            <div className="ui-tracking-wide ui-text-gray-800 ui-text-[11px] sm:ui-text-sm ui-whitespace-normal md:ui-whitespace-nowrap">
              All <div className="sm:ui-inline-block">Others</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
