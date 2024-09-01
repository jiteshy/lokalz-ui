"use client";

import { Store, StoreType } from "@repo/ui/types";
import {
  faCircleLeft,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useSWR from "swr";
import { ADMIN_APIS } from "@repo/ui/config";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type StoreFormData = {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  tags: string;
  type: string;
};

const createFormData = (store?: Store): StoreFormData =>
  store
    ? {
        name: store.name,
        description: store.description,
        email: store.email,
        phone: store.phone,
        address: {
          street: store.address?.street,
          city: store.address?.city,
          state: store.address?.state,
          zipCode: store.address?.zipCode.toString(),
        },
        tags: store.tags.join(","),
        type: store.type,
      }
    : {
        name: "",
        description: "",
        email: "",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
        tags: "",
        type: "",
      };

const createStoreData = (formData: StoreFormData): Store => ({
  name: formData.name,
  description: formData.description,
  email: formData.email,
  phone: formData.phone,
  address: {
    street: formData.address.street,
    city: formData.address.city,
    state: formData.address.state,
    zipCode: Number(formData.address?.zipCode),
  },
  tags: formData.tags.split(","),
  type: formData.type as StoreType,
  imageUrl: ""
});

export default function StoreCreateUpdatePage() {
  const {data: session} = useSession();
  const { storeId } = useParams<{ storeId: string }>();
  const { data: storeData, isLoading: isStoreDataLoading } = useSWR<Store>(
    storeId !== "new" ? `${ADMIN_APIS.STORE.STORE_DETAILS}/${storeId}` : null
  );

  const [formData, setFormData] = useState<StoreFormData>(createFormData());

  useEffect(() => {
    if (storeData) {
      setFormData(createFormData(storeData));
    }
  }, [storeData]);

  const handleInputChange = (
    event: FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.currentTarget;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddressInputChange = (
    event: FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.currentTarget;

    setFormData((prevFormData) => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [name]: value
      },
    }));

    console.log(formData)
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formData);
    const response = await fetch(ADMIN_APIS.STORE.STORE_DETAILS, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `bearer ${session?.user?.accessToken}`
      },
      body: JSON.stringify(createStoreData(formData)),
    });
    console.log("Store saved successfully!")
  };

  return (
    <div className="bg-white border border-text-300 w-full p-6 text-slate-700">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-2xl font-semibold">Add Store</h4>
          <div className="text-sm text-slate-500">
            Please provide details for the new Store
          </div>
        </div>
        <div>
          <Link
            href={"/store/list"}
            className="px-3 py-2 text-sm bg-slate-700 text-slate-200 rounded hover:bg-slate-900"
          >
            <FontAwesomeIcon icon={faCircleLeft} />
            <span className="pl-2">Go Back</span>
          </Link>
        </div>
      </div>

      <hr className="mt-6 border-slate-200" />
      <div className="pt-6">
        <form onSubmit={handleSubmit}>
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
              name="name"
              onChange={handleInputChange}
              value={formData.name}
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
              name="email"
              onChange={handleInputChange}
              value={formData.email}
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
              name="phone"
              onChange={handleInputChange}
              value={formData.phone}
            />
          </div>
          <div className="mb-1 sm:mb-2">
            <label
              htmlFor="type"
              className="inline-block mb-1 font-medium text-gray-900"
            >
              Store Type*
            </label>
            <select
              required
              className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
              name="type"
              onChange={handleInputChange}
              value={formData.type}
            >
              <option value="">Select</option>
              <option value={StoreType.FOOD_TRUCK}>Food Truck</option>
              <option value={StoreType.SHOP}>Market Shop</option>
              <option value={StoreType.HOME_VENDOR}>Home Business</option>
              <option value={StoreType.OTHER}>Other</option>
            </select>
          </div>
          <div className="mb-1 sm:mb-2">
            <label
              htmlFor="street"
              className="inline-block mb-1 font-medium text-gray-900"
            >
              Street*
            </label>
            <input
              placeholder="Street"
              required
              type="text"
              className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-slate-400 rounded shadow-sm appearance-none focus:border-slate-700"
              name="street"
              onChange={handleAddressInputChange}
              value={formData.address.street}
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
              name="city"
              onChange={handleAddressInputChange}
              value={formData.address.city}
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
              name="state"
              onChange={handleAddressInputChange}
              value={formData.address.state}
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
              name="zipCode"
              onChange={handleAddressInputChange}
              value={formData.address.zipCode}
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
              name="tags"
              onChange={handleInputChange}
              value={formData.tags}
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
              name="description"
              onChange={handleInputChange}
              value={formData.description}
            ></textarea>
          </div>
          {/* <div className="mb-1 sm:mb-2">
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
          </div> */}
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
  );
}
