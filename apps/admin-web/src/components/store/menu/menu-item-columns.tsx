"use client";

import { StoreMenuItem } from "@repo/ui/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  CrossCircledIcon,
  DragHandleDots2Icon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { MenuItemSheet } from "./menu-item-sheet";
import { DeleteConfirmation } from "../details/delete-confirmation";
import { SortableItem } from "@/components/ui/sortable-item";
import { useSortable } from "@dnd-kit/sortable";

export type MenuItemRowActionsProps = {
  draggableRows?: boolean;
  onEditMenuItem: (updatedMenuItem: StoreMenuItem) => boolean;
  onDeleteMenuItem: (itemId: string) => Promise<void>;
  onChangeMenuItemAvailability: (itemId: string) => void;
};

export const getMenuItemColumns = ({
  draggableRows,
  onEditMenuItem,
  onDeleteMenuItem,
  onChangeMenuItemAvailability,
}: MenuItemRowActionsProps): ColumnDef<StoreMenuItem>[] => [
  ...(draggableRows
    ? [
        {
          accessorKey: " ",
          cell: ({ row }: { row: Row<StoreMenuItem> }) => {
            const { attributes, listeners } = useSortable({
              id: row.id,
            });
            return (
              <div {...attributes} {...listeners}>
                <DragHandleDots2Icon className="h-5 w-5 hover:cursor-grab active:cursor-grabbing" />
              </div>
            );
          },
        },
      ]
    : []),
  {
    accessorKey: "itemName",
    header: "Item Name",
    meta: {
      cellClassName: "whitespace-nowrap",
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description || "--",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `$${Number(row.original.price).toFixed(2)}`,
  },
  {
    accessorKey: "available",
    header: "Available?",
    cell: ({ row }) => (
      <Checkbox
        checked={row.original.available}
        onCheckedChange={() => onChangeMenuItemAvailability(row.original.id)}
      />
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    meta: {
      cellClassName: "text-right",
    },
    cell: ({ row }) => {
      const { id: itemId, category: itemCategory, itemName } = row.original;
      return (
        <div className="flex gap-2">
          <MenuItemSheet
            category={itemCategory}
            menuItemData={row.original}
            onMenuItemSubmit={onEditMenuItem}
          >
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Pencil2Icon className="w-5 h-5" />
            </Button>
          </MenuItemSheet>

          <DeleteConfirmation
            entity="Menu Item"
            entityId={itemId}
            comparePhrase={itemName}
            onDelete={onDeleteMenuItem}
          >
            <Button variant="ghost" className="h-8 w-8 p-0">
              <CrossCircledIcon className="w-5 h-5 text-red-accent-400" />
            </Button>
          </DeleteConfirmation>
        </div>
      );
    },
  },
];
