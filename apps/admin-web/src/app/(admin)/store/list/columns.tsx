"use client";

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { STORE_TYPES } from "@repo/ui/constants";
import { Store } from "@repo/ui/types";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Badge } from "@/components/ui/badge";

type RowActions = {
  onEdit: (storeId: string) => void;
  onInactive: (storeId: string) => void;
  onDelete: (storeId: string) => void;
};

export const visibleColumns: VisibilityState = {
  name: true,
  description: false,
  email: false,
  phone: false,
  type: true,
  status: true,
  tags: false,
}

export const getStoreColumns = ({
  onEdit,
  onInactive,
  onDelete,
}: RowActions): ColumnDef<Store>[] => [
  {
    accessorKey: "name",
    enableHiding: false,
    meta: {
      cellClassName: "whitespace-nowrap",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "email",
    header: "Email",
    meta: {
      cellClassName: "whitespace-nowrap",
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    meta: {
      cellClassName: "whitespace-nowrap",
    },
  },
  {
    accessorKey: "type",
    enableHiding: false,
    meta: {
      cellClassName: "whitespace-nowrap",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => STORE_TYPES[row.getValue("type") as string],
  },
  {
    accessorKey: "status",
    meta: {
      cellClassName: "whitespace-nowrap",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    meta: {
      cellClassName: "whitespace-nowrap",
    },
    cell: ({ row }) => {
      const tags: string[] = row.getValue("tags");
      return (
        <div>
          {tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="mb-1 mr-1">
              {tag}
            </Badge>
          ))}
        </div>
      );
    },
    filterFn: (row, _columnId, filterValue) => {
      // TO-DO: Not working
      const tags: string[] = row.getValue("tags");
      return tags.some((tag) => tag.toLowerCase().indexOf(filterValue) !== -1);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    meta: {
      cellClassName: "text-right",
    },
    cell: ({ row }) => {
      const { id: storeId } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={() => onEdit(storeId!)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => onInactive(storeId!)}>
              Deactivate
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => onDelete(storeId!)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
