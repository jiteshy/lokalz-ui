"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";
import { Hero } from "@/components/home/hero";
import { Stores } from "@/components/home/stores";
import { APIS } from "@/utils/config";
import { StoreType, Store } from "@repo/ui/types";

export default function HomePage() {
  const [zipCode, setZipCode] = useState<string>();
  const [filter, setFilter] = useState<StoreType>();
  const [filteredData, setFilteredData] = useState<Store[]>([]);

  const { data: ipAddress, isLoading: isIpAddressLoading } = useSWR(
    `${APIS.THIRD_PARTY.FETCH_IP}`,
  );
  const { data: location, isLoading: isLocationLoading } = useSWR(
    ipAddress
      ? `${APIS.THIRD_PARTY.FETCH_LOCATION_FROM_IP}/${ipAddress.ip}/json/`
      : null,
  );

  // TODO: Fix || condition
  const { data: storesList, isLoading: isStoresDataLoading } = useSWR(
    zipCode || location
      ? `${APIS.STORE.STORES_LIST}/${zipCode || location.postal}`
      : null,
  );

  useEffect(() => {
    if (!filter) {
      setFilteredData(storesList);
    } else {
      const filteredData = storesList?.filter(
        (store: Store) => store.type === filter,
      );
      setFilteredData(filteredData);
    }
  }, [storesList, filter]);

  return (
    <>
      <Hero setZipCode={setZipCode} filter={filter} setFilter={setFilter} />
      <Stores
        storesList={filteredData}
        isStoresDataLoading={
          isIpAddressLoading || isLocationLoading || isStoresDataLoading // FIX: Causes flicker on spinner
        }
      />
    </>
  );
}
