"use client";

import { StoreMenuItem } from "@repo/ui/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CrossCircledIcon, Pencil2Icon } from "@radix-ui/react-icons";

export type MenuItemRowActionsProps = {
  onEditMenuItem: (itemId: string, category: string) => void;
  onDeleteMenuItem: (itemId: string, category: string) => void;
};

export const getMenuItemColumns = ({
  onEditMenuItem,
  onDeleteMenuItem,
}: MenuItemRowActionsProps): ColumnDef<StoreMenuItem>[] => [
  {
    accessorKey: "itemName",
    header: "Item Name",
    meta: {
      cellClassName: "whitespace-nowrap",
    },
  },
  {
    accessorKey: "description",
    header: "Item Description",
  },
  {
    accessorKey: "price",
    header: "Item Price",
    cell: ({ row }) => `$${Number(row.original.price).toFixed(2)}`,
  },
  {
    accessorKey: "available",
    header: "Item Available?",
    cell: ({ row }) => <Checkbox checked={row.original.available} />,
  },
  {
    id: "actions",
    enableHiding: false,
    meta: {
      cellClassName: "text-right",
    },
    cell: ({ row }) => {
      const { id: itemId, category: itemCategory } = row.original;
      return (
        <div className="flex gap-2">
          <Button
            onClick={() => onEditMenuItem(itemId!, itemCategory)}
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <Pencil2Icon className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => onDeleteMenuItem(itemId!, itemCategory)}
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <CrossCircledIcon className="w-5 h-5 text-red-accent-400" />
          </Button>
        </div>
      );
    },
  },
];
