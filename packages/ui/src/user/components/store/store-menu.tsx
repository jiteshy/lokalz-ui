import { StoreMenu, StoreMenuCategory, StoreMenuItem } from "@repo/ui/types";
import { Title } from "../layout/title";

export const StoreMenuDetails = ({ menuData }: { menuData: StoreMenu }) => {
  // Sort the menu by category and items inside each category
  const sortedMenuData = menuData?.menu
    .map((category: StoreMenuCategory) => {
      category.items.sort(
        (item1: StoreMenuItem, item2: StoreMenuItem) =>
          item1.order - item2.order,
      );
      return category;
    })
    .sort(
      (category1: StoreMenuCategory, category2: StoreMenuCategory) =>
        category1.order - category2.order,
    );

  return (
    <>
      <div className="mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
        <Title title="Menu" />
      </div>
      <div className="grid max-w-screen-lg mx-auto space-y-6 lg:grid-cols-2 lg:space-y-0 gap-x-20">
        {sortedMenuData &&
          sortedMenuData.map((menuCategory: StoreMenuCategory) => (
            <div key={menuCategory.id} className="mr-5">
              <div className="py-2 text-center">
                <h4 className="pb-3 text-lg font-bold text-slate-600">
                  {menuCategory.category}
                </h4>
                <hr />
                {menuCategory.description && (
                  <p className="py-3 text-sm text-slate-600 font-light">
                    {menuCategory.description}
                  </p>
                )}
              </div>
              <div className="mb-5">
                {menuCategory.items.map((item: StoreMenuItem) => (
                  <div
                    className="flex justify-between items-center"
                    key={item.id}
                  >
                    <div className="px-3 sm:px-0">
                      <div className="py-3">
                        <h6 className="mb-1 leading-5 text-gray-900">
                          {item.itemName}
                        </h6>
                        <p className="text-sm text-gray-600 font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {item.price && (
                      <div className="text-gray-900">
                        ${Number(item.price).toFixed(2)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
