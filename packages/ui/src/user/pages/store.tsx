"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import {
  StoreDetailsCard,
  StoreDetailsCardShimmer,
  StoreMenuDetails,
  StoreMenuShimmer,
  Schedule,
  StoreScheduleShimmer,
} from "@repo/ui/user/components";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Store, StoreMenu, StoreSchedule } from "@repo/ui/types";
import { USER_APIS } from "@repo/ui/config";

export const StorePage = ({
  store,
  isPreview,
}: {
  store: string;
  isPreview?: boolean;
}) => {
  const router = useRouter();

  const { data: storeData, isLoading: isStoreDataLoading } = useSWR<Store>(
    `${USER_APIS.STORE.STORE_DETAILS}/${store}`,
  );

  const { data: menuData, isLoading: isMenuLoading } = useSWR<StoreMenu>(
    `${USER_APIS.STORE.STORE_DETAILS}/${store}/menu`,
  );

  const { data: scheduleData, isLoading: isScheduleLoading } =
    useSWR<StoreSchedule>(
      `${USER_APIS.STORE.STORE_DETAILS}/${store}/schedule/weekly`,
    );

  return (
    <div className="ui-px-8 ui-pb-0 ui-pt-4 ui-mx-auto sm:ui-max-w-xl md:ui-max-w-full lg:ui-max-w-screen-xl ui-bg-white">
      <div className="ui-max-w-screen-lg sm:ui-mx-auto">
        {!isPreview && (
          <button onClick={() => router.back()}>
            <span className="ui-text-deep-purple-accent-400 ui-pb-4 ui-inline-block">
              <FontAwesomeIcon icon={faArrowLeftLong} /> Back to vendors
            </span>
          </button>
        )}
        {(isStoreDataLoading || !storeData) && <StoreDetailsCardShimmer />}
        {storeData && <StoreDetailsCard storeData={storeData} />}
        <div className="ui-my-16 md:ui-my-20 ui-flex ui-flex-col md:ui-flex-row ui-gap-14">
          <div className="ui-w-full md:ui-w-6/12 lg:ui-w-4/12">
            {(isScheduleLoading || !scheduleData) && <StoreScheduleShimmer />}
            {scheduleData && (
              <Schedule storeSchedules={scheduleData.schedules} />
            )}
          </div>
          <div className="ui-w-full ui-mt-5 md:ui-mt-0 md:ui-w-6/12 lg:ui-w-8/12">
            {(isMenuLoading || !menuData) && <StoreMenuShimmer />}
            {menuData && <StoreMenuDetails menuData={menuData} />}
          </div>
        </div>
      </div>
    </div>
  );
};
