"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CalendarIcon,
  MapPin,
  FileText,
  Ticket,
  Users,
  Sparkles,
  Search,
  Bell,
  User,
  ChevronDown,
  X,
} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export function CreateEventForm() {
  const [requireApproval, setRequireApproval] = useState(false)
  const [eventName, setEventName] = useState("")
  const [description, setDescription] = useState("")
  const [showDescription, setShowDescription] = useState(false)
  const [location, setLocation] = useState("")
  const [showLocation, setShowLocation] = useState(false)
  const [startDate, setStartDate] = useState<Date>(new Date(2024, 9, 14))
  const [startTime, setStartTime] = useState("11:30")
  const [endDate, setEndDate] = useState<Date>(new Date(2024, 9, 14))
  const [endTime, setEndTime] = useState("12:30")
  const [capacity, setCapacity] = useState("")
  const [isUnlimitedCapacity, setIsUnlimitedCapacity] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Sparkles className="h-6 w-6 text-foreground" />
              <nav className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80">
                  <CalendarIcon className="h-4 w-4" />
                  Events
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  Calendars
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                  <Sparkles className="h-4 w-4" />
                  Discover
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">11:15 AM GMT+8</span>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Create Event</Button>
              <button className="text-muted-foreground hover:text-foreground">
                <Search className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Calendar and Privacy Selectors */}
          <div className="flex items-center justify-between">
            <Select defaultValue="personal">
              <SelectTrigger className="w-[200px] border border-border bg-card">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal Calendar</SelectItem>
                <SelectItem value="work">Work Calendar</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400">
                <span className="text-xs font-bold text-white">Q</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500">
                <span className="text-xs font-bold text-white">C</span>
              </div>
            </div>
          </div>

          <Select defaultValue="public">
            <SelectTrigger className="w-[200px] border border-border bg-card">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>

          {/* Event Name */}
          <div className="border-b-2 border-border pb-2">
            <Input
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="border-0 bg-transparent text-4xl font-light text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
            />
          </div>

          {/* Date and Time */}
          <div className="space-y-3 rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center">
                  <div className="h-2 w-2 rounded-full border-2 border-foreground" />
                </div>
                <Label className="text-sm font-medium text-foreground">Start</Label>
              </div>
              <div className="flex items-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-9 justify-start border border-border bg-muted text-left font-normal text-foreground hover:bg-muted/80"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(startDate, "EEE, MMM d")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-9 w-[120px] border border-border bg-muted text-foreground hover:bg-muted/80"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center">
                  <div className="h-2 w-2 rounded-full border-2 border-foreground" />
                </div>
                <Label className="text-sm font-medium text-foreground">End</Label>
              </div>
              <div className="flex items-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-9 justify-start border border-border bg-muted text-left font-normal text-foreground hover:bg-muted/80"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(endDate, "EEE, MMM d")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => date && setEndDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="h-9 w-[120px] border border-border bg-muted text-foreground hover:bg-muted/80"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          {!showLocation ? (
            <button
              onClick={() => setShowLocation(true)}
              className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-4 text-left shadow-sm hover:bg-card/80 hover:shadow"
            >
              <MapPin className="h-5 w-5 text-foreground" />
              <div>
                <div className="text-sm font-medium text-foreground">Add Event Location</div>
                <div className="text-xs text-muted-foreground">Offline location or virtual link</div>
              </div>
            </button>
          ) : (
            <div className="space-y-2 rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-foreground" />
                  <Label className="text-sm font-medium text-foreground">Event Location</Label>
                </div>
                <button
                  onClick={() => {
                    setShowLocation(false)
                    setLocation("")
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Input
                placeholder="Enter location or virtual link"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-border bg-background"
              />
            </div>
          )}

          {/* Description */}
          {!showDescription ? (
            <button
              onClick={() => setShowDescription(true)}
              className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-4 text-left shadow-sm hover:bg-card/80 hover:shadow"
            >
              <FileText className="h-5 w-5 text-foreground" />
              <div className="text-sm font-medium text-foreground">Add Description</div>
            </button>
          ) : (
            <div className="space-y-2 rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-foreground" />
                  <Label className="text-sm font-medium text-foreground">Description</Label>
                </div>
                <button
                  onClick={() => {
                    setShowDescription(false)
                    setDescription("")
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Textarea
                placeholder="Add event description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] border-border bg-background"
              />
            </div>
          )}

          {/* Event Options */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Event Options</h3>

            {/* Tickets */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Ticket className="h-5 w-5 text-foreground" />
                <span className="text-sm font-medium text-foreground">Tickets</span>
              </div>
              <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                Free
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Require Approval */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-foreground" />
                <span className="text-sm font-medium text-foreground">Require Approval</span>
              </div>
              <Switch checked={requireApproval} onCheckedChange={setRequireApproval} />
            </div>

            {/* Capacity */}
            <div className="space-y-2 rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-foreground" />
                  <span className="text-sm font-medium text-foreground">Capacity</span>
                </div>
                <button
                  onClick={() => setIsUnlimitedCapacity(!isUnlimitedCapacity)}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {isUnlimitedCapacity ? "Unlimited" : "Limited"}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              {!isUnlimitedCapacity && (
                <Input
                  type="number"
                  placeholder="Enter capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="border-border bg-background"
                  min="1"
                />
              )}
            </div>
          </div>

          {/* Create Event Button */}
          <Button className="w-full bg-primary py-6 text-base font-semibold text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg">
            Create Event
          </Button>
        </div>
      </main>
    </div>
  )
}
