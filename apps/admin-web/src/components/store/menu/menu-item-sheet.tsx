"use client";

import { ReactNode, useEffect, useState } from "react";
import { StoreMenuItem } from "@repo/ui/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const menuItemFormSchema = z.object({
  itemName: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name should be max 50 chars." }),
  description: z
    .string()
    .max(100, { message: "Description should be max 100 chars." }),
  price: z
    .string()
    .min(1, { message: "Name is required." })
    .max(10, { message: "Name should be max 10 chars." }),
});

const initialMenuItemValues = (category: string): StoreMenuItem => ({
  itemName: "",
  description: "",
  price: "",
  available: true,
  category: category,
});

type MenuItemSheetProps = {
  category: string;
  menuItemData?: StoreMenuItem;
  onMenuItemSubmit: (newMenuItem: StoreMenuItem) => boolean;
  children: ReactNode;
};

export const MenuItemSheet = ({
  category,
  menuItemData,
  onMenuItemSubmit,
  children,
}: MenuItemSheetProps) => {
  const [open, setOpen] = useState(false);
  const menuItemForm = useForm<z.infer<typeof menuItemFormSchema>>({
    resolver: zodResolver(menuItemFormSchema),
    defaultValues: menuItemData || initialMenuItemValues(category),
  });

  // TO-DO: Causing multiple re-renders
  useEffect(() => {
    if (!open) {
      menuItemForm.reset(initialMenuItemValues(category));
    } else {
      menuItemForm.reset(menuItemData || initialMenuItemValues(category));
    }
  }, [open]);

  const onSubmit = (values: z.infer<typeof menuItemFormSchema>) => {
    if (values.itemName && values.price) {
      const menuItem: StoreMenuItem = {
        id: menuItemData?.id,
        itemName: values.itemName,
        description: values.description,
        price: values.price,
        category: category,
        order: menuItemData?.order,
        available: menuItemData?.available || true
      };
      const success = onMenuItemSubmit(menuItem);
      if (success) {
        setOpen(false);
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-2 border-b border-b-slate-200">
          <SheetTitle>{menuItemData ? "Update" : "Add"} Menu Item</SheetTitle>
          <SheetDescription>
            {menuItemData ? "Update" : "Create a new"} menu item. Click save when
            you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...menuItemForm}>
          <form
            onSubmit={menuItemForm.handleSubmit(onSubmit)}
            className="space-y-3 pt-3"
          >
            <FormField
              control={menuItemForm.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Menu Item Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter menu item name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={menuItemForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Menu Item Price*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter menu item price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={menuItemForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Menu Item Description{" "}
                    <span className="text-[10px] text-slate-600">
                      (Optional | Max 100 chars.)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter menu item description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="pt-3">
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
