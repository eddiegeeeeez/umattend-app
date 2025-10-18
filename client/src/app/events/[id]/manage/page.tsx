'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, UserCheck } from 'lucide-react';
import EventAttendees from '@/components/event/manage/attendees/event-attendees';
import EventDetails from '@/components/event/manage/details/event-details';
import HeroSection from '@/components/event/manage/hero/hero-section';
import ManageEventSkeleton from '@/components/event/manage/manage-event-skeleton';
import EventOrganizers from '@/components/event/manage/organizers/event-organizers';
import { UpdateEventSheet } from '@/components/event/manage/update-event-sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getEventByEventIdOptions } from '@/api/client/@tanstack/react-query.gen';
import type { Event } from '@/types/event';

export default function ManageSingleEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.id as string;
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Fetch event data from API
  const {
    data: eventData,
    isLoading,
    isError,
    refetch
  } = useQuery({
    ...getEventByEventIdOptions({
      path: {
        event_id: eventId
      }
    }),
    enabled: !!eventId
  });

  const handleUpdateEvent = () => {
    setIsSheetOpen(false);
    // Refetch event data after update
    refetch();
  };

  // Check if user has permission to manage this event
  useEffect(() => {
    if (!isLoading && eventData?.data && !eventData.data.can_edit) {
      router.push('/forbidden');
    }
  }, [isLoading, eventData, router]);

  if (isLoading) {
    return <ManageEventSkeleton />;
  }

  if (isError || !eventData?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        <div className="text-center">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Event Not Found</h2>
          <p className="text-muted-foreground">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // Don't render if user doesn't have permission (will redirect)
  if (!eventData.data.can_edit) {
    return <ManageEventSkeleton />;
  }

  // Transform API data to Event type
  const apiEvent = eventData.data;
  const startDate = apiEvent.start_time ? new Date(apiEvent.start_time) : new Date();
  const endDate = apiEvent.end_time ? new Date(apiEvent.end_time) : new Date();

  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    return `${hoursStr}:${minutesStr} ${ampm}`;
  };

  const getEventStatus = (): 'upcoming' | 'ongoing' | 'completed' | 'cancelled' => {
    if (apiEvent.is_done) return 'completed';
    const now = new Date();
    if (now < startDate) return 'upcoming';
    if (now >= startDate && now <= endDate) return 'ongoing';
    return 'completed';
  };

  const event: Event = {
    id: apiEvent.id || '',
    name: apiEvent.title || 'Untitled Event',
    description: apiEvent.description || '',
    location: apiEvent.location || '',
    department: apiEvent.department || '',
    startDate: startDate,
    endDate: endDate,
    startTime: apiEvent.all_day ? 'All Day' : formatTime(startDate),
    endTime: apiEvent.all_day ? '' : formatTime(endDate),
    capacity: apiEvent.capacity || 'unlimited',
    attendees: apiEvent.check_out_required ? (apiEvent.checkout_count || 0) : (apiEvent.checkin_count || 0),
    status: getEventStatus(),
    checkOutRequired: apiEvent.check_out_required || false
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
          <TabsList className="bg-muted text-muted-foreground inline-flex h-11 items-center justify-center rounded-lg p-1 gap-x-2">
            <TabsTrigger value="details" className="rounded-md px-4 py-2 text-sm font-medium">
              <BarChart3 className="mr-2 h-4 w-4" />
              Details
            </TabsTrigger>

            <TabsTrigger value="attendees" className="rounded-md px-4 py-2 text-sm font-medium">
              <UserCheck className="mr-2 h-4 w-4" />
              Attendees
            </TabsTrigger>

            <TabsTrigger value="organizers" className="rounded-md px-4 py-2 text-sm font-medium">
              <UserCheck className="mr-2 h-4 w-4" />
              Organizers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <EventDetails event={event} />
          </TabsContent>

          <TabsContent value="organizers">
            <EventOrganizers eventId={eventId} />
          </TabsContent>

          <TabsContent value="attendees">
            <EventAttendees eventId={eventId} checkOutRequired={event.checkOutRequired} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Update Event Sheet */}
      <UpdateEventSheet 
        event={event} 
        open={isSheetOpen} 
        onOpenChange={setIsSheetOpen} 
        onUpdate={handleUpdateEvent} 
      />
    </div>
  );
}
