'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, FileText, Users, ChevronDown, X, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function CreateEventForm() {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [location, setLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date(2024, 9, 14));
  const [startTime, setStartTime] = useState('11:30');
  const [endDate, setEndDate] = useState<Date>(new Date(2024, 9, 14));
  const [endTime, setEndTime] = useState('12:30');
  const [capacity, setCapacity] = useState('');
  const [isUnlimitedCapacity, setIsUnlimitedCapacity] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Calendar and Privacy Selectors */}
          <div className="mb-12 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <ChevronLeft className="text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer rounded-full transition-colors" />
              </Link>
              <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">Create Event</h1>
            </div>

            <Select defaultValue="public">
              <SelectTrigger className="border-border bg-card hover:border-primary/50 w-[180px] border-2 shadow-sm transition-colors">
                <div className="flex items-center gap-2">
                  <Users className="text-muted-foreground h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Event Name */}
          <div className="space-y-2">
            <Label className="text-foreground text-sm font-medium">Event Name</Label>
            <Input
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary h-14 border-2 text-2xl font-medium shadow-sm transition-colors"
            />
          </div>

          {/* Date and Time */}
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">Schedule</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-[80px] items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center">
                    <div className="bg-primary h-3 w-3 rounded-full" />
                  </div>
                  <Label className="text-foreground text-sm font-medium">Start</Label>
                </div>
                <div className="flex flex-1 items-center justify-end gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-border bg-background text-foreground hover:bg-muted hover:border-primary/50 h-10 min-w-[140px] justify-start border-2 text-left font-normal shadow-sm transition-colors"
                      >
                        <CalendarIcon className="text-primary mr-2 h-4 w-4" />
                        {format(startDate, 'EEE, MMM d')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={(date) => date && setStartDate(date)} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border-border bg-background text-foreground hover:border-primary/50 h-10 w-[130px] border-2 font-normal shadow-sm transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-[80px] items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center">
                    <div className="border-foreground h-3 w-3 rounded-full border-2" />
                  </div>
                  <Label className="text-foreground text-sm font-semibold">End</Label>
                </div>
                <div className="flex flex-1 items-center justify-end gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-border bg-background text-foreground hover:bg-muted hover:border-primary/50 h-10 min-w-[140px] justify-start border-2 text-left font-normal shadow-sm transition-colors"
                      >
                        <CalendarIcon className="text-primary mr-2 h-4 w-4" />
                        {format(endDate, 'EEE, MMM d')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={endDate} onSelect={(date) => date && setEndDate(date)} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border-border bg-background text-foreground hover:border-primary/50 h-10 w-[130px] border-2 font-normal shadow-sm transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          {!showLocation ? (
            <button
              onClick={() => setShowLocation(true)}
              className="border-border bg-card hover:bg-muted/50 hover:border-primary/50 flex w-full items-center gap-4 rounded-xl border-2 border-dashed p-6 text-left shadow-sm transition-all"
            >
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <MapPin className="text-primary h-5 w-5" />
              </div>
              <div>
                <div className="text-foreground text-sm font-medium">Add Event Location</div>
                <div className="text-muted-foreground mt-0.5 text-xs">Offline location or virtual link</div>
              </div>
            </button>
          ) : (
            <div className="border-border bg-card space-y-3 rounded-xl border-2 p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <MapPin className="text-primary h-5 w-5" />
                  </div>
                  <Label className="text-foreground text-sm font-medium">Event Location</Label>
                </div>
                <button
                  onClick={() => {
                    setShowLocation(false);
                    setLocation('');
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Input
                placeholder="Enter location or virtual link"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-border bg-background focus-visible:border-primary border-2 font-normal shadow-sm transition-colors"
              />
            </div>
          )}

          {/* Description */}
          {!showDescription ? (
            <button
              onClick={() => setShowDescription(true)}
              className="border-border bg-card hover:bg-muted/50 hover:border-primary/50 flex w-full items-center gap-4 rounded-xl border-2 border-dashed p-6 text-left shadow-sm transition-all"
            >
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <FileText className="text-primary h-5 w-5" />
              </div>
              <div className="text-foreground text-sm font-medium">Add Description</div>
            </button>
          ) : (
            <div className="border-border bg-card space-y-3 rounded-xl border-2 p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <FileText className="text-primary h-5 w-5" />
                  </div>
                  <Label className="text-foreground text-sm font-medium">Description</Label>
                </div>
                <button
                  onClick={() => {
                    setShowDescription(false);
                    setDescription('');
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Textarea
                placeholder="Add event description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-border bg-background focus-visible:border-primary min-h-[120px] resize-none border-2 font-normal shadow-sm transition-colors"
              />
            </div>
          )}

          {/* Event Options */}
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">Event Options</h3>

            {/* Capacity */}
            <div className="border-border bg-card space-y-3 rounded-xl border-2 p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <Users className="text-primary h-5 w-5" />
                  </div>
                  <span className="text-foreground text-sm font-medium">Capacity</span>
                </div>
                <button
                  onClick={() => setIsUnlimitedCapacity(!isUnlimitedCapacity)}
                  className="bg-muted text-foreground hover:bg-muted/80 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-colors"
                >
                  {isUnlimitedCapacity ? 'Unlimited' : 'Limited'}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              {!isUnlimitedCapacity && (
                <Input
                  type="number"
                  placeholder="Enter maximum capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="border-border bg-background focus-visible:border-primary border-2 font-medium shadow-sm transition-colors"
                  min="1"
                />
              )}
            </div>
          </div>

          {/* Create Event Button */}
          <Link href="/dashboard">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-xl py-7 text-lg font-semibold shadow-lg transition-all hover:shadow-xl">
              Create Event
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
