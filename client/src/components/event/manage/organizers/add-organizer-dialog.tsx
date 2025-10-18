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
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    department: "",
    program: "",
    email: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.studentId || !formData.name || !formData.department || !formData.program || !formData.email) {
      return
    }

    // Validate email format
    if (!formData.email.endsWith("@umindanao.edu.ph")) {
      alert("Email must be a valid UMindanao email address (@umindanao.edu.ph)")
      return
    }

    onAddOrganizer(formData)

    // Reset form and close dialog
    setFormData({
      studentId: "",
      name: "",
      department: "",
      program: "",
      email: "",
    })
    setOpen(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-lg font-medium">
          <Plus className="h-4 w-4" />
          Add Organizer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Organizer</DialogTitle>
            <DialogDescription>
              Add a new organizer to help manage this event. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                placeholder="e.g., 2021-00123"
                value={formData.studentId}
                onChange={(e) => handleChange("studentId", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="e.g., Juan Dela Cruz"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="e.g., College of Engineering"
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="program">Program</Label>
              <Input
                id="program"
                placeholder="e.g., BS Computer Science"
                value={formData.program}
                onChange={(e) => handleChange("program", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">UMindanao Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., jdelacruz@umindanao.edu.ph"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
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
