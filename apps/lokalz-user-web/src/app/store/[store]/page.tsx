"use client";

import useSWR from "swr";
import { StoreDetailsCard } from "@/components/store/store-details-card";
import { StoreDetailsCardShimmer } from "@/components/store/store-details-card-shimmer";
import { StoreServices } from "@/components/store/store-services";
import { StoreServicesShimmer } from "@/components/store/store-services-shimmer";
import { CONFIG } from "@/utils/config";
import { Store, Services } from "@repo/ui/types";

export default function StorePage({ params }: { params: { store: string } }) {
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
}
