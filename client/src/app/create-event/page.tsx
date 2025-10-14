'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, FileText, Users, Building2, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const generateTimeOptions = () => {
  const times: string[] = [];
  const periods = ['AM', 'PM'];

  periods.forEach((period) => {
    for (let hour = 12; hour <= 12; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00 ${period}`);
      times.push(`${hour.toString().padStart(2, '0')}:30 ${period}`);
    }
    for (let hour = 1; hour < 12; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00 ${period}`);
      times.push(`${hour.toString().padStart(2, '0')}:30 ${period}`);
    }
  });

  return times;
};

const CreateEventPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [checkOutRequired, setCheckOutRequired] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endDate, setEndDate] = useState<Date>();
  const [endTime, setEndTime] = useState('05:00 PM');

  const timeOptions = generateTimeOptions();

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setCapacity(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[v0] Form submitted:', {
      title,
      description,
      department,
      location,
      capacity,
      allDay,
      checkOutRequired,
      startDate,
      startTime,
      endDate,
      endTime
    });
  };
  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-foreground text-4xl font-bold tracking-tight">Create New Event</h1>
            <p className="text-muted-foreground text-base">Fill in the details below to create your event</p>
          </div>

          {/* Event Details Section */}
          <div className="border-border bg-card space-y-6 rounded-2xl border-2 p-8 shadow-lg">
            <div className="border-border flex items-center gap-3 border-b pb-4">
              <div className="bg-primary/15 flex h-10 w-10 items-center justify-center rounded-xl">
                <FileText className="text-primary h-5 w-5" />
              </div>
              <h2 className="text-foreground text-xl font-bold">Event Details</h2>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-3">
                <Label htmlFor="title" className="text-foreground text-base font-bold">
                  Event Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-border bg-background focus-visible:border-primary h-12 border-2 text-base font-medium shadow-sm transition-all"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-foreground text-base font-bold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-border bg-background focus-visible:border-primary min-h-32 resize-y border-2 text-base font-medium shadow-sm transition-all"
                />
                <p className="text-muted-foreground text-sm">Provide details about what attendees can expect</p>
              </div>

              {/* Department */}
              <div className="space-y-3">
                <Label htmlFor="department" className="text-foreground text-base font-bold">
                  Department <span className="text-destructive">*</span>
                </Label>
                <Select value={department} onValueChange={setDepartment} required>
                  <SelectTrigger
                    id="department"
                    className="border-border bg-background hover:border-primary/50 h-12 w-full border-2 text-base font-medium shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="text-muted-foreground h-4 w-4" />
                      <SelectValue placeholder="Select department" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ccs">College of Computer Studies</SelectItem>
                    <SelectItem value="coe">College of Engineering</SelectItem>
                    <SelectItem value="cba">College of Business Administration</SelectItem>
                    <SelectItem value="cas">College of Arts and Sciences</SelectItem>
                    <SelectItem value="ced">College of Education</SelectItem>
                    <SelectItem value="cte">College of Teacher Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="border-border bg-card space-y-6 rounded-2xl border-2 p-8 shadow-lg">
            <div className="border-border flex items-center gap-3 border-b pb-4">
              <div className="bg-primary/15 flex h-10 w-10 items-center justify-center rounded-xl">
                <MapPin className="text-primary h-5 w-5" />
              </div>
              <h2 className="text-foreground text-xl font-bold">Location</h2>
            </div>

            <div className="space-y-3">
              <Label htmlFor="location" className="text-foreground text-base font-bold">
                Event Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                placeholder="Enter venue or virtual link"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-border bg-background focus-visible:border-primary h-12 border-2 text-base font-medium shadow-sm transition-all"
                required
              />
              <p className="text-muted-foreground text-sm">Physical address or online meeting link</p>
            </div>
          </div>

          {/* Date & Time Section */}
          <div className="border-border bg-card space-y-6 rounded-2xl border-2 p-8 shadow-lg">
            <div className="border-border flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/15 flex h-10 w-10 items-center justify-center rounded-xl">
                  <Clock className="text-primary h-5 w-5" />
                </div>
                <h2 className="text-foreground text-xl font-bold">Date & Time</h2>
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="all-day" className="text-foreground cursor-pointer text-base font-semibold">
                  All Day Event
                </Label>
                <Switch id="all-day" checked={allDay} onCheckedChange={setAllDay} className="data-[state=checked]:bg-primary" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Start Date & Time */}
              <div className="space-y-3">
                <Label className="text-foreground text-base font-bold">
                  Start Date & Time <span className="text-destructive">*</span>
                </Label>
                <div className="space-y-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-border bg-background hover:bg-muted hover:border-primary/50 h-12 w-full justify-start border-2 text-left font-semibold shadow-sm transition-all"
                      >
                        <CalendarIcon className="text-primary mr-2 h-5 w-5" />
                        {startDate ? format(startDate, 'MMM dd, yyyy') : 'Pick date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  {!allDay && (
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger className="border-border bg-background hover:border-primary/50 h-12 w-full border-2 text-base font-bold shadow-sm transition-all">
                        <div className="flex items-center gap-2">
                          <Clock className="text-primary h-4 w-4" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time} className="font-semibold">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* End Date & Time */}
              <div className="space-y-3">
                <Label className="text-foreground text-base font-bold">
                  End Date & Time <span className="text-destructive">*</span>
                </Label>
                <div className="space-y-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-border bg-background hover:bg-muted hover:border-primary/50 h-12 w-full justify-start border-2 text-left font-semibold shadow-sm transition-all"
                      >
                        <CalendarIcon className="text-primary mr-2 h-5 w-5" />
                        {endDate ? format(endDate, 'MMM dd, yyyy') : 'Pick date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  {!allDay && (
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger className="border-border bg-background hover:border-primary/50 h-12 w-full border-2 text-base font-bold shadow-sm transition-all">
                        <div className="flex items-center gap-2">
                          <Clock className="text-primary h-4 w-4" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time} className="font-semibold">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Capacity & Settings Section */}
          <div className="border-border bg-card space-y-6 rounded-2xl border-2 p-8 shadow-lg">
            <div className="border-border flex items-center gap-3 border-b pb-4">
              <div className="bg-primary/15 flex h-10 w-10 items-center justify-center rounded-xl">
                <Users className="text-primary h-5 w-5" />
              </div>
              <h2 className="text-foreground text-xl font-bold">Capacity & Settings</h2>
            </div>

            <div className="space-y-6">
              {/* Capacity */}
              <div className="space-y-3">
                <Label htmlFor="capacity" className="text-foreground text-base font-bold">
                  Maximum Capacity <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="capacity"
                  placeholder="Enter maximum number of attendees"
                  value={capacity}
                  onChange={handleCapacityChange}
                  className="border-border bg-background focus-visible:border-primary h-12 border-2 text-base font-medium shadow-sm transition-all"
                  required
                />
                <p className="text-muted-foreground text-sm">Numbers only - maximum attendees allowed</p>
              </div>

              {/* Check-out Required */}
              <div className="border-border bg-background hover:border-primary/30 flex items-center justify-between rounded-xl border-2 p-6 shadow-sm transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/15 flex h-12 w-12 items-center justify-center rounded-xl">
                    <CheckCircle2 className="text-primary h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="check-out" className="text-foreground cursor-pointer text-base font-bold">
                      Require Check-out
                    </Label>
                    <p className="text-muted-foreground text-sm">Attendees must check out when leaving</p>
                  </div>
                </div>
                <Switch id="check-out" checked={checkOutRequired} onCheckedChange={setCheckOutRequired} className="data-[state=checked]:bg-primary scale-125" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="border-border hover:bg-muted h-14 flex-1 border-2 bg-transparent text-base font-bold shadow-sm transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 flex-1 text-base font-bold shadow-lg transition-all hover:shadow-xl"
            >
              Create Event
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateEventPage;
