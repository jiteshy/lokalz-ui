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
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Badge } from "@/components/ui/badge";

export const visibleColumns = ["name", "email", "phone", "type"];

export const columns: ColumnDef<Store>[] = [
  {
    accessorKey: "name",
    enableHiding: false,
    meta: {
      cellClassName: "text-nowrap",
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
      cellClassName: "text-nowrap",
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    meta: {
      cellClassName: "text-nowrap",
    },
  },
  {
    accessorKey: "type",
    enableHiding: false,
    meta: {
      cellClassName: "text-nowrap",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => STORE_TYPES[row.getValue("type") as string],
  },
  {
    accessorKey: "tags",
    header: "Tags",
    meta: {
      cellClassName: "text-nowrap",
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
            <DropdownMenuItem>
              <Link href={`/store/${storeId}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>On Hold</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
