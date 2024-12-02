"use client";

import {
  ColumnDef,
  Table as TableType,
  Row,
  Column,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowUpDown, ClipboardList, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, FileText, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Supplier {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  commands: Command[];
  lastCommandDate: Date | null;
}

interface Command {
  id: string;
  date: Date;
  amount: number;
  status: string;
  description: string;
}

export const columns = (
  onDelete: (id: string) => void
): ColumnDef<Supplier>[] => [
  {
    id: "select",
    header: ({ table }: { table: TableType<Supplier> }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<Supplier> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "companyName",
    header: ({ column }: { column: Column<Supplier> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Company
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "contactName",
    header: ({ column }: { column: Column<Supplier> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Contact Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }: { column: Column<Supplier> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }: { column: Column<Supplier> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Phone
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "commands",
    header: "Commands",
    cell: ({ row }: { row: Row<Supplier> }) => {
      const client = row.original;
      return (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => {
            const event = new CustomEvent("showCommands", {
              detail: client,
            });
            window.dispatchEvent(event);
          }}
        >
          <ClipboardList className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastCommandDate",
    header: ({ column }: { column: Column<Supplier> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Last Command
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: { row: Row<Supplier> }) => {
      const date = row.getValue("lastCommandDate") as string | null;
      return date ? format(new Date(date), "MMM d, yyyy") : "No commands";
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<Supplier> }) => {
      const supplier = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                const event = new CustomEvent("showCommands", {
                  detail: supplier,
                });
                window.dispatchEvent(event);
              }}
            >
              <FileText className="mr-2 h-4 w-4" />
              View Commands
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(supplier.id)}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
