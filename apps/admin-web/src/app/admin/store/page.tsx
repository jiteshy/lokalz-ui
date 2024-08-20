import { StoreType } from "@repo/ui/types";
import {
  faCircleLeft,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function NewStorePage() {
  return (
    <div>
      <div className="flex justify-end items-center p-2 bg-slate-200 mb-3">
        <Link
          href={"/admin"}
          className="px-3 py-2 text-sm bg-slate-700 text-slate-200 rounded hover:bg-slate-900"
        >
          <FontAwesomeIcon icon={faCircleLeft} />
          <span className="pl-2">Go Back</span>
        </Link>
      </div>

      <div className="bg-white border border-text-300 w-full p-6 text-slate-700">
        <h4 className="text-2xl font-semibold">Add Store</h4>
        <div className="text-sm pt-2 text-slate-500">
          Please provide details for the new Store
        </div>
        <hr className="mt-6 border-slate-300" />
        <div className="pt-6">
          <form>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="storeName"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Store Name*
              </label>
              <input
                placeholder="Store Name"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
                name="storeName"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="storeOwnerName"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Store Owner Name*
              </label>
              <input
                placeholder="Store Owner Name"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
                name="storeOwnerName"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="storeEmail"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Contact Email*
              </label>
              <input
                placeholder="Contact Email"
                required
                type="email"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
                name="storeEmail"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="storePhone"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Contact Phone
              </label>
              <input
                placeholder="Contact Phone"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
                name="storePhone"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="storeType"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Store Type*
              </label>
              <select
                required
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
                name="storeType"
              >
                <option value=""></option>
                <option value={StoreType.FOOD_TRUCK}>Food Truck</option>
                <option value={StoreType.SHOP}>Market Shop</option>
                <option value={StoreType.HOME_VENDOR}>Home Business</option>
                <option value={StoreType.OTHER}>Other</option>
              </select>
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="storeStreet"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Street*
              </label>
              <input
                placeholder="Street"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
                name="storeStreet"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="storeCity"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                City*
              </label>
              <input
                placeholder="City"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
                name="storeCity"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="storeState"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                State*
              </label>
              <input
                placeholder="State"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
                name="storeState"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="storezipCode"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Zip Code*
              </label>
              <input
                placeholder="Zip Code"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
                name="storezipCode"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="storeTags"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Tags*
              </label>
              <input
                placeholder="Tags (Separate multiple by comma)"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
                name="storeTags"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="storeDetails"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Store Details{" "}
                <span className="text-sm text-gray-600">(Max 1000 chars)</span>*
              </label>
              <textarea
                placeholder="Store details"
                rows={5}
                required
                className="flex-grow w-full px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
                name="storeDetails"
              ></textarea>
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="storeDetails"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Store Image*
              </label>
              <input
                required
                type="file"
                className="block mb-2"
                name="storeImg"
              />
            </div>
            <div className="mt-8 mb-2 text-right sm:mb-4">
              <button
                type="submit"
                className="px-3 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-900"
              >
                <FontAwesomeIcon icon={faCloudArrowUp} />
                <span className="pl-2">Save Store</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
