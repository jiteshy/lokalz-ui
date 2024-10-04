import { STORE_TYPES } from "@repo/ui/constants";
import { Store } from "@repo/ui/types";
import { faEnvelope, faPhone, faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const StoreDetailsCard = ({ storeData }: { storeData: Store }) => {
  return (
    <>
      <div className="ui-flex ui-flex-col ui-overflow-hidden ui-border ui-rounded ui-shadow lg:ui-flex-row">
        <div className="ui-relative lg:ui-w-1/2">
          <Image
            src={storeData.imageUrl}
            alt=""
            width={500}
            height={200}
            className="ui-object-cover ui-w-full lg:ui-absolute ui-h-80 lg:ui-h-full"
          />
          <svg
            className="ui-absolute ui-top-0 -ui-right-1 ui-hidden ui-h-full ui-text-white lg:ui-inline-block"
            viewBox="0 0 20 104"
            fill="currentColor"
          >
            <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
          </svg>
        </div>
        <div className="ui-flex ui-flex-col ui-justify-center ui-p-6 ui-bg-white lg:ui-w-1/2">
          <div className="ui-flex ui-justify-between">
            <div className="ui-px-4 ui-pt-2 ui-pb-[6px] ui-text-xs ui-size-fit ui-font-semibold ui-tracking-wider ui-text-teal-900 ui-uppercase ui-rounded-full ui-bg-teal-accent-400">
              {STORE_TYPES[storeData.type]}
            </div>
            {Number(storeData.rating) > 0 ? (
              <div className="ui-px-2 ui-py-1 ui-border ui-border-gray-300 ui-rounded-md ui-text-deep-purple-accent-400">
                {storeData.rating}
              </div>
            ) : (
              <div className="ui-text-sm ui-flex ui-items-center ui-gap-1 ui-text-deep-purple-accent-400">
                <FontAwesomeIcon icon={faBolt} />
                New
              </div>
            )}
          </div>
          <h5 className="ui-my-3 ui-text-3xl ui-font-extrabold ui-leading-none sm:ui-text-4xl">
            {storeData.name}
          </h5>
          <p className="ui-mb-5 ui-text-gray-800">{storeData.description}</p>
          <div className="ui-flex ui-gap-3">
            {storeData.tags.map((tag, index) => (
              <div key={index}>
                <p className="ui-inline-block ui-px-3 ui-py-2 ui-mb-4 ui-text-xs ui-font-semibold ui-tracking-wider ui-text-deep-purple-accent-400 ui-border ui-border-slate-400 ui-uppercase ui-rounded-full">
                  {tag}
                </p>
              </div>
            ))}
          </div>
          <hr className="ui-border-b ui-border-b-gray-300" />
          <div className="ui-pt-3 ui-text-sm ui-text-slate-600 ui-text-right">
            <div className="ui-pt-2">
              <a
                href={`tel:${storeData.phone}`}
                className="hover:ui-underline ui-text-deep-purple-accent-400"
              >
                <span className="ui-pr-3">{storeData.phone}</span>
                <FontAwesomeIcon icon={faPhone} />
              </a>
            </div>
            <div className="ui-pt-2">
              <a
                href={`mailto:${storeData.email}`}
                className="hover:ui-underline ui-text-deep-purple-accent-400"
              >
                <span className="ui-pr-3">{storeData.email}</span>
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
