import { Services, ServiceCategory, ServiceItem } from "@repo/ui/types";

export const StoreServices = ({ services }: { services: Services }) => {
  return (
    <div className="px-4 pb-16 sm:pt-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 bg-white">
      <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10"
            >
              <defs>
                <pattern
                  id="07690130-d013-42bc-83f4-90de7ac68f76"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#07690130-d013-42bc-83f4-90de7ac68f76)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative text-deep-purple-accent-700">Menu</span>
          </span>
        </h2>
      </div>
      <div className="grid max-w-screen-lg mx-auto space-y-6 lg:grid-cols-2 lg:space-y-0 gap-x-20">
        {services &&
          services.categories.map((category: ServiceCategory) => (
            <div key={category.id} className="mr-5">
              <div className="py-2 text-center">
                <h4 className="pb-3 text-2xl font-bold text-slate-600">
                  {category.categoryName}
                </h4>
                <hr />
                {category.categoryDescription && (
                  <p className="py-3 text-slate-600">
                    {category.categoryDescription}
                  </p>
                )}
              </div>
              <div className="mb-5">
                {category.items.map((item: ServiceItem) => (
                  <div
                    className="flex justify-between items-center"
                    key={item.id}
                  >
                    <div className="px-3 sm:px-0">
                      <div className="py-3">
                        <h6 className="mb-1 text-xl font-medium leading-5 text-gray-900">
                          {item.itemName}
                        </h6>
                        <p className="text-sm text-gray-600">
                          {item.itemDescription}
                        </p>
                      </div>
                    </div>
                    {item.price && (
                      <div className="text-gray-900">${item.price}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
