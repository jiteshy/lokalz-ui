"use client";

import { STORE_TYPES } from "@repo/ui/constants";
import { Store, StoreStatus } from "@repo/ui/types";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { StoreRowActions } from "./store-row-actions";
import { Button } from "../ui/button";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";

export type StoreRowActionsProps = {
  onEdit: (
    storeId: string,
    storeName: string,
    tab?: string,
    status?: StoreStatus,
  ) => void;
  onMarkInactive: (storeId: string) => Promise<void>;
  onDelete: (storeId: string) => Promise<void>;
};

export const visibleColumns: VisibilityState = {
  name: true,
  description: false,
  email: false,
  phone: false,
  type: true,
  status: true,
  tags: false,
};

export const getStoreColumns = ({
  onEdit,
  onMarkInactive,
  onDelete,
}: StoreRowActionsProps): ColumnDef<Store>[] => [
  {
    accessorKey: "name",
    enableHiding: false,
    meta: {
      cellClassName: "whitespace-nowrap pl-4",
      headerClassName: "pl-4",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { id: storeId, name } = row.original;
      return (
        <Button
          variant="link"
          className="underline p-0 text-primary text-body dark:text-bodydark"
          onClick={() =>
            window.open(
              `${process.env.NEXT_PUBLIC_APP_URL}/store?id=${storeId}`,
            )
          }
        >
          <div className="flex items-center gap-2">
            {name}
            <OpenInNewWindowIcon className="h-4 w-4" />
          </div>
        </Button>
      );
    },
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
      const actions = { onEdit, onMarkInactive, onDelete };
      return <StoreRowActions row={row} actions={actions} />;
    },
  },
];
