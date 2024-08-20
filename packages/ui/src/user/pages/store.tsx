"use client";

import useSWR from "swr";
import {
  StoreDetailsCard,
  StoreDetailsCardShimmer,
  StoreServices,
  StoreServicesShimmer,
} from "@repo/ui/user/components";
import { CONFIG } from "@repo/ui/config";
import { Store, Services } from "@repo/ui/types";

export const StorePage = ({ store }: { store: string }) => {
  const { data: storeData, isLoading: isStoreDataLoading } = useSWR<Store>(
    `${CONFIG.API_BASE_PATH}/vendors/30014`,
  );

  const { data: servicesData, isLoading: isServicesLoading } = useSWR<Services>(
    `${CONFIG.API_BASE_PATH2}`,
  );

  return (
    <>
      {(isStoreDataLoading || !storeData) && <StoreDetailsCardShimmer />}
      {storeData && <StoreDetailsCard storeData={storeData} />}
      {(isServicesLoading || !servicesData) && <StoreServicesShimmer />}
      {servicesData && <StoreServices services={servicesData} />}
    </>
  );
};
