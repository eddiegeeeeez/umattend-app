'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { MapPin, FileText, Users, Building2, CalendarIcon, ChevronsLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  department: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  capacity: number | 'unlimited';
  attendees: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  checkOutRequired: boolean;
}

interface UpdateEventSheetProps {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (event: Event) => void;
}

const departments = [
  'College of Engineering',
  'College of Business Administration',
  'College of Arts and Sciences',
  'College of Education',
  'College of Information Technology',
  'College of Nursing',
  'College of Medicine'
];

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

const formatDate = (date: Date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export function UpdateEventSheet({ event, open, onOpenChange, onUpdate }: UpdateEventSheetProps) {
  const [formData, setFormData] = useState(event);
  const [isUnlimitedCapacity, setIsUnlimitedCapacity] = useState(event.capacity === 'unlimited');

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    setFormData(event);
    setIsUnlimitedCapacity(event.capacity === 'unlimited');
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...formData,
      capacity: isUnlimitedCapacity ? 'unlimited' : formData.capacity
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl" hideClose={true}>
        <SheetHeader className="border-border border-b">
          <div className="flex items-center justify-between space-x-3">
            <Button className="hover:text-primary !h-8 cursor-pointer !py-1 hover:bg-stone-800" onClick={() => onOpenChange(false)}>
              <ChevronsLeft />
            </Button>
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
          {/* Header Title and Description */}
          <div className="space-y-2">
            <SheetTitle className="text-3xl leading-tight font-bold tracking-tight">Update Event</SheetTitle>
            <SheetDescription className="text-base">Make changes to your event details. Click save when you&apos;re done.</SheetDescription>
          </div>

          {/* Event Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              Event Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-11 shadow-sm"
              placeholder="Enter event name"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold">
              <FileText className="text-muted-foreground h-4 w-4" />
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-28 resize-none shadow-sm"
              placeholder="Add event description..."
            />
          </div>

          {/* Date and Time */}
          <div className="bg-background/50 ring-border space-y-4 rounded-lg p-5 shadow-sm ring-1 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-primary/70 h-5 w-5" />
              <Label className="text-base font-semibold">Date & Time</Label>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs font-medium">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="bg-background h-11 w-full justify-start text-left font-medium shadow-sm">
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
                  <Label className="text-muted-foreground text-xs font-medium">Start Time</Label>
                  <Select value={formData.startTime} onValueChange={(value) => setFormData({ ...formData, startTime: value })}>
                    <SelectTrigger className="h-11 shadow-sm">
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
                  <Label className="text-muted-foreground text-xs font-medium">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="bg-background h-11 w-full justify-start text-left font-medium shadow-sm">
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
                  <Label className="text-muted-foreground text-xs font-medium">End Time</Label>
                  <Select value={formData.endTime} onValueChange={(value) => setFormData({ ...formData, endTime: value })}>
                    <SelectTrigger className="h-11 shadow-sm">
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
            <Label htmlFor="location" className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="text-primary/70 h-4 w-4" />
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="h-11 shadow-sm"
              placeholder="Enter location or virtual link"
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department" className="flex items-center gap-2 text-sm font-semibold">
              <Building2 className="text-primary/70 h-4 w-4" />
              Department
            </Label>
            <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
              <SelectTrigger className="h-11 shadow-sm">
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
          <div className="bg-background/50 ring-border space-y-3 rounded-lg p-5 shadow-sm ring-1 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-base font-semibold">
                <Users className="text-primary/70 h-5 w-5" />
                Capacity
              </Label>
              <button
                type="button"
                onClick={() => setIsUnlimitedCapacity(!isUnlimitedCapacity)}
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors hover:underline"
              >
                {isUnlimitedCapacity ? 'Set Limit' : 'Make Unlimited'}
              </button>
            </div>
            {!isUnlimitedCapacity && (
              <Input
                type="number"
                value={formData.capacity === 'unlimited' ? '' : formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) || 0 })}
                className="h-11 shadow-sm"
                placeholder="Enter maximum capacity"
                min="1"
              />
            )}
          </div>

          {/* Check Out Required */}
          <div className="bg-background/50 ring-border flex items-center justify-between rounded-lg p-5 shadow-sm ring-1 backdrop-blur-sm">
            <Label htmlFor="checkout" className="text-base font-semibold">
              Check Out Required
            </Label>
            <Switch id="checkout" checked={formData.checkOutRequired} onCheckedChange={(checked) => setFormData({ ...formData, checkOutRequired: checked })} />
          </div>

          {/* Action Buttons */}
          <div className="border-border flex gap-3 border-t pt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="h-11 flex-1 shadow-sm transition-shadow hover:shadow">
              Cancel
            </Button>
            <Button type="submit" className="h-11 flex-1 font-semibold shadow-sm transition-shadow hover:shadow">
              Save Changes
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
