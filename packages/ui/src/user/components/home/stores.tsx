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
    <div className="ui-pt-0 md:ui-pt-8 ui-pb-5 md:ui-pb-16">
      {isStoresDataLoading && (
        <div className="ui-p-5 lg:ui-w-11/12 xl:ui-w-3/4 ui-mx-auto ui-px-8 md:ui-px-10 lg:ui-px-0">
          <h4 className="ui-text-xl ui-text-slate-800 ui-mb-9 ui-pb-3 ui-border-b ui-border-b-gray-300">
            <FontAwesomeIcon icon={faCircleNotch} spin />
            <span className="ui-pl-3">Finding local vendors..</span>
          </h4>
          <div className="ui-grid ui-grid-cols-1 sm:ui-grid-cols-2 lg:ui-grid-cols-3 xl:ui-grid-cols-4 ui-gap-10">
            {Array.from({ length: 5 }, (_, index) => (
              <StoreCardShimmer key={index} />
            ))}
          </div>
        </div>
      )}
      {storesList?.length === 0 && (
        <div className="ui-px-8 ui-mt-20 ui-mb-40 ui-text-center ui-col-span-4">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="ui-text-7xl ui-text-deep-purple-accent-400"
          />
          <h4 className="ui-text-2xl ui-text-slate-800 ui-mt-3 ui-mb-6">
            No Results Found
          </h4>
          <p className="ui-pt-3 ui-text-slate-800">
            Uh-oh! Looks like we haven&apos;t onboarded the lokal gems in this
            area yet.
          </p>
          <p className="ui-pt-3 ui-text-slate-800">Try a different zip code!</p>
        </div>
      )}
      {storesList?.length > 0 && (
        <div className="ui-p-5 lg:ui-w-11/12 xl:ui-w-3/4 ui-mx-auto ui-px-8 md:ui-px-10 lg:ui-px-0">
          <h4 className="ui-text-xl ui-text-slate-800 ui-mb-5 ui-pb-3 ui-border-b ui-border-b-gray-300">
            Showing vendors in&nbsp;
            <span className="ui-text-deep-purple-accent-400 ui-font-semibold">
              {storesList[0].address.zipCode}
            </span>
          </h4>
          <div className="ui-relative ui-grid ui-grid-cols-1 sm:ui-grid-cols-2 lg:ui-grid-cols-3 xl:ui-grid-cols-4 ui-gap-5">
            {storesList.map((store: Store) => (
              <Link key={store.id} href={`/store?id=${store.id}`}>
                <StoreCard details={store} />
              </Link>
            ))}
          </div>
          <div className="md:ui-hidden ui-pt-10 ui-flex ui-justify-center">
            <div className="ui-px-5 ui-py-1 ui-text-xs ui-bg-gray-200 ui-text-slate-800 ui-rounded-full ui-border ui-border-gray-300 ui-w-fit">
              That's all we've got!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
