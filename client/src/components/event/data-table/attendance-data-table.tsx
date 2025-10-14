'use client';

import * as React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function AttendanceDataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination
    }
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 md:left-4 md:size-5" />
        <Input
          placeholder="Search by name, student ID, or email..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            // Filter across multiple columns
            const value = event.target.value;
            table.getColumn('name')?.setFilterValue(value);
            table.getColumn('id')?.setFilterValue(value);
            table.getColumn('email')?.setFilterValue(value);
          }}
          className="focus-visible:ring-primary/20 h-10 border-2 pl-10 text-sm shadow-sm focus-visible:ring-2 md:h-12 md:pl-12 md:text-base"
        />
      </div>

      <div className="border-border bg-card overflow-hidden rounded-xl border-2 shadow-md">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50 border-b-2">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-foreground h-12 text-xs font-bold whitespace-nowrap md:h-14 md:text-sm">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="hover:bg-muted/30 border-b transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 text-xs whitespace-nowrap md:py-4 md:text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-muted-foreground h-24 text-center text-sm md:h-32 md:text-base">
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 text-xs sm:flex-row sm:items-center md:text-sm">
        <p className="text-muted-foreground font-medium">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of{' '}
          {table.getFilteredRowModel().rows.length} records
        </p>
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 gap-1 text-xs font-medium shadow-sm md:h-9 md:text-sm"
          >
            <ChevronLeft className="size-3 md:size-4" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => (
              <Button
                key={pageIndex}
                variant={table.getState().pagination.pageIndex === pageIndex ? 'default' : 'outline'}
                size="sm"
                onClick={() => table.setPageIndex(pageIndex)}
                className={
                  table.getState().pagination.pageIndex === pageIndex
                    ? 'bg-primary text-primary-foreground h-8 w-8 text-xs font-semibold shadow-sm md:h-9 md:w-9 md:text-sm'
                    : 'h-8 w-8 bg-transparent text-xs font-medium shadow-sm md:h-9 md:w-9 md:text-sm'
                }
              >
                {pageIndex + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 gap-1 text-xs font-medium shadow-sm md:h-9 md:text-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="size-3 md:size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
