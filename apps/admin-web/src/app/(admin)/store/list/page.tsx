"use client";

import { Store, StoreStatus } from "@repo/ui/types";
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

export default function StoresListPage() {
  const { toast } = useToast();
  const axios = useAxios();
  const router = useRouter();
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [currentFilter, setCurrentFilter] = useState<StoreStatus>();
  const {
    data: stores,
    isLoading,
    mutate,
  } = useSWR<Store[]>(`${ADMIN_APIS.STORE.STORES_LIST}?page=0`);

  useEffect(() => {
    if (stores && stores.length) {
      setFilteredStores(stores);
      handleFilterClick(currentFilter);
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
    (storeId: string, tab?: string, status?: StoreStatus) => {
      const path =
        tab && status
          ? `/store/${storeId}?tab=${tab}&status=${status}`
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

  return (
    <div>
      <div className="bg-white border border-text-300 w-full p-6 text-slate-700">
        <h4 className="text-2xl font-semibold">All Stores</h4>
        <div className="text-sm pt-2 text-slate-500">
          List of all the Stores
        </div>
        <div className="flex justify-between items-center p-2 bg-slate-100 rounded mt-4">
          <div className="flex items-center gap-2 rounded">
            <button
              onClick={() => handleFilterClick()}
              className={`border-0 text-slate-500 px-3 py-2 rounded text-sm ${!currentFilter ? "bg-white font-semibold text-slate-900 shadow" : "hover:text-slate-900"}`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterClick(StoreStatus.ACTIVE)}
              className={`border-0 text-slate-500 px-3 py-2 rounded text-sm ${currentFilter === StoreStatus.ACTIVE ? "bg-white font-semibold text-slate-900 shadow" : "hover:text-slate-900"}`}
            >
              Active
            </button>
            <button
              onClick={() => handleFilterClick(StoreStatus.ONHOLD)}
              className={`border-0 text-slate-500 px-3 py-2 rounded text-sm ${currentFilter === StoreStatus.ONHOLD ? "bg-white font-semibold text-slate-900 shadow" : "hover:text-slate-900"}`}
            >
              On-Hold
            </button>
            <button
              onClick={() => handleFilterClick(StoreStatus.INACTIVE)}
              className={`border-0 text-slate-500 px-3 py-2 rounded text-sm ${currentFilter === StoreStatus.INACTIVE ? "bg-white font-semibold text-slate-900 shadow" : "hover:text-slate-900"}`}
            >
              Inactive
            </button>
          </div>
          <Link href={"/store/new"}>
            <Button>
              <PlusIcon className="w-5 h-5" />
              <span className="pl-2">Add Store</span>
            </Button>
          </Link>
        </div>

        <div className="pt-3">
          {isLoading ? (
            <Loading />
          ) : (
            <DataTable
              columns={columns}
              data={filteredStores}
              visibleColumns={visibleColumns}
            />
          )}
        </div>
      </div>
    </div>
  );
}
