"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

interface AddOrganizerDialogProps {
  onAddOrganizer: (organizer: {
    studentId: string
    name: string
    department: string
    program: string
    email: string
  }) => void
}

export function AddOrganizerDialog({ onAddOrganizer }: AddOrganizerDialogProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    if (!email) {
      return
    }

    // Validate email format
    if (!email.endsWith("@umindanao.edu.ph")) {
      alert("Email must be a valid UMindanao email address (@umindanao.edu.ph)")
      return
    }

    // Pass minimal data - API only needs email
    onAddOrganizer({
      studentId: "",
      name: "",
      department: "",
      program: "",
      email: email
    })

    // Reset form and close dialog
    setEmail("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-lg font-medium">
          <Plus className="h-4 w-4" />
          Add Organizer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Organizer</DialogTitle>
            <DialogDescription>
              Enter the UMindanao email address of the person you want to add as an organizer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">UMindanao Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., j.delacruz.123456@umindanao.edu.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                The organizer will be looked up automatically from the system.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Organizer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
