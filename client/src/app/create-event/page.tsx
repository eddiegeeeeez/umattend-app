'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, FileText, Users, ChevronDown, ChevronLeft, Building2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DepartmentAndPrograms } from '@/lib/department-and-program';

const CreateEventPage = () => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date(2024, 9, 14));
  const [startTime, setStartTime] = useState('11:30');
  const [endDate, setEndDate] = useState<Date>(new Date(2024, 9, 14));
  const [endTime, setEndTime] = useState('12:30');
  const [capacity, setCapacity] = useState('');
  const [isUnlimitedCapacity, setIsUnlimitedCapacity] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const departments = Object.keys(DepartmentAndPrograms);

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };

  return (
    <div className="min-h-screen">
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
              className="border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/30 focus-visible:border-primary h-14 border-2 text-2xl font-medium shadow-sm transition-colors"
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
                    className="border-border bg-background text-foreground hover:border-primary/50 focus-visible:ring-primary/30 focus-visible:border-primary h-10 w-[130px] border-2 font-normal shadow-sm transition-colors"
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
                        className="border-border bg-background text-foreground focus-visible:ring-primary/30 focus-visible:border-primary hover:bg-muted hover:border-primary/50 h-10 min-w-[140px] justify-start border-2 text-left font-normal shadow-sm transition-colors"
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
                    className="border-border bg-background text-foreground focus-visible:ring-primary/30 focus-visible:border-primary hover:border-primary/50 h-10 w-[130px] border-2 font-normal shadow-sm transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-border bg-card space-y-3 rounded-xl border-2 p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <FileText className="text-primary h-5 w-5" />
                </div>
                <Label className="text-foreground text-sm font-medium">Description</Label>
              </div>
            </div>
            <Textarea
              placeholder="Add event description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-border bg-background focus-visible:ring-primary/30 focus-visible:border-primary min-h-[120px] resize-none border-2 font-normal shadow-sm transition-colors"
            />
          </div>

          {/* Department */}
          <div className="border-border bg-card space-y-3 rounded-xl border-2 p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Building2 className="text-primary h-5 w-5" />
                </div>
                <Label className="text-foreground text-sm font-medium">
                  {' '}
                  Department
                  <span className="text-destructive">*</span>
                </Label>
              </div>
            </div>
            <div className="space-y-2.5">
              <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                <SelectTrigger
                  id="department"
                  className="border-border hover:border-foreground/20 bg-background h-12 w-full text-left text-sm break-words !whitespace-normal transition-colors [&>span]:line-clamp-2 [&>span]:text-left [&>span]:leading-normal [&>span]:break-words [&>span]:whitespace-normal"
                >
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent className="max-w-[calc(100vw-2rem)] md:max-w-full">
                  {departments.map((dept) => (
                    <SelectItem
                      key={dept}
                      value={dept}
                      className="h-auto min-h-fit cursor-pointer !items-start py-3 text-sm leading-normal break-words !whitespace-normal"
                    >
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div className="border-border bg-card space-y-3 rounded-xl border-2 p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <MapPin className="text-primary h-5 w-5" />
                </div>
                <Label className="text-foreground text-sm font-medium">Event Location</Label>
              </div>
            </div>
            <Input
              placeholder="Enter location or virtual link"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-border bg-background focus-visible:ring-primary/30 focus-visible:border-primary border-2 font-normal shadow-sm transition-colors"
            />
          </div>

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
                className="border-border bg-background focus-visible:ring-primary/30 focus-visible:border-primary border-2 font-medium shadow-sm transition-colors"
                min="1"
              />
            )}
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
};

export default CreateEventPage;
