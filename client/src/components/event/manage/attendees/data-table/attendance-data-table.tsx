'use client';

import * as React from 'react';
import { Search, Settings2, ChevronRight, ChevronLeft } from 'lucide-react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search: string;
  onSearchChange: (value: string) => void;
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  totalRecords: number;
  isLoading: boolean;
  error?: unknown;
}

export function AttendanceDataTable<TData, TValue>({
  columns,
  data,
  search,
  onSearchChange,
  page,
  onPageChange,
  totalPages,
  totalRecords,
  isLoading,
  error
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
    manualPagination: true,
    pageCount: totalPages
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 py-4">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search by Student ID, Name, or Email..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto bg-transparent">
              <Settings2 className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                let headerText = '';
                if (typeof column.columnDef.header === 'string') {
                  headerText = column.columnDef.header;
                } else if (column.columnDef.header === undefined) {
                  headerText = column.id;
                } else {
                  headerText = column.id.charAt(0).toUpperCase() + column.id.slice(1);
                }

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {headerText}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table className="p-5">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="border-border grid grid-cols-10 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((j) => (
                      <Skeleton key={j} className="h-5 w-full" />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No records found
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-5 flex flex-col items-start justify-between gap-4 text-xs sm:flex-row sm:items-center md:text-sm">
        <p className="text-muted-foreground font-medium">
          Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, totalRecords)} of {totalRecords} records
        </p>
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="h-8 gap-1 text-xs font-medium shadow-sm md:h-9 md:text-sm"
          >
            <ChevronLeft className="size-3 md:size-4" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className={
                    page === pageNum
                      ? 'bg-primary text-primary-foreground h-8 w-8 text-xs font-semibold shadow-sm md:h-9 md:w-9 md:text-sm'
                      : 'h-8 w-8 bg-transparent text-xs font-medium shadow-sm md:h-9 md:w-9 md:text-sm'
                  }
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
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
