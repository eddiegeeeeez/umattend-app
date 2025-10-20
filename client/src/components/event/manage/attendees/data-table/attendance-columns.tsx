'use client';

import { ArrowUpDown } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import type { AttendanceRecord } from '@/types/events';

export const columns: ColumnDef<AttendanceRecord>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-foreground p-0 text-xs font-medium md:text-sm"
        >
          Student ID
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-foreground font-semimedium pl-3 text-xs md:text-sm">{row.getValue('id')}</div>
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-foreground p-0 text-xs font-medium md:text-sm"
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-foreground pl-3 text-xs font-medium md:text-sm">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'department',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-foreground p-0 text-xs font-medium md:text-sm"
        >
          Department
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-muted-foreground pl-3 text-xs font-medium md:text-sm">{row.getValue('department')}</div>
  },
  {
    accessorKey: 'program',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-foreground p-0 text-xs font-medium md:text-sm"
        >
          Program
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-muted-foreground pl-3 text-xs font-medium md:text-sm">{row.getValue('program')}</div>
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-foreground p-0 text-xs font-medium md:text-sm"
        >
          UMindanao Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-muted-foreground pl-3 text-xs font-medium md:text-sm">{row.getValue('email')}</div>
  },
  {
    accessorKey: 'checkInAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-foreground p-0 text-xs font-medium md:text-sm"
        >
          Check in at
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-foreground pl-3 text-xs font-medium md:text-sm">{row.getValue('checkInAt')}</div>
  },
  {
    accessorKey: 'checkInBy',
    header: () => <div className="text-foreground pl-3 text-xs font-medium md:text-sm">Check in by</div>,
    cell: ({ row }) => <div className="text-muted-foreground pl-3 text-xs font-medium md:text-sm">{row.getValue('checkInBy')}</div>
  },
  {
    accessorKey: 'checkOutAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-foreground p-0 text-xs font-medium md:text-sm"
        >
          Check out at
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-foreground pl-3 text-xs font-medium md:text-sm">{row.getValue('checkOutAt')}</div>
  },
  {
    accessorKey: 'checkOutBy',
    header: () => <div className="text-foreground mr-6 pl-3 text-xs font-medium md:text-sm">Check out by</div>,
    cell: ({ row }) => <div className="text-muted-foreground pl-3 text-xs font-medium md:text-sm">{row.getValue('checkOutBy')}</div>
  }
  // {
  //   id: 'actions',
  //   header: () => <div className="text-foreground px-4 text-center text-xs font-medium md:text-sm">Actions</div>,
  //   cell: ({ row }) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const record = row.original;

  //     return (
  //       <div className="text-center">
  //         <Popover>
  //           <PopoverTrigger asChild>
  //             <Button variant="ghost" size="icon" className="hover:bg-muted size-8 md:size-9">
  //               <MoreVertical className="size-4 md:size-5" />
  //               <span className="sr-only">Open menu</span>
  //             </Button>
  //           </PopoverTrigger>
  //           <PopoverContent className="w-48 p-2 shadow-lg md:w-52" align="end">
  //             <div className="flex flex-col gap-1">
  //               <Button variant="ghost" className="w-full justify-start gap-2 text-xs font-medium md:gap-3 md:text-sm" size="sm">
  //                 <Eye className="size-3 md:size-4" />
  //                 View Details
  //               </Button>
  //               <Button variant="ghost" className="w-full justify-start gap-2 text-xs font-medium md:gap-3 md:text-sm" size="sm">
  //                 <Edit className="size-3 md:size-4" />
  //                 Edit Record
  //               </Button>
  //               <Button
  //                 variant="ghost"
  //                 className="text-destructive hover:text-destructive hover:bg-destructive/10 w-full justify-start gap-2 text-xs font-medium md:gap-3 md:text-sm"
  //                 size="sm"
  //               >
  //                 <Trash2 className="size-3 md:size-4" />
  //                 Delete
  //               </Button>
  //             </div>
  //           </PopoverContent>
  //         </Popover>
  //       </div>
  //     );
  //   }
  // }
];
