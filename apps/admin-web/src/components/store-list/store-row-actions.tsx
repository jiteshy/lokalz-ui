"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { StoreRowActionsProps } from "./store-columns";
import { Row } from "@tanstack/react-table";
import { Store, StoreStatus } from "@repo/ui/types";
import {
  CircleBackslashIcon,
  CrossCircledIcon,
  IdCardIcon,
  LightningBoltIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";

export const StoreRowActions = ({
  row,
  actions: { onEdit, onMarkInactive, onDelete },
}: {
  row: Row<Store>;
  actions: StoreRowActionsProps;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>();
  const { id: storeId, name: storeName, status: storeStatus } = row.original;

  useEffect(() => {
    if (!open && inputValue) {
      setInputValue("");
    }
  }, [open]);

  const handleInputValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    setError("");
  };

  const handleDelete = (event: React.FormEvent) => {
    if (inputValue.toLowerCase() !== storeName.toLowerCase()) {
      setError("Store name does not match.");
    } else {
      setError("");
      onDelete(storeId!).then(() => {
        setInputValue("");
        setOpen(false);
      });
    }
    event.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Store Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onEdit(storeId!, storeName, "store", storeStatus)}
            >
              <div className="flex gap-2 items-center">
                <IdCardIcon className="w-4 h-4" />
                Edit Details
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onEdit(storeId!, storeName, "menu", storeStatus)}
            >
              <div className="flex gap-2 items-center">
                <ReaderIcon className="w-4 h-4" />
                Edit Menu
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                onEdit(storeId!, storeName, "schedule", storeStatus)
              }
            >
              <div className="flex gap-2 items-center">
                <CalendarIcon className="w-4 h-4" />
                Edit Schedule
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {storeStatus === StoreStatus.ACTIVE && (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  onEdit(storeId!, storeName, "publish", storeStatus)
                }
              >
                <div className="flex gap-2 items-center">
                  <LightningBoltIcon className="w-4 h-4" />
                  Store Preview
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onMarkInactive(storeId!)}
              >
                <div className="flex gap-2 items-center">
                  <CircleBackslashIcon className="w-4 h-4" />
                  Mark Inactive
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer text-red-accent-400 hover:text-red-accent-700">
              <div className="flex gap-2 items-center">
                <CrossCircledIcon className="w-4 h-4" />
                Delete
              </div>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleDelete}>
          <DialogHeader>
            <DialogTitle>Delete Store</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the store? If yes, please enter
              the name of the store below and click "Delete Store".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 pt-4 pb-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Store Name
              </Label>
              <Input
                id="name"
                value={inputValue}
                onChange={handleInputValueChange}
                className={`col-span-3 ${error && "border border-red-accent-400"}`}
              />
            </div>
            <div className="text-red-accent-400 text-sm min-h-5 w-full text-right -mt-3">
              {error}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={"secondary"}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Delete Store</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
