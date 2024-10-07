"use client";

import { Store, StoreStatus, StoreType } from "@repo/ui/types";
import Link from "next/link";
import useSWR from "swr";
import { ADMIN_APIS } from "@repo/ui/config";
import { DataTable } from "@/components/ui/data-table";
import {
  getStoreColumns,
  visibleColumns,
} from "@/components/store-list/store-columns";
import Loading from "@/app/loading";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAxios } from "@/hooks/use-axios";
import { ColumnDef } from "@tanstack/react-table";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { StoresStatistics, StoreStats } from "@/components/store-statistics";

const generateInitialStats = (): StoreStats => ({
  new: 0,
  active: 0,
  total: 0,
  typesCount: {
    [StoreType.FOOD_TRUCK]: 0,
    [StoreType.SHOP]: 0,
    [StoreType.HOME_VENDOR]: 0,
    [StoreType.OTHER]: 0,
  },
});

export default function StoresListPage() {
  const { toast } = useToast();
  const axios = useAxios();
  const router = useRouter();
  const [storeStats, setStoreStats] = useState<StoreStats>(
    generateInitialStats(),
  );
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [currentFilter, setCurrentFilter] = useState<StoreStatus | undefined>();
  const {
    data: stores,
    isLoading,
    mutate,
  } = useSWR<Store[]>(`${ADMIN_APIS.STORE.STORES_LIST}?page=0`);

  useEffect(() => {
    if (stores && stores.length) {
      setFilteredStores(stores);
      handleFilterClick(currentFilter);

      setStoreStats(() => {
        const stats = generateInitialStats();
        stores.forEach((store) => {
          stats.total++;

          switch (store.status) {
            case StoreStatus.ONHOLD:
              stats.new++;
              break;
            case StoreStatus.ACTIVE:
              stats.active++;
              break;
            default:
              break;
          }

          switch (store.type) {
            case StoreType.FOOD_TRUCK:
              stats.typesCount.FOOD_TRUCK++;
              break;
            case StoreType.SHOP:
              stats.typesCount.SHOP++;
              break;
            case StoreType.HOME_VENDOR:
              stats.typesCount.HOME_VENDOR++;
              break;
            case StoreType.OTHER:
              stats.typesCount.OTHER++;
              break;
            default:
              break;
          }
        });
        return stats;
      });
    }
  }, [stores]);

  const handleFilterClick = (status?: StoreStatus) => {
    if (stores && stores.length) {
      if (status) {
        setFilteredStores(
          stores.filter((store: Store) => store.status === status),
        );
      } else {
        setFilteredStores(stores);
      }
    }
    setCurrentFilter(status);
  };

  const onEdit = useCallback(
    (
      storeId: string,
      storeName: string,
      tab?: string,
      status?: StoreStatus,
    ) => {
      const path =
        tab && storeName && status
          ? `/store/${storeId}?name=${storeName}&tab=${tab}&status=${status}`
          : `/store/${storeId}`;
      router.push(path);
    },
    [],
  );

  const onMarkInactive = useCallback((storeId: string) => {
    return axios.put(`/store/${storeId}/status/${StoreStatus.INACTIVE}`).then(
      async () => {
        await mutate();
        toast({
          title: "Success!",
          duration: 5000,
          description: "Store status is changed to in-active successfully.",
        });
      },
      () => {
        toast({
          variant: "destructive",
          duration: 5000,
          title: "Failure!",
          description: "Store status change to in-active failed.",
        });
      },
    );
  }, []);
  const onDelete = useCallback((storeId: string) => {
    return axios.delete(`/store/${storeId}?execute=true`).then(
      async () => {
        await mutate();
        toast({
          title: "Success!",
          duration: 5000,
          description: "Store is deleted successfully.",
        });
      },
      () => {
        toast({
          variant: "destructive",
          duration: 5000,
          title: "Failure!",
          description: "Store delete failed.",
        });
      },
    );
  }, []);

  const columns: ColumnDef<Store>[] = useMemo(
    () => getStoreColumns({ onEdit, onMarkInactive, onDelete }),
    [],
  );

  return isLoading ? (
    <Loading />
  ) : (
    <div className="md:flex md:gap-6">
      <div className="relative shadow-default md:fixed lg:left-67.5 md:top-18 lg:top-0 z-9999 md:h-screen w-full md:w-80 md:overflow-y-auto md:no-scrollbar bg-slate-200 dark:bg-boxdark-0">
        <StoresStatistics stats={storeStats} />
      </div>
      <div className="w-full md:ml-80 rounded-sm border border-stroke bg-white p-4 pt-6 md:p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-2xl font-semibold">All Stores</h4>
            <div className="text-sm pt-2 text-slate-500">
              List of all the Stores
            </div>
          </div>
          <Link href={"/store/new"}>
            <Button>
              <PlusIcon className="w-5 h-5" />
              <span className="pl-2">Create Store</span>
            </Button>
          </Link>
        </div>
        <div className="flex justify-between items-center p-2 bg-slate-200 dark:bg-boxdark-0 rounded mt-4 bg-gradient-to-r from-indigo-100 via-pink-50 to-indigo-100 dark:from-boxdark-0 dark:to-boxdark-0">
          <div className="flex items-center gap-2 rounded">
            <button
              onClick={() => handleFilterClick()}
              className={`border-0 text-slate-900 px-3 py-2 rounded text-sm ${!currentFilter ? "bg-white font-semibold text-slate-900 shadow dark:bg-boxdark dark:text-slate-200" : "hover:text-slate-900 dark:text-slate-300"}`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterClick(StoreStatus.ACTIVE)}
              className={`border-0 text-slate-900 px-3 py-2 rounded text-sm ${currentFilter === StoreStatus.ACTIVE ? "bg-white font-semibold text-slate-900 shadow dark:bg-boxdark dark:text-slate-200" : "hover:text-slate-900 dark:text-slate-300"}`}
            >
              Active
            </button>
            <button
              onClick={() => handleFilterClick(StoreStatus.ONHOLD)}
              className={`border-0 text-slate-900 px-3 py-2 rounded text-sm ${currentFilter === StoreStatus.ONHOLD ? "bg-white font-semibold text-slate-900 shadow dark:bg-boxdark dark:text-slate-200" : "hover:text-slate-900 dark:text-slate-300"}`}
            >
              On-Hold
            </button>
            <button
              onClick={() => handleFilterClick(StoreStatus.INACTIVE)}
              className={`border-0 text-slate-900 px-3 py-2 rounded text-sm ${currentFilter === StoreStatus.INACTIVE ? "bg-white font-semibold text-slate-900 shadow dark:bg-boxdark dark:text-slate-200" : "hover:text-slate-900 dark:text-slate-300"}`}
            >
              Inactive
            </button>
          </div>
          {/* <Link href={"/store/new"}>
            <Button>
              <PlusIcon className="w-5 h-5" />
              <span className="pl-2">Create Store</span>
            </Button>
          </Link> */}
        </div>

        <div className="pt-3">
          <DataTable
            columns={columns}
            data={filteredStores}
            visibleColumns={visibleColumns}
          />
        </div>
      </div>
    </div>
  );
}
