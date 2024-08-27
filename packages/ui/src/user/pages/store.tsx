"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import {
  StoreDetailsCard,
  StoreDetailsCardShimmer,
  StoreMenu,
  StoreMenuShimmer,
  Schedule,
  StoreScheduleShimmer,
} from "@repo/ui/user/components";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Store, Menu, StoreSchedule } from "@repo/ui/types";
import { APIS } from "@repo/ui/config";

export const StorePage = ({ store }: { store: string }) => {
  const router = useRouter();

  const { data: storeData, isLoading: isStoreDataLoading } = useSWR<Store>(
    `${APIS.STORE.STORE_DETAILS}/${store}`,
  );

  const { data: menuData, isLoading: isMenuLoading } = useSWR<Menu>(
    `${APIS.STORE.STORE_DETAILS}/${store}/menu`,
  );

  const { data: scheduleData, isLoading: isScheduleLoading } =
    useSWR<StoreSchedule>(`${APIS.STORE.STORE_DETAILS}/${store}/schedule`);

  return (
    <div className="px-8 pb-0 pt-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl bg-white">
      <div className="max-w-screen-lg sm:mx-auto">
        <button onClick={() => router.back()}>
          <span className="text-deep-purple-accent-400 pb-4 inline-block">
            <FontAwesomeIcon icon={faArrowLeftLong} /> Back to vendors
          </span>
        </button>
        {(isStoreDataLoading || !storeData) && <StoreDetailsCardShimmer />}
        {storeData && <StoreDetailsCard storeData={storeData} />}
        <div className="my-16 md:my-20 flex flex-col md:flex-row gap-14">
          <div className="w-full md:w-6/12 lg:w-4/12">
            {(isScheduleLoading || !scheduleData) && <StoreScheduleShimmer />}
            {scheduleData && <Schedule storeSchedule={scheduleData} />}
          </div>
          <div className="w-full mt-5 md:mt-0 md:w-6/12 lg:w-8/12">
            {(isMenuLoading || !menuData) && <StoreMenuShimmer />}
            {menuData && <StoreMenu menuData={menuData} />}
          </div>
        </div>
      </div>
    </div>
  );
};
