"use client";

import React from "react";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { DataTableViewOptions } from "@/components/data-table.column-toggle";
import type { DataTablePaginationProps } from "@/components/data-table.pagination";
import { DataTablePagination } from "@/components/data-table.pagination";

interface DataTableProps<TData, TValue> {
  title?: string;
  subtitle?: string;
  reverseTitle?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginate?: boolean;
  viewOptions?: boolean;
  selectedRowsAction?: DataTablePaginationProps<TData>["selectedRowsAction"];
}

/**
 * A table component that uses React Table under the hood.
 *
 * ```tsx
 * <DataTable columns={columnDef[]} data={data[]} paginate={boolean} />
 * ```
 *
 * @param {DataTableProps} props
 * @returns {React.ReactElement}
 * @constructor DataTable
 * @see
 * [shadcn-ui/data-table](https://ui.shadcn.com/docs/components/data-table)
 *
 */
export function DataTable<TData, TValue>({
  title,
  subtitle,
  columns,
  data,
  reverseTitle,
  paginate = true,
  viewOptions = true,
}: DataTableProps<TData, TValue>): React.ReactElement {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginate ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-2 overflow-x-hidden md:space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div
          className={cn("flex", reverseTitle ? "flex-col-reverse" : "flex-col")}
        >
          {title && (
            <Typography as="h3" variant="h3">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography as="p" variant="muted">
              {subtitle}
            </Typography>
          )}
        </div>
        {viewOptions && <DataTableViewOptions table={table} />}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {paginate && <DataTablePagination table={table} />}
    </div>
  );
}

function withSelectColumn<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
): [ColumnDef<TData, TValue>, ...ColumnDef<TData, TValue>[]] {
  const selectColumn: ColumnDef<TData, TValue> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  return [selectColumn, ...columns];
}
