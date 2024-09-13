import { useToast } from "@/hooks/use-toast";
import { USER_APIS } from "@repo/ui/config";
import { StoreMenu, StoreMenuCategory, StoreMenuItem } from "@repo/ui/types";
import { useRouter } from "next/navigation";
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

export const MenuForm = ({ storeId }: { storeId: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [currentStoreMenu, setCurrentStoreMenu] = useState<StoreMenuCategory[]>(
    [],
  );
  const { data: storeMenu, isLoading: isStoreMenuLoading } = useSWR<StoreMenu>(
    storeId ? `${USER_APIS.STORE.STORE_DETAILS}/${storeId}/menu` : null,
  );

  useEffect(() => {
    if (storeMenu?.menu) {
      setCurrentStoreMenu(storeMenu.menu);
    }
  }, [storeMenu]);

  const onAddCategory = (newCategory: StoreMenuCategory) => {
    const categoryExists = currentStoreMenu.filter(
      (menuCategory) =>
        menuCategory.category.toLowerCase() ===
        newCategory.category.toLocaleLowerCase(),
    )[0];
    if (!categoryExists) {
      currentStoreMenu.push(newCategory);
      setCurrentStoreMenu(currentStoreMenu);
      toast({
        title: "Success!",
        duration: 5000,
        description: "Category added. Click save when you're done.",
      });
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
      (menuCategory) => menuCategory.id === updatedCategory.id,
    )[0];
    if (categoryToUpdate) {
      categoryToUpdate.category = updatedCategory.category;
      categoryToUpdate.description = updatedCategory.description;
      setCurrentStoreMenu(currentStoreMenu);
      toast({
        title: "Success!",
        duration: 5000,
        description: "Category updated. Click save when you're done.",
      });
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
      (menuCategory) => menuCategory.id !== categoryId,
    );
    setCurrentStoreMenu(filteredCategories);
    toast({
      title: "Success!",
      duration: 5000,
      description: "Category deleted. Click save when you're done.",
    });
    return Promise.resolve();
  };

  const cloneStoreMenu = (): StoreMenuCategory[] => {
    const clonedStoreMenu: StoreMenuCategory[] = [];
    currentStoreMenu.forEach((menu) => {
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
      (menuCategory) => menuCategory.category === newMenuItem.category,
    )[0];

    const itemExists = categoryObj.items.filter(
      (menuItem) => menuItem.itemName === newMenuItem.itemName,
    )[0];
    if (!itemExists) {
      categoryObj.items.push(newMenuItem);
      setCurrentStoreMenu(newStoreMenu);
      toast({
        title: "Success!",
        duration: 5000,
        description: "Menu item added. Click save when you're done.",
      });
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
      (menuCategory) => menuCategory.category === updatedMenuItem.category,
    )[0];
    const existingItem = categoryObj.items.filter(
      (menuItem) => menuItem.id === updatedMenuItem.id,
    )[0];
    if (existingItem) {
      existingItem.itemName = updatedMenuItem.itemName;
      existingItem.price = updatedMenuItem.price;
      existingItem.description = updatedMenuItem.description;
      setCurrentStoreMenu(newStoreMenu);
      toast({
        title: "Success!",
        duration: 5000,
        description: "Menu Item updated. Click save when you're done.",
      });
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
    toast({
      title: "Success!",
      duration: 5000,
      description: "Menu Item deleted. Click save when you're done.",
    });
    return Promise.resolve();
  };

  const columns: ColumnDef<StoreMenuItem>[] = useMemo(
    () => getMenuItemColumns({ onEditMenuItem, onDeleteMenuItem }),
    [currentStoreMenu],
  );

  return isStoreMenuLoading ? (
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

          <Button type="submit">
            <CheckIcon className="w-5 h-5" />
            <span className="pl-2">Save Menu</span>
          </Button>
        </div>
      </div>
      {currentStoreMenu.length === 0 ? (
        <div className="w-full text-center py-40">
          No menu data available. Start creating it by adding a category.
        </div>
      ) : (
        <div className="py-6">
          <Accordion
            type="single"
            // defaultValue={newStoreMenu[0].category}
            collapsible
          >
            {currentStoreMenu.map((menuCategory: StoreMenuCategory) => (
              <AccordionItem
                key={menuCategory.category}
                value={menuCategory.category}
              >
                <AccordionTrigger>{menuCategory.category}</AccordionTrigger>
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
                  <DataTable columns={columns} data={menuCategory.items} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
};
