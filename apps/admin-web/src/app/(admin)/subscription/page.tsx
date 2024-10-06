"use client";

import { CONFIG } from "@/utils/config";
import { Store } from "@repo/ui/types";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";

export default function SubscriptionsPage() {
  const { data: stores, isLoading } = useSWR<Store[]>(
    `${CONFIG.API_BASE_PATH}/vendors`,
  );

  return (
    <div className="w-full rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between items-center p-2 mb-3 bg-slate-200 dark:bg-boxdark-0 rounded mt-4 bg-gradient-to-r from-indigo-100 via-pink-50 to-indigo-100 dark:from-boxdark-0 dark:to-boxdark-0">
        <div className="flex items-center gap-2 rounded">
          <button className="border-0 text-slate-700 px-3 py-2 rounded text-sm bg-white font-semibold">
            All
          </button>
        </div>
      </div>

      <div className="bg-white border border-text-300 w-full p-6 text-slate-700">
        <h4 className="text-2xl font-semibold">Mailing List Subscriptions</h4>
        <div className="text-sm pt-2 text-slate-500">
          List of all the emails who have subscribed for updates
        </div>
        <div className="pt-3">
          {isLoading || !stores ? (
            <FontAwesomeIcon icon={faCircleNotch} spin />
          ) : (
            <table className="w-full border border-slate-200">
              <thead className="text-left">
                <tr>
                  <th className="px-6 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store, index) => (
                  <tr className="border-t border-t-slate-200" key={index}>
                    <td className="px-6 py-3">{store.email}</td>
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
