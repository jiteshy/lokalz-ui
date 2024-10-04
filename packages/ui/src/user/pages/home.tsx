"use client";

import useSWR from "swr";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Hero, Stores } from "@repo/ui/user/components";
import { USER_APIS } from "@repo/ui/config";
import { StoreType, Store } from "@repo/ui/types";

const zipCodeParam = "zipCode";
const storeTypeParam = "storeType";

export const HomePage = () => {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
};

const HomeContent = () => {
  const [filteredData, setFilteredData] = useState<Store[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const storeType = searchParams.get(storeTypeParam);

  const { data: ipAddress, isLoading: isIpAddressLoading } = useSWR(
    !searchParams.has(zipCodeParam)
      ? `${USER_APIS.THIRD_PARTY.FETCH_IP}`
      : null,
  );
  const { data: location, isLoading: isLocationLoading } = useSWR(
    ipAddress
      ? `${USER_APIS.THIRD_PARTY.FETCH_LOCATION_FROM_IP}/${ipAddress.ip}/json/`
      : null,
  );

  const zipCode = searchParams.get(zipCodeParam) || location?.postal;
  const { data: storesList, isLoading: isStoresDataLoading } = useSWR(
    zipCode ? `${USER_APIS.STORE.STORES_LIST}/${zipCode}` : null,
  );

  const addQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const removeQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams],
  );

  const updateZipCode = (zipCode: string) => {
    const queryString = addQueryString(zipCodeParam, zipCode);
    router.push(pathname + "?" + queryString);
  };

  const updateStoreType = (updatedStoreType: StoreType | undefined) => {
    if (storeType === updatedStoreType?.toString()) {
      updatedStoreType = undefined;
    }

    let queryString;
    if (updatedStoreType) {
      queryString = addQueryString(storeTypeParam, updatedStoreType);
    } else {
      queryString = removeQueryString(storeTypeParam);
    }

    router.push(pathname + (queryString ? "?" + queryString : ""));
  };

  useEffect(() => {
    if (!storeType) {
      setFilteredData(storesList);
    } else {
      const filteredData = storesList?.filter(
        (store: Store) => store.type === storeType,
      );
      setFilteredData(filteredData);
    }
  }, [storesList, storeType]);

  return (
    <div className="ui-bg-gray-100">
      <Hero
        updateZipCode={updateZipCode}
        filter={storeType as StoreType}
        updateFilter={updateStoreType}
      />
      <Stores
        storesList={filteredData}
        isStoresDataLoading={
          isIpAddressLoading || isLocationLoading || isStoresDataLoading // FIX: Causes flicker on spinner
        }
      />
    </div>
  );
};
