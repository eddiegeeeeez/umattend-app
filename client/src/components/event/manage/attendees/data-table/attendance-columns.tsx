'use client';

import { ArrowUpDown, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export type AttendanceRecord = {
  id: string;
  name: string;
  email: string;
  checkInAt: string;
  checkInBy: string;
  checkOutAt: string;
  checkOutBy: string;
};

export const columns: ColumnDef<AttendanceRecord>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-foreground p-0 text-xs font-bold hover:bg-transparent md:text-sm"
        >
          Student ID
          <ArrowUpDown className="ml-1 size-3 md:ml-2 md:size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-foreground text-xs font-semibold md:text-sm">{row.getValue('id')}</div>
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-foreground p-0 text-xs font-bold hover:bg-transparent md:text-sm"
        >
          Name
          <ArrowUpDown className="ml-1 size-3 md:ml-2 md:size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-foreground text-xs font-medium md:text-sm">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-foreground p-0 text-xs font-bold hover:bg-transparent md:text-sm"
        >
          Umindanao Email
          <ArrowUpDown className="ml-1 size-3 md:ml-2 md:size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-muted-foreground text-xs font-medium md:text-sm">{row.getValue('email')}</div>
  },
  {
    accessorKey: 'checkInAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-foreground p-0 text-xs font-bold hover:bg-transparent md:text-sm"
        >
          Check in at
          <ArrowUpDown className="ml-1 size-3 md:ml-2 md:size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-foreground text-xs font-medium md:text-sm">{row.getValue('checkInAt')}</div>
  },
  {
    accessorKey: 'checkInBy',
    header: () => <div className="text-foreground text-xs font-bold md:text-sm">Check in by</div>,
    cell: ({ row }) => <div className="text-muted-foreground text-xs font-medium md:text-sm">{row.getValue('checkInBy')}</div>
  },
  {
    accessorKey: 'checkOutAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-foreground p-0 text-xs font-bold hover:bg-transparent md:text-sm"
        >
          Check out at
          <ArrowUpDown className="ml-1 size-3 md:ml-2 md:size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-foreground text-xs font-medium md:text-sm">{row.getValue('checkOutAt')}</div>
  },
  {
    accessorKey: 'checkOutBy',
    header: () => <div className="text-foreground text-xs font-bold md:text-sm">Check out by</div>,
    cell: ({ row }) => <div className="text-muted-foreground text-xs font-medium md:text-sm">{row.getValue('checkOutBy')}</div>
  },
  {
    id: 'actions',
    header: () => <div className="text-foreground text-center text-xs font-bold md:text-sm">Actions</div>,
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const record = row.original;

      return (
        <div className="text-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-muted size-8 md:size-9">
                <MoreVertical className="size-4 md:size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2 shadow-lg md:w-52" align="end">
              <div className="flex flex-col gap-1">
                <Button variant="ghost" className="w-full justify-start gap-2 text-xs font-medium md:gap-3 md:text-sm" size="sm">
                  <Eye className="size-3 md:size-4" />
                  View Details
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-xs font-medium md:gap-3 md:text-sm" size="sm">
                  <Edit className="size-3 md:size-4" />
                  Edit Record
                </Button>
                <Button
                  variant="ghost"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 w-full justify-start gap-2 text-xs font-medium md:gap-3 md:text-sm"
                  size="sm"
                >
                  <Trash2 className="size-3 md:size-4" />
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    }
  }
];
