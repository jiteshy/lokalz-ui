"use client";

import { ReactNode, useEffect, useState } from "react";
import { StoreMenuCategory } from "@repo/ui/types";
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

const categoryFormSchema = z.object({
  category: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name should be max 50 chars." }),

  description: z
    .string()
    .max(100, { message: "Description should be max 100 chars." }),
});

const initialCategoryValues: StoreMenuCategory = {
  id: Math.random().toString().slice(2, 10),
  category: "",
  description: "",
  items: [],
};

type CategorySheetProps = {
  categoryData?: StoreMenuCategory;
  onCategorySubmit: (newCategory: StoreMenuCategory) => boolean;
  children: ReactNode;
};

export const CategorySheet = ({
  categoryData,
  onCategorySubmit,
  children,
}: CategorySheetProps) => {
  const [open, setOpen] = useState(false);
  const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: categoryData || initialCategoryValues,
  });

  // TO-DO: Causing multiple re-renders
  useEffect(() => {
    if (!open) {
      categoryForm.reset(initialCategoryValues);
    } else {
      categoryForm.reset(categoryData || initialCategoryValues);
    }
  }, [open]);

  const onSubmit = (values: z.infer<typeof categoryFormSchema>) => {
    if (values.category) {
      const category: StoreMenuCategory = {
        category: values.category,
        description: values.description,
        id: categoryData?.id || initialCategoryValues.id,
        order: categoryData?.order,
        items: categoryData?.items || [],
      };
      const success = onCategorySubmit(category);
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
          <SheetTitle>{categoryData ? "Update" : "Add"} Category</SheetTitle>
          <SheetDescription>
            {categoryData ? "Update" : "Create a new"} category. Click save when
            you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...categoryForm}>
          <form
            onSubmit={categoryForm.handleSubmit(onSubmit)}
            className="space-y-3 pt-3"
          >
            <FormField
              control={categoryForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Category Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={categoryForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Category Description{" "}
                    <span className="text-[10px] text-slate-600">
                      (Optional | Max 100 chars.)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter category description"
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
