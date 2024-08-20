import { STORE_TYPES } from "@/utils/constants";
import { Store } from "@repo/ui/types";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const StoreDetailsCard = ({ storeData }: { storeData: Store }) => {
  return (
    <div className="px-4 pb-16 pt-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 bg-white">
      <div className="flex flex-col max-w-screen-lg overflow-hidden border rounded shadow lg:flex-row sm:mx-auto">
        <div className="relative lg:w-1/2">
          <Image
            src={storeData.imgSrc}
            alt=""
            width={500}
            height={200}
            className="object-cover w-full lg:absolute h-80 lg:h-full"
          />
          <svg
            className="absolute top-0 -right-1 hidden h-full text-white lg:inline-block"
            viewBox="0 0 20 104"
            fill="currentColor"
          >
            <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
          </svg>
        </div>
        <div className="flex flex-col justify-center p-6 bg-white lg:w-1/2">
          <div className="flex justify-between">
            <div>
              <div className="px-4 py-2 mb-4 text-xs size-fit font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                {STORE_TYPES[storeData.type]}
              </div>
              <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
                {storeData.name}
              </h5>
            </div>
            <div className="p-3 w-12 h-12 border border-slate-400 rounded-md bg-indigo-50 text-deep-purple-accent-400">
              {storeData.rating}
            </div>
          </div>
          <p className="mb-5 text-gray-800">{storeData.description}</p>
          <div className="flex gap-3">
            {storeData.tags.map((tag, index) => (
              <div key={index}>
                <p className="inline-block px-3 py-2 mb-4 text-xs font-semibold tracking-wider text-teal-900 border border-slate-300 uppercase rounded-full bg-slate-200">
                  {tag}
                </p>
              </div>
            ))}
          </div>
          <hr className="border-b border-b-gray-300" />
          <div className="pt-3 text-sm text-slate-600 text-right">
            <div className="pt-2">
              <span className="pr-3">{storeData.phone}</span>
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="pt-2">
              <span className="pr-3">{storeData.email}</span>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
