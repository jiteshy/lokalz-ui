import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { StoreCard } from "./store-card";
import { Store } from "@repo/ui/types";
import { StoreCardShimmer } from "./store-card-shimmer";

type StoresInput = {
  storesList: Store[];
  isStoresDataLoading: boolean;
};

export const Stores = ({ storesList, isStoresDataLoading }: StoresInput) => {
  return (
    <div className="bg-gray-100 pt-0 md:pt-8 pb-5 md:pb-16">
      {isStoresDataLoading && (
        <div className="p-5 lg:w-11/12 xl:w-3/4 mx-auto px-6 md:px-10 lg:px-0">
          <h4 className="text-xl text-slate-800 mb-9 pb-3 border-b border-b-gray-300">
            <FontAwesomeIcon icon={faCircleNotch} spin />
            <span className="pl-3">Finding local vendors..</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {Array.from({ length: 5 }, (_, index) => (
              <StoreCardShimmer key={index} />
            ))}
          </div>
        </div>
      )}
      {storesList?.length === 0 && (
        <div className="px-6 mt-20 mb-40 text-center col-span-4">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-7xl text-deep-purple-accent-400"
          />
          <h4 className="text-2xl text-slate-800 mt-3 mb-6">
            No Results Found
          </h4>
          <p className="pt-3 text-slate-800">
            Uh-oh! Looks like we haven&apos;t onboarded the lokal gems in this
            area yet.
          </p>
          <p className="pt-3 text-slate-800">Try a different zip code!</p>
        </div>
      )}
      {storesList?.length > 0 && (
        <div className="p-5 lg:w-11/12 xl:w-3/4 mx-auto px-6 md:px-10 lg:px-0">
          <h4 className="text-xl text-slate-800 mb-5 pb-3 border-b border-b-gray-300">
            Showing results in&nbsp;
            <span className="text-deep-purple-accent-400 font-semibold">
              {storesList[0].address.zipCode}
            </span>
          </h4>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {storesList.map((store: Store) => (
              <Link key={store.id} href={`/store/${store.id}`}>
                <StoreCard details={store} />
              </Link>
            ))}
          </div>
          <div className="md:hidden pt-10 flex justify-center">
            <div className="px-5 py-1 text-xs bg-indigo-50 text-slate-800 rounded-full border border-indigo-100 w-fit">That's all we've got!</div>
          </div>
        </div>
      )}
    </div>
  );
};
