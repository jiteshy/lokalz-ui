import { STORE_TYPES } from "@repo/ui/constants";
import { Store } from "@repo/ui/types";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const StoreDetailsCard = ({ storeData }: { storeData: Store }) => {
  return (
    <>
      <div className="flex flex-col overflow-hidden border rounded shadow lg:flex-row">
        <div className="relative lg:w-1/2">
          <Image
            src={storeData.imageUrl}
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
              <div className="px-4 pt-2 pb-[6px] mb-4 text-xs size-fit font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                {STORE_TYPES[storeData.type]}
              </div>
              <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
                {storeData.name}
              </h5>
            </div>
            <div className="text-center pt-[7px] w-10 h-10 border border-slate-400 rounded-md text-deep-purple-accent-400">
              {storeData.rating}
            </div>
          </div>
          <p className="mb-5 text-gray-800">{storeData.description}</p>
          <div className="flex gap-3">
            {storeData.tags.map((tag, index) => (
              <div key={index}>
                <p className="inline-block px-3 py-2 mb-4 text-xs font-semibold tracking-wider text-deep-purple-accent-400 border border-slate-400 uppercase rounded-full">
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
    </>
  );
};
