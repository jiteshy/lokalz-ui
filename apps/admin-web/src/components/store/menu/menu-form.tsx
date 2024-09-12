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
import { CrossCircledIcon, Pencil2Icon, PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getMenuItemColumns } from "./menu-item-columns";
import { CategorySheet } from "./category-sheet";
import { MenuItemSheet } from "./menu-item-sheet";

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

  const onCategoryAdd = (newCategory: StoreMenuCategory) => {
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

  const onCategoryUpdate = (updatedCategory: StoreMenuCategory) => {
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

  const onMenuItemAdd = (newMenuItem: StoreMenuItem) => {
    console.log("Add menu item--", newMenuItem);
    return true;
  }

  const onEditMenuItem = (itemId: string, category: string) => {
    console.log("Editing - ", category, itemId);
  };

  const onDeleteMenuItem = (itemId: string, category: string) => {
    console.log("Deleting - ", category, itemId);
  };

  const columns: ColumnDef<StoreMenuItem>[] = useMemo(
    () => getMenuItemColumns({ onEditMenuItem, onDeleteMenuItem }),
    [],
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
        <CategorySheet onCategorySubmit={onCategoryAdd}>
          <Button>
            <PlusIcon className="w-5 h-5" />
            Add Menu Category
          </Button>
        </CategorySheet>
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
                      <MenuItemSheet category={menuCategory.category} onMenuItemSubmit={onMenuItemAdd}>
                        <Button variant={"link"}>
                          <div className="flex gap-2 items-center">
                            <PlusCircledIcon className="w-4 h-4" />
                            Add Item
                          </div>
                        </Button>
                      </MenuItemSheet>
                      <CategorySheet
                        categoryData={menuCategory}
                        onCategorySubmit={onCategoryUpdate}
                      >
                        <Button variant={"link"}>
                          <div className="flex gap-2 items-center">
                            <Pencil2Icon className="w-4 h-4" />
                            Edit Category
                          </div>
                        </Button>
                      </CategorySheet>
                      <Button
                        variant={"link"}
                        className="!pr-0 hover:text-red-accent-400"
                      >
                        <div className="flex gap-2 items-center">
                          <CrossCircledIcon className="w-4 h-4 text-red-accent-400" />
                          Delete Category
                        </div>
                      </Button>
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
