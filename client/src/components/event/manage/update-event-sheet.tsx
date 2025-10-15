'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { MapPin, FileText, Users, Building2, CalendarIcon } from 'lucide-react';
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
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
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
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
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
            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
              <FileText className="text-muted-foreground h-4 w-4" />
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
          <div className="border-border bg-muted/30 space-y-4 rounded-lg border p-4">
            <div className="mb-2 flex items-center gap-2">
              <CalendarIcon className="text-muted-foreground h-4 w-4" />
              <Label className="text-sm font-medium">Date & Time</Label>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-10 w-full justify-start bg-transparent text-left font-normal">
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
                  <Label className="text-muted-foreground text-xs">Start Time</Label>
                  <Select value={formData.startTime} onValueChange={(value) => setFormData({ ...formData, startTime: value })}>
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
                  <Label className="text-muted-foreground text-xs">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-10 w-full justify-start bg-transparent text-left font-normal">
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
                  <Label className="text-muted-foreground text-xs">End Time</Label>
                  <Select value={formData.endTime} onValueChange={(value) => setFormData({ ...formData, endTime: value })}>
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
            <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="text-muted-foreground h-4 w-4" />
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
            <Label htmlFor="department" className="flex items-center gap-2 text-sm font-medium">
              <Building2 className="text-muted-foreground h-4 w-4" />
              Department
            </Label>
            <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
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
          <div className="border-border bg-muted/30 space-y-3 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Users className="text-muted-foreground h-4 w-4" />
                Capacity
              </Label>
              <button type="button" onClick={() => setIsUnlimitedCapacity(!isUnlimitedCapacity)} className="text-primary text-sm font-medium hover:underline">
                {isUnlimitedCapacity ? 'Set Limit' : 'Make Unlimited'}
              </button>
            </div>
            {!isUnlimitedCapacity && (
              <Input
                type="number"
                value={formData.capacity === 'unlimited' ? '' : formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) || 0 })}
                className="h-10"
                placeholder="Enter maximum capacity"
                min="1"
              />
            )}
          </div>

          {/* Check Out Required */}
          <div className="border-border bg-muted/30 flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="checkout" className="text-sm font-medium">
              Check Out Required
            </Label>
            <Switch id="checkout" checked={formData.checkOutRequired} onCheckedChange={(checked) => setFormData({ ...formData, checkOutRequired: checked })} />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="h-11 flex-1">
              Cancel
            </Button>
            <Button type="submit" className="h-11 flex-1 font-semibold">
              Save Changes
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
