"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Plus, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableToolbarProps {
  table: Table<any>;
  onAddNew: () => void;
  onDeleteSelected: () => void;
}

export function DataTableToolbar({
  table,
  onAddNew,
  onDeleteSelected,
}: DataTableToolbarProps) {
  const value = table.getState().globalFilter;
  const hasSelected = table.getSelectedRowModel().rows.length > 0;

  return (
    <div className="flex items-center justify-between gap-2 mb-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search all columns..."
          value={value ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        {value && (
          <Button
            variant="ghost"
            onClick={() => table.setGlobalFilter("")}
            className="h-8 px-2 lg:px-3"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {hasSelected && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onDeleteSelected}
            className="flex items-center gap-2"
          >
            <Trash className="h-4 w-4" />
            Delete Selected
          </Button>
        )}
        <Button onClick={onAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Supplier
        </Button>
      </div>
    </div>
  );
}
