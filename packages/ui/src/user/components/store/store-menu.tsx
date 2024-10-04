import { StoreMenu, StoreMenuCategory, StoreMenuItem } from "@repo/ui/types";
import { Title } from "../layout/title";

export const StoreMenuDetails = ({ menuData }: { menuData: StoreMenu }) => {
  // TO-DO: Remove ! after order once optional is removed from type
  // Sort the menu by category and items inside each category
  const sortedMenuData = menuData?.menu
    ?.map((category: StoreMenuCategory) => {
      category.items.sort(
        (item1: StoreMenuItem, item2: StoreMenuItem) =>
          item1.order! - item2.order!,
      );
      return category;
    })
    .sort(
      (category1: StoreMenuCategory, category2: StoreMenuCategory) =>
        category1.order! - category2.order!,
    );

  return (
    <>
      <div className="ui-mb-10 md:ui-mx-auto ui-text-center lg:ui-max-w-2xl md:ui-mb-12">
        <Title title="Menu" />
      </div>
      <div className="ui-grid ui-max-w-screen-lg ui-mx-auto ui-space-y-6 lg:ui-grid-cols-2 lg:ui-space-y-0 ui-gap-x-20">
        {sortedMenuData &&
          sortedMenuData.map((menuCategory: StoreMenuCategory) => (
            <div key={menuCategory.id} className="ui-mr-5">
              <div className="ui-py-2 ui-text-center">
                <h4 className="ui-pb-3 ui-text-lg ui-font-bold ui-text-slate-600">
                  {menuCategory.category}
                </h4>
                <hr />
                {menuCategory.description && (
                  <p className="ui-py-3 ui-text-sm ui-text-slate-600 ui-font-light">
                    {menuCategory.description}
                  </p>
                )}
              </div>
              <div className="ui-mb-5">
                {menuCategory.items.map((item: StoreMenuItem) => (
                  <div
                    className="ui-flex ui-justify-between ui-items-center"
                    key={item.id}
                  >
                    <div className="ui-px-3 sm:ui-px-0">
                      <div className="ui-py-3">
                        <h6 className="ui-mb-1 ui-leading-5 ui-text-gray-900">
                          {item.itemName}
                        </h6>
                        <p className="ui-text-sm ui-text-gray-600 ui-font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {item.price && (
                      <div className="ui-text-gray-900">
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
