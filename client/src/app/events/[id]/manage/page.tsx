'use client';

import { useState } from 'react';
import { BarChart3, UserCheck } from 'lucide-react';
import EventAttendees from '@/components/event/manage/attendees/event-attendees';
import EventDetails from '@/components/event/manage/details/event-details';
import HeroSection from '@/components/event/manage/hero/hero-section';
import ManageEventSkeleton from '@/components/event/manage/manage-event-skeleton';
import { UpdateEventSheet } from '@/components/event/manage/update-event-sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

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
  status: EventStatus;
  checkOutRequired: boolean;
}

// Mock single event data
const mockEvent: Event = {
  id: '1',
  name: 'Annual Tech Conference 2025',
  description:
    'Join us for the biggest tech conference of the year featuring industry leaders and innovators. This comprehensive event will cover the latest trends in technology, artificial intelligence, cloud computing, and digital transformation.',
  location: 'Main Auditorium, Building A',
  department: 'College of Engineering',
  startDate: new Date('2025-03-15'),
  endDate: new Date('2025-03-15'),
  startTime: '09:00 AM',
  endTime: '05:00 PM',
  capacity: 500,
  attendees: 342,
  status: 'upcoming',
  checkOutRequired: true
};

export default function ManageSingleEventPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<Event>(mockEvent);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useState(() => {
    setTimeout(() => setIsLoading(false), 1000);
  });

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvent(updatedEvent);
    setIsSheetOpen(false);
  };

  if (isLoading) {
    return <ManageEventSkeleton />;
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <HeroSection event={event} setIsSheetOpen={setIsSheetOpen} />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs Section */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="bg-muted text-muted-foreground inline-flex h-11 items-center justify-center rounded-lg p-1">
            <TabsTrigger value="details" className="rounded-md px-4 py-2 text-sm font-medium">
              <BarChart3 className="mr-2 h-4 w-4" />
              Details
            </TabsTrigger>
            {/* <TabsTrigger value="overview" className="rounded-md px-4 py-2 text-sm font-medium">
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger> */}
            <TabsTrigger value="attendees" className="rounded-md px-4 py-2 text-sm font-medium">
              <UserCheck className="mr-2 h-4 w-4" />
              Attendees
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <EventDetails event={event} />
          </TabsContent>

          {/* <TabsContent value="overview" className="space-y-6">
            <EventOverview event={event} />
          </TabsContent> */}

          <TabsContent value="attendees">
            <EventAttendees />
          </TabsContent>
        </Tabs>
      </main>

      {/* Update Event Sheet */}
      <UpdateEventSheet event={event} open={isSheetOpen} onOpenChange={setIsSheetOpen} onUpdate={handleUpdateEvent} />
    </div>
  );
}
