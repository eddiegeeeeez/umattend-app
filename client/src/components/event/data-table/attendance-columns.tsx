"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowUpDown, MoreVertical, Eye, Edit, Trash2 } from "lucide-react"

export type AttendanceRecord = {
  id: string
  name: string
  email: string
  checkInAt: string
  checkInBy: string
  checkOutAt: string
  checkOutBy: string
}

export const columns: ColumnDef<AttendanceRecord>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-bold text-foreground text-xs md:text-sm"
        >
          Student ID
          <ArrowUpDown className="ml-1 md:ml-2 size-3 md:size-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-semibold text-foreground text-xs md:text-sm">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-bold text-foreground text-xs md:text-sm"
        >
          Name
          <ArrowUpDown className="ml-1 md:ml-2 size-3 md:size-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium text-foreground text-xs md:text-sm">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-bold text-foreground text-xs md:text-sm"
        >
          Umindanao Email
          <ArrowUpDown className="ml-1 md:ml-2 size-3 md:size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground font-medium text-xs md:text-sm">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "checkInAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-bold text-foreground text-xs md:text-sm"
        >
          Check in at
          <ArrowUpDown className="ml-1 md:ml-2 size-3 md:size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-medium text-foreground text-xs md:text-sm">{row.getValue("checkInAt")}</div>
    ),
  },
  {
    accessorKey: "checkInBy",
    header: () => <div className="font-bold text-foreground text-xs md:text-sm">Check in by</div>,
    cell: ({ row }) => (
      <div className="text-muted-foreground font-medium text-xs md:text-sm">{row.getValue("checkInBy")}</div>
    ),
  },
  {
    accessorKey: "checkOutAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-bold text-foreground text-xs md:text-sm"
        >
          Check out at
          <ArrowUpDown className="ml-1 md:ml-2 size-3 md:size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-medium text-foreground text-xs md:text-sm">{row.getValue("checkOutAt")}</div>
    ),
  },
  {
    accessorKey: "checkOutBy",
    header: () => <div className="font-bold text-foreground text-xs md:text-sm">Check out by</div>,
    cell: ({ row }) => (
      <div className="text-muted-foreground font-medium text-xs md:text-sm">{row.getValue("checkOutBy")}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center font-bold text-foreground text-xs md:text-sm">Actions</div>,
    cell: ({ row }) => {
      const record = row.original

      return (
        <div className="text-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 md:size-9 hover:bg-muted">
                <MoreVertical className="size-4 md:size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 md:w-52 p-2 shadow-lg" align="end">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  className="justify-start gap-2 md:gap-3 w-full font-medium text-xs md:text-sm"
                  size="sm"
                >
                  <Eye className="size-3 md:size-4" />
                  View Details
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start gap-2 md:gap-3 w-full font-medium text-xs md:text-sm"
                  size="sm"
                >
                  <Edit className="size-3 md:size-4" />
                  Edit Record
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start gap-2 md:gap-3 w-full text-destructive hover:text-destructive hover:bg-destructive/10 font-medium text-xs md:text-sm"
                  size="sm"
                >
                  <Trash2 className="size-3 md:size-4" />
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
    },
  },
]
