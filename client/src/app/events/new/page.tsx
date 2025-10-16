'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { MapPin, FileText, Users, ChevronDown, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { DepartmentAndPrograms } from '@/lib/department-and-program';
import { generateTimeOptions, getDefaultStartTime, addOneHour } from '@/lib/utils';

export function CreateEventForm() {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [requireApproval, setRequireApproval] = useState(false);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date(2024, 9, 14));
  const [startTime, setStartTime] = useState(format(new Date(), 'hh:mm a'));
  const [endDate, setEndDate] = useState<Date>(new Date(2024, 9, 14));
  const [endTime, setEndTime] = useState('12:30');
  const [capacity, setCapacity] = useState('');
  const [isUnlimitedCapacity, setIsUnlimitedCapacity] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  const timeOptions = generateTimeOptions();

  console.log(startTime);

  useEffect(() => {
    const defaultStart = getDefaultStartTime();
    const defaultEnd = addOneHour(defaultStart);
    setStartTime(defaultStart);
    setEndTime(defaultEnd);
  }, []);

  const departments = Object.keys(DepartmentAndPrograms);

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {/* Calendar and Privacy Selectors */}
          <div className="mb-12 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/events">
                <ChevronLeft className="text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer rounded-full transition-colors" />
              </Link>
              <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">Create Event</h1>
            </div>
          </div>

          {/* Event Name */}
          <div className="space-y-2">
            <textarea
              placeholder="Event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="text-foreground placeholder:text-muted-foreground/50 min-h-20 w-full max-w-2xl resize-none border-0 bg-neutral-100 !text-6xl font-bold shadow-none focus:outline-none focus-visible:ring-transparent"
              rows={1}
              onInput={(e) => {
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
              }}
            />
          </div>

          {/* Date and Time */}
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-[80px] items-center gap-3">
                  <Label className="text-foreground text-md font-medium">Start</Label>
                </div>
                <div className="flex flex-1 items-center justify-end gap-1">
                  {/* Date Picker */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-background text-foreground hover:bg-muted hover:border-primary/50 rounded-l-2 h-9 w-[155px] justify-start rounded-r-none text-left font-medium shadow-none"
                      >
                        {format(startDate, 'EEE, MMMM d')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={(date) => date && setStartDate(date)} />
                    </PopoverContent>
                  </Popover>

                  {/* Time Picker */}
                  <Select value={startTime} onValueChange={setStartTime}>
                    <SelectTrigger className="hover:bg-muted hover:border-primary/50 rounded-r-2 h-12 w-[90px] rounded-l-none font-medium [&>svg]:hidden">
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
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-[80px] items-center gap-3">
                  <Label className="text-foreground text-md font-medium">End</Label>
                </div>
                <div className="flex flex-1 items-center justify-end gap-1">
                  {/* Date Picker */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-background text-foreground hover:bg-muted hover:border-primary/50 rounded-l-2 h-9 w-[155px] justify-start rounded-r-none text-left font-medium shadow-none"
                      >
                        {format(endDate, 'EEE, MMMM d')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={endDate} onSelect={(date) => date && setEndDate(date)} initialFocus />
                    </PopoverContent>
                  </Popover>

                  {/* Time Picker */}
                  <Select value={endTime} onValueChange={setEndTime}>
                    <SelectTrigger className="hover:bg-muted hover:border-primary/50 rounded-r-2 h-12 w-[90px] rounded-l-none font-medium [&>svg]:hidden">
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
          <div className="bg-card space-y-3 rounded-xl border-1 p-6">
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
              className="focus-visible:border-primary focus-visible:ring-primary/20 font-normal transition-colors"
            />
          </div>

          {/* Description */}
          <div className="bg-card space-y-3 rounded-xl border-1 p-6">
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
              className="focus-visible:border-primary focus-visible:ring-primary/20 min-h-32 font-normal transition-colors"
            />
          </div>

          {/* Department */}
          <div className="bg-card space-y-3 rounded-xl border-1 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <FileText className="text-primary h-5 w-5" />
                </div>
                <Label className="text-foreground text-sm font-medium">Department</Label>
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
              <SelectTrigger
                id="department"
                className="border-border hover:border-foreground/20 bg-background h-12 w-full text-left text-sm break-words !whitespace-normal transition-colors [&>span]:line-clamp-2 [&>span]:text-left [&>span]:leading-normal [&>span]:break-words [&>span]:whitespace-normal"
              >
                <SelectValue placeholder="Select your department" />
              </SelectTrigger>
              <SelectContent className="max-w-[calc(100vw-2rem)]">
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

          {/* Event Options */}
          <div className="mt-10 space-y-3">
            <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">Event Options</h3>

            {/* Capacity */}
            <div className="bg-card space-y-3 rounded-xl border-1 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <Users className="text-primary h-5 w-5" />
                  </div>
                  <span className="text-foreground text-sm font-medium">Capacity</span>
                </div>
                <button
                  onClick={() => setIsUnlimitedCapacity(!isUnlimitedCapacity)}
                  className="text-foreground flex items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-neutral-100/80"
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
                  className="focus-visible:border-primary focus-visible:ring-primary/20 font-normal transition-colors"
                  min="1"
                />
              )}
            </div>

            {/* Require Approval */}
            <div className="bg-card space-y-3 rounded-xl border-1 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <Users className="text-primary h-5 w-5" />
                  </div>
                  <span className="text-foreground text-sm font-medium">Check Out Required</span>
                </div>
                <Switch checked={requireApproval} onCheckedChange={setRequireApproval} />
              </div>
            </div>
          </div>

          {/* Create Event Button */}
          <Link href="/events">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-10 w-full rounded-xl py-7 text-lg font-semibold shadow-lg transition-all hover:shadow-xl">
              Create Event
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
