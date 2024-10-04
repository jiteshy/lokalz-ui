import { STORE_TYPES } from "@repo/ui/constants";
import { Store } from "@repo/ui/types";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

export const StoreCard = (props: { details: Store }) => {
  const { name, imageUrl, tags, rating, type } = props.details;

  return (
    <div className="ui-relative ui-transition-shadow ui-duration-200 ui-bg-white ui-shadow ui-group hover:ui-shadow-lg ui-rounded-lg">
      <div className="ui-absolute ui-left-0 ui-top-0 ui-bg-teal-accent-400 ui-px-3 ui-py-1 ui-rounded-tl-lg ui-rounded-br-lg ui-text-sm">
        {STORE_TYPES[type]}
      </div>
      <Image
        src={imageUrl}
        alt="Store image"
        className="ui-w-full ui-rounded-t-lg"
        width={200}
        height={200}
      />
      <div className="ui-flex ui-justify-between ui-items-center ui-pr-3">
        <div className="ui-p-2 ui-pb-4">
          <div className="ui-text-base ui-px-2 ui-pt-2">
            <div className="ui-font-semibold ui-text-slate-900">{name}</div>
          </div>
          <div className="ui-px-2">
            <div className="ui-text-sm ui-text-slate-600">
              <div>{tags?.join(", ")}</div>
            </div>
          </div>
        </div>
        {Number(rating) > 0 ? (
          <div className="ui-px-2 ui-py-1 ui-border ui-border-gray-300 ui-rounded-md ui-text-deep-purple-accent-400">
            {rating}
          </div>
        ) : (
          <div className="ui-text-sm ui-flex ui-items-center ui-gap-1 ui-text-deep-purple-accent-400">
            <FontAwesomeIcon icon={faBolt} />
            New
          </div>
        )}
      </div>
    </div>
  );
};
