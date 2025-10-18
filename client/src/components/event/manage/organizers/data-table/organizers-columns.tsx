"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowUpDown, MoreVertical, Eye, Trash2 } from "lucide-react"
import { RemoveOrganizerDialog } from "@/components/event/manage/organizers/remove-organizer-dialog"

export type OrganizerRecord = {
  id: string
  name: string
  department: string
  program: string
  email: string
  addedBy: string
  addedAt: string
  isCreator: boolean
}

interface ActionsColumnProps {
  record: OrganizerRecord
  onRemoveOrganizer?: (email: string) => void
}

function ActionsColumn({ record, onRemoveOrganizer }: ActionsColumnProps) {
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)

  const handleConfirmRemove = () => {
    onRemoveOrganizer?.(record.email)
  }

  return (
    <>
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
              {!record.isCreator && (
                <Button
                  onClick={() => setIsRemoveDialogOpen(true)}
                  variant="ghost"
                  className="justify-start gap-2 md:gap-3 w-full text-destructive hover:text-destructive hover:bg-destructive/10 font-medium text-xs md:text-sm"
                  size="sm"
                >
                  <Trash2 className="size-3 md:size-4" />
                  Remove
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <RemoveOrganizerDialog
        open={isRemoveDialogOpen}
        onOpenChange={setIsRemoveDialogOpen}
        organizerName={record.name}
        organizerEmail={record.email}
        onConfirm={handleConfirmRemove}
      />
    </>
  )
}

export const organizersColumns: ColumnDef<OrganizerRecord>[] = [
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
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-bold text-foreground text-xs md:text-sm"
        >
          Department
          <ArrowUpDown className="ml-1 md:ml-2 size-3 md:size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground font-medium text-xs md:text-sm">{row.getValue("department")}</div>
    ),
  },
  {
    accessorKey: "program",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-bold text-foreground text-xs md:text-sm"
        >
          Program
          <ArrowUpDown className="ml-1 md:ml-2 size-3 md:size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground font-medium text-xs md:text-sm">{row.getValue("program")}</div>
    ),
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
          UMindanao Email
          <ArrowUpDown className="ml-1 md:ml-2 size-3 md:size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground font-medium text-xs md:text-sm">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "addedBy",
    header: () => <div className="font-bold text-foreground text-xs md:text-sm">Added By</div>,
    cell: ({ row }) => (
      <div className="text-muted-foreground font-medium text-xs md:text-sm">{row.getValue("addedBy")}</div>
    ),
  },
  {
    accessorKey: "addedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-bold text-foreground text-xs md:text-sm"
        >
          Added At
          <ArrowUpDown className="ml-1 md:ml-2 size-3 md:size-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium text-foreground text-xs md:text-sm">{row.getValue("addedAt")}</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-center font-bold text-foreground text-xs md:text-sm">Actions</div>,
    cell: ({ row, table }) => {
      const record = row.original
      const meta = table.options.meta as { onRemoveOrganizer?: (email: string) => void }

      return <ActionsColumn record={record} onRemoveOrganizer={meta?.onRemoveOrganizer} />
    },
  },
]
