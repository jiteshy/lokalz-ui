"use client";

import { Store } from "@repo/ui/types";
import { faCircleNotch, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useSWR from "swr";
import { ADMIN_APIS } from "@repo/ui/config";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function StoresListPage() {
  const { data: stores, isLoading } = useSWR<Store[]>(
    `${ADMIN_APIS.STORE.STORES_LIST}?page=0`,
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
            <button className="border-0 text-slate-700 px-3 py-2 rounded text-sm bg-white font-semibold">
              All
            </button>
            <button className="border-0 text-slate-500 px-3 py-2 rounded text-sm hover:text-slate-900">
              Active
            </button>
            <button className="border-0 text-slate-500 px-3 py-2 rounded text-sm hover:text-slate-900">
              On-Hold
            </button>
            <button className="border-0 text-slate-500 px-3 py-2 rounded text-sm hover:text-slate-900">
              Inactive
            </button>
          </div>
          <Link
            href={"/store/new"}
            className="px-3 py-2 text-sm bg-slate-700 text-slate-200 rounded hover:bg-slate-900"
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            <span className="pl-2">Add Store</span>
          </Link>
        </div>

        <div className="pt-3">
          {isLoading || !stores ? (
            <FontAwesomeIcon icon={faCircleNotch} spin />
          ) : (
            <DataTable columns={columns} data={stores} />
          )}
        </div>
      </div>
    </div>
  );
}
