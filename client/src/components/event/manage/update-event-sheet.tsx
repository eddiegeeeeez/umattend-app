"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MapPin, FileText, Users, Building2, CalendarIcon } from "lucide-react"

interface Event {
  id: string
  name: string
  description: string
  location: string
  department: string
  startDate: Date
  endDate: Date
  startTime: string
  endTime: string
  capacity: number | "unlimited"
  attendees: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  checkOutRequired: boolean
}

interface UpdateEventSheetProps {
  event: Event
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (event: Event) => void
}

const departments = [
  "College of Engineering",
  "College of Business Administration",
  "College of Arts and Sciences",
  "College of Education",
  "College of Information Technology",
  "College of Nursing",
  "College of Medicine",
]

const generateTimeOptions = () => {
  const times: string[] = []
  const periods = ["AM", "PM"]

  periods.forEach((period) => {
    for (let hour = 12; hour <= 12; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00 ${period}`)
      times.push(`${hour.toString().padStart(2, "0")}:30 ${period}`)
    }
    for (let hour = 1; hour < 12; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00 ${period}`)
      times.push(`${hour.toString().padStart(2, "0")}:30 ${period}`)
    }
  })

  return times
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function UpdateEventSheet({ event, open, onOpenChange, onUpdate }: UpdateEventSheetProps) {
  const [formData, setFormData] = useState(event)
  const [isUnlimitedCapacity, setIsUnlimitedCapacity] = useState(event.capacity === "unlimited")

  const timeOptions = generateTimeOptions()

  useEffect(() => {
    setFormData(event)
    setIsUnlimitedCapacity(event.capacity === "unlimited")
  }, [event])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({
      ...formData,
      capacity: isUnlimitedCapacity ? "unlimited" : formData.capacity,
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-semibold">Update Event</SheetTitle>
          <SheetDescription>Make changes to your event details. Click save when you&apos;re done.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Event Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-11"
              placeholder="Enter event name"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-24 resize-none"
              placeholder="Add event description..."
            />
          </div>

          {/* Date and Time */}
          <div className="space-y-4 rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Date & Time</Label>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal h-10 bg-transparent"
                      >
                        {formatDate(formData.startDate)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Start Time</Label>
                  <Select
                    value={formData.startTime}
                    onValueChange={(value) => setFormData({ ...formData, startTime: value })}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal h-10 bg-transparent"
                      >
                        {formatDate(formData.endDate)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => date && setFormData({ ...formData, endDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">End Time</Label>
                  <Select
                    value={formData.endTime}
                    onValueChange={(value) => setFormData({ ...formData, endTime: value })}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="h-11"
              placeholder="Enter location or virtual link"
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Department
            </Label>
            <Select
              value={formData.department}
              onValueChange={(value) => setFormData({ ...formData, department: value })}
            >
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Capacity */}
          <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                Capacity
              </Label>
              <button
                type="button"
                onClick={() => setIsUnlimitedCapacity(!isUnlimitedCapacity)}
                className="text-sm font-medium text-primary hover:underline"
              >
                {isUnlimitedCapacity ? "Set Limit" : "Make Unlimited"}
              </button>
            </div>
            {!isUnlimitedCapacity && (
              <Input
                type="number"
                value={formData.capacity === "unlimited" ? "" : formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) || 0 })}
                className="h-10"
                placeholder="Enter maximum capacity"
                min="1"
              />
            )}
          </div>

          {/* Check Out Required */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
            <Label htmlFor="checkout" className="text-sm font-medium">
              Check Out Required
            </Label>
            <Switch
              id="checkout"
              checked={formData.checkOutRequired}
              onCheckedChange={(checked) => setFormData({ ...formData, checkOutRequired: checked })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1 h-11">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 h-11 font-semibold">
              Save Changes
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
