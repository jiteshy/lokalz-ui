import { useToast } from "@/hooks/use-toast";
import { ADMIN_APIS } from "@repo/ui/config";
import { StoreMenu, StoreMenuCategory, StoreMenuItem } from "@repo/ui/types";
import useSWR from "swr";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  CrossCircledIcon,
  Pencil2Icon,
  PlusCircledIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getMenuItemColumns } from "./menu-item-columns";
import { CategorySheet } from "./category-sheet";
import { MenuItemSheet } from "./menu-item-sheet";
import { DeleteConfirmation } from "../delete-confirmation";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableItem } from "@/components/ui/sortable-item";
import { useAxios } from "@/hooks/use-axios";

export const MenuForm = ({ storeId }: { storeId: string }) => {
  const { toast } = useToast();
  const axios = useAxios();
  const [currentStoreMenu, setCurrentStoreMenu] = useState<StoreMenuCategory[]>(
    []
  );
  const [menuChanged, setMenuChanged] = useState<boolean>(false);
  const [submittingMenu, setSubmittingMenu] = useState<boolean>(false);
  const {
    data: storeMenu,
    isLoading: isStoreMenuLoading,
    mutate,
  } = useSWR<StoreMenu>(
    storeId ? `${ADMIN_APIS.STORE.STORE_DETAILS}/${storeId}/menu` : null
  );

  useEffect(() => {
    if (storeMenu?.menu.length) {
      const sortedMenu: StoreMenuCategory[] = [];
      const clonedMenu = cloneStoreMenu(storeMenu.menu);
      clonedMenu.sort((cat1, cat2) => cat1.order - cat2.order);
      clonedMenu.forEach((category) => {
        category.items.sort((item1, item2) => item1.order - item2.order);
        sortedMenu.push(category);
      });
      setCurrentStoreMenu(sortedMenu);
    }
  }, [storeMenu]);

  const onAddCategory = (newCategory: StoreMenuCategory) => {
    const categoryExists = currentStoreMenu.filter(
      (menuCategory) =>
        menuCategory.category.toLowerCase() ===
        newCategory.category.toLocaleLowerCase()
    )[0];
    if (!categoryExists) {
      const clonedMenu = cloneStoreMenu();
      newCategory.order = clonedMenu.length + 1;
      clonedMenu.push(newCategory);
      setCurrentStoreMenu(clonedMenu);
      setMenuChanged(true);
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Failure!",
        duration: 5000,
        description: "Category already exists.",
      });
      return false;
    }
  };

  const onEditCategory = (updatedCategory: StoreMenuCategory) => {
    const categoryToUpdate = currentStoreMenu.filter(
      (menuCategory) => menuCategory.id === updatedCategory.id
    )[0];
    if (categoryToUpdate) {
      categoryToUpdate.category = updatedCategory.category;
      categoryToUpdate.description = updatedCategory.description;
      setCurrentStoreMenu(currentStoreMenu);
      setMenuChanged(true);
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Failure!",
        duration: 5000,
        description: "Category does not exist.",
      });
      return false;
    }
  };

  const onDeleteCategory = (categoryId: string) => {
    const filteredCategories = currentStoreMenu.filter(
      (menuCategory) => menuCategory.id !== categoryId
    );
    setCurrentStoreMenu(filteredCategories);
    setMenuChanged(true);
    return Promise.resolve();
  };

  const cloneStoreMenu = (
    storeMenu?: StoreMenuCategory[]
  ): StoreMenuCategory[] => {
    const clonedStoreMenu: StoreMenuCategory[] = [];
    (storeMenu || currentStoreMenu).forEach((menu) => {
      const clonedItems: StoreMenuItem[] = [];
      menu.items.forEach((item) => clonedItems.push({ ...item }));
      clonedStoreMenu.push({
        ...menu,
        items: clonedItems,
      });
    });
    return clonedStoreMenu;
  };

  const onAddMenuItem = (newMenuItem: StoreMenuItem) => {
    const newStoreMenu: StoreMenuCategory[] = cloneStoreMenu();
    const categoryObj = newStoreMenu.filter(
      (menuCategory) => menuCategory.category === newMenuItem.category
    )[0];

    const itemExists = categoryObj.items.filter(
      (menuItem) => menuItem.itemName === newMenuItem.itemName
    )[0];
    if (!itemExists) {
      newMenuItem.order = categoryObj.items.length + 1;
      categoryObj.items.push(newMenuItem);
      setCurrentStoreMenu(newStoreMenu);
      setMenuChanged(true);
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Failure!",
        duration: 5000,
        description: "Menu item already exists.",
      });
      return false;
    }
  };

  const onEditMenuItem = (updatedMenuItem: StoreMenuItem) => {
    const newStoreMenu: StoreMenuCategory[] = cloneStoreMenu();
    const categoryObj = newStoreMenu.filter(
      (menuCategory) => menuCategory.category === updatedMenuItem.category
    )[0];
    const existingItem = categoryObj.items.filter(
      (menuItem) => menuItem.id === updatedMenuItem.id
    )[0];
    if (existingItem) {
      existingItem.itemName = updatedMenuItem.itemName;
      existingItem.price = updatedMenuItem.price;
      existingItem.description = updatedMenuItem.description;
      setCurrentStoreMenu(newStoreMenu);
      setMenuChanged(true);
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Failure!",
        duration: 5000,
        description: "Menu Item does not exist.",
      });
      return false;
    }
  };

  const onDeleteMenuItem = (itemId: string) => {
    const clonedStoreMenu: StoreMenuCategory[] = [];
    currentStoreMenu.forEach((menu) => {
      const clonedItems: StoreMenuItem[] = [];
      menu.items.forEach((item) => {
        if (item.id !== itemId) {
          clonedItems.push({ ...item });
        }
      });
      clonedStoreMenu.push({
        ...menu,
        items: clonedItems,
      });
    });
    setCurrentStoreMenu(clonedStoreMenu);
    setMenuChanged(true);
    return Promise.resolve();
  };

  const onChangeMenuItemAvailability = (itemId: string) => {
    const clonedStoreMenu: StoreMenuCategory[] = [];
    currentStoreMenu.forEach((menu) => {
      const clonedItems: StoreMenuItem[] = [];
      menu.items.forEach((item) => {
        if (item.id === itemId) {
          item.available = !item.available;
        }
        clonedItems.push({ ...item });
      });
      clonedStoreMenu.push({
        ...menu,
        items: clonedItems,
      });
    });
    setCurrentStoreMenu(clonedStoreMenu);
    setMenuChanged(true);
  };

  const columns: ColumnDef<StoreMenuItem>[] = useMemo(
    () =>
      getMenuItemColumns({
        draggableRows: true,
        onEditMenuItem,
        onDeleteMenuItem,
        onChangeMenuItemAvailability,
      }),
    [currentStoreMenu]
  );

  const reorderMenuCategories = (e: DragEndEvent) => {
    if (!e.over) return;
    if (e.active.id !== e.over.id) {
      setCurrentStoreMenu((storeMenu) => {
        const oldIdx = storeMenu.findIndex(
          (menuCategory) => menuCategory.id === e.active.id
        );
        const newIdx = storeMenu.findIndex(
          (menuCategory) => menuCategory.id === e.over!.id
        );
        const reorderedCategories = arrayMove(storeMenu, oldIdx, newIdx);
        reorderedCategories.forEach((item, index) => (item.order = index + 1));
        return reorderedCategories;
      });
      setMenuChanged(true);
    }
  };

  const reorderMenuItems = (e: DragEndEvent, categoryId: string) => {
    if (!e.over) return;
    if (e.active.id !== e.over.id) {
      const clonedMenu = cloneStoreMenu();
      const currentCategoryIndex = clonedMenu.findIndex(
        (menuCategory) => menuCategory.id === categoryId
      );
      const menuItems: StoreMenuItem[] = clonedMenu.filter(
        (menuCategory) => menuCategory.id === categoryId
      )[0].items;
      const oldIdx = menuItems.findIndex(
        (menuCategory) => menuCategory.id === e.active.id
      );
      const newIdx = menuItems.findIndex(
        (menuCategory) => menuCategory.id === e.over!.id
      );
      const reorderedItems = arrayMove(menuItems, oldIdx, newIdx);
      reorderedItems.forEach((item, index) => (item.order = index + 1));
      clonedMenu[currentCategoryIndex].items = reorderedItems;
      setCurrentStoreMenu(clonedMenu);
      setMenuChanged(true);
    }
  };

  const handleMenuSave = () => {
    const emptyCategories = currentStoreMenu.filter(
      (category) => category.items.length === 0
    );
    if (emptyCategories.length > 0) {
      toast({
        variant: "destructive",
        title: "Failure!",
        duration: 5000,
        description: `Some of the menu categories are empty. Please either add the items or delete the category.`,
      });
    } else {
      setSubmittingMenu(true);
      const menuCategoryToSave: StoreMenu = {
        menu: currentStoreMenu,
      };
      axios.put(`/store/${storeId}/menu`, menuCategoryToSave).then(
        async () => {
          await mutate();
          toast({
            title: "Success!",
            duration: 5000,
            description: `Store menu updated successfully.`,
          });
          setSubmittingMenu(false);
          setMenuChanged(false);
        },
        () => {
          toast({
            variant: "destructive",
            duration: 5000,
            title: "Failure!",
            description: `Store menu update failed.`,
          });
          setSubmittingMenu(false);
        }
      );
    }
  };

  return isStoreMenuLoading || submittingMenu ? (
    <Loading />
  ) : (
    <div className="sm:max-w-screen-lg m-auto pt-3">
      <div className="flex items-center justify-between pb-2 border-b border-b-slate-200">
        <h4 className="text-xl">
          Menu Categories
          <span className="text-xs text-slate-500 pl-2">
            (Expand below categories to see items)
          </span>
        </h4>
        <div className="flex items-center gap-3">
          <CategorySheet onCategorySubmit={onAddCategory}>
            <Button variant={"outline"} className="shadow">
              <PlusIcon className="w-5 h-5" />
              Add Menu Category
            </Button>
          </CategorySheet>
          <Button type="submit" onClick={handleMenuSave}>
            <CheckIcon className="w-5 h-5" />
            <span className="pl-2">Save Menu</span>
          </Button>
        </div>
      </div>
      <div className="w-full text-right text-sm italic text-red-accent-400 h-5 pt-3">
        {menuChanged && currentStoreMenu.length
          ? "Unsaved changes. Click Save Menu above when you're done."
          : ""}
      </div>
      {currentStoreMenu.length === 0 ? (
        <div className="w-full text-center py-40">
          No menu data available. Start creating it by adding a category.
        </div>
      ) : (
        <DndContext
          onDragEnd={reorderMenuCategories}
          modifiers={[restrictToVerticalAxis]}
        >
          <div className="py-3">
            <Accordion
              type="single"
              // defaultValue={newStoreMenu[0].category}
              collapsible
            >
              <SortableContext items={currentStoreMenu}>
                {currentStoreMenu.map((menuCategory: StoreMenuCategory) => (
                  <SortableItem key={menuCategory.id} itemId={menuCategory.id}>
                    <AccordionItem value={menuCategory.category}>
                      <AccordionTrigger>
                        {menuCategory.category}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500 w-full">
                            {menuCategory.description}
                          </div>
                          <div className="w-full text-right">
                            <MenuItemSheet
                              category={menuCategory.category}
                              onMenuItemSubmit={onAddMenuItem}
                            >
                              <Button variant={"link"}>
                                <div className="flex gap-2 items-center">
                                  <PlusCircledIcon className="w-4 h-4" />
                                  Add Item
                                </div>
                              </Button>
                            </MenuItemSheet>
                            <CategorySheet
                              categoryData={menuCategory}
                              onCategorySubmit={onEditCategory}
                            >
                              <Button variant={"link"}>
                                <div className="flex gap-2 items-center">
                                  <Pencil2Icon className="w-4 h-4" />
                                  Edit Category
                                </div>
                              </Button>
                            </CategorySheet>
                            <DeleteConfirmation
                              entity="Category"
                              entityId={menuCategory.id}
                              comparePhrase={menuCategory.category}
                              onDelete={onDeleteCategory}
                            >
                              <Button
                                variant={"link"}
                                className="!pr-0 hover:text-red-accent-400"
                              >
                                <div className="flex gap-2 items-center">
                                  <CrossCircledIcon className="w-4 h-4 text-red-accent-400" />
                                  Delete Category
                                </div>
                              </Button>
                            </DeleteConfirmation>
                          </div>
                        </div>
                        <DndContext
                          onDragEnd={(e) =>
                            reorderMenuItems(e, menuCategory.id)
                          }
                          modifiers={[restrictToVerticalAxis]}
                        >
                          <SortableContext
                            items={menuCategory.items}
                            strategy={verticalListSortingStrategy}
                            key={`${Date.now()}`} // Hack to make drag drop work after first item drag
                          >
                            <DataTable
                              columns={columns}
                              data={menuCategory.items}
                              draggableRows={true}
                            />
                          </SortableContext>
                        </DndContext>
                      </AccordionContent>
                    </AccordionItem>
                  </SortableItem>
                ))}
              </SortableContext>
            </Accordion>
          </div>
        </DndContext>
      )}
    </div>
  );
};
