import { STORE_TYPES } from "@repo/ui/constants";
import { Store } from "@repo/ui/types";
import Image from "next/image";

export const StoreCard = (props: { details: Store }) => {
  const { name, imageUrl, tags, rating, type } = props.details;

  return (
    <div className="relative transition-shadow duration-200 bg-white shadow group hover:shadow-lg rounded-lg">
      <div className="absolute left-0 top-0 bg-teal-accent-400 px-3 py-1 rounded-tl-lg rounded-br-lg text-sm">
        {STORE_TYPES[type]}
      </div>
      <Image
        src={imageUrl}
        alt="Store image"
        className="w-full rounded-t-lg"
        width={200}
        height={200}
      />
      <div className="flex justify-between items-center pr-3">
        <div className="p-2 pb-4">
          <div className="text-base px-2 pt-2">
            <div className="font-semibold text-slate-900">{name}</div>
          </div>
          <div className="px-2">
            <div className="text-sm text-slate-600">
              <div>{tags?.join(", ")}</div>
            </div>
          </div>
        </div>
        {Number(rating) > 0 && (
          <div className="px-2 py-1 border border-gray-300 rounded-md text-deep-purple-accent-400">
            {rating}
          </div>
        )}
      </div>
    </div>
  );
};
