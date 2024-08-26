"use client";

import { CONFIG } from "@/utils/config";
import { STORE_TYPES } from "@/utils/constants";
import { Store } from "@repo/ui/types";
import {
  faCircleNotch,
  faEdit,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useSWR from "swr";

export default function AdminDashboardPage() {
  const { data: stores, isLoading } = useSWR<Store[]>(
    `${CONFIG.API_BASE_PATH}/vendors`,
  );

  return (
    <div>
      <div className="flex justify-between items-center p-2 bg-slate-200 mb-3">
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
          href={"/store"}
          className="px-3 py-2 text-sm bg-slate-700 text-slate-200 rounded hover:bg-slate-900"
        >
          <FontAwesomeIcon icon={faPlusCircle} />
          <span className="pl-2">Add Store</span>
        </Link>
      </div>

      <div className="bg-white border border-text-300 w-full p-6 text-slate-700">
        <h4 className="text-2xl font-semibold">All Stores</h4>
        <div className="text-sm pt-2 text-slate-500">
          List of all the Stores
        </div>
        <div className="pt-3">
          {isLoading || !stores ? (
            <FontAwesomeIcon icon={faCircleNotch} spin />
          ) : (
            <table className="w-full border border-slate-200">
              <thead className="text-left">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Type</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store, index) => (
                  <tr className="border-t border-t-slate-200" key={index}>
                    <td className="px-6 py-3">{store.name}</td>
                    <td className="px-6 py-3">{store.email}</td>
                    <td className="px-6 py-3">{store.phone}</td>
                    <td className="px-6 py-3">{STORE_TYPES[store.type]}</td>
                    <td className="px-6 py-3 flex gap-8 items-center justify-end">
                      <button
                        className="text-slate-500 hover:text-slate-800 hover:bg-slate-200 border border-slate-400 rounded-full px-2 py-1"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="text-slate-500 hover:text-slate-800 hover:bg-slate-200 border border-slate-400 rounded-full px-2 py-1"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
