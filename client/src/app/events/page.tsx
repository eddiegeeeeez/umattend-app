'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import EventContent from '@/components/event/event-content';
import EventContentEmpty from '@/components/event/event-content-empty';
import EventDetails from '@/components/event/event-details';
import EventsSkeleton from '@/components/event/events-skeleton';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { getEventOptions } from '@/api/client/@tanstack/react-query.gen';
import { transformEventData } from '@/lib/events-utils';

export default function DashboardPage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Fetch upcoming/active events
  const { data: eventsData, isLoading } = useQuery({
    ...getEventOptions(),
    retry: false
  });

  const events = eventsData?.data || [];
  const transformedEvents = events.map(transformEventData).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  const selectedEvent = transformedEvents.find((event) => event.apiId === selectedEventId);

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
          <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">Events</h1>

          <div className="flex w-full items-center gap-2 rounded-lg bg-stone-200 p-1 sm:w-auto">
            <Link
              href="/events"
              className="bg-background text-foreground w-36 flex-1 rounded-md px-4 py-1.5 text-center text-sm font-medium shadow-sm transition-colors sm:flex-none"
              onClick={(e) => e.stopPropagation()}
            >
              Upcoming
            </Link>
            <Link
              href="/events/past"
              className="text-muted-foreground hover:text-foreground w-36 flex-1 rounded-md px-4 py-1.5 text-center text-sm font-medium transition-colors sm:flex-none"
            >
              Past
            </Link>
          </div>
        </div>

        {isLoading ? (
          <EventsSkeleton />
        ) : transformedEvents.length > 0 ? (
          <div className="space-y-6 sm:space-y-4">
            {transformedEvents.map((event, index) => (
              <EventContent
                key={event.apiId}
                event={event}
                index={index}
                isLast={index === transformedEvents.length - 1}
                onCardClick={() => handleEventClick(event.apiId)}
                onManageClick={(e) => {
                  e.stopPropagation();
                  handleEventClick(event.apiId);
                }}
              />
            ))}
          </div>
        ) : (
          <EventContentEmpty />
        )}
      </main>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg" hideClose>
          {selectedEvent && <EventDetails event={selectedEvent} onClose={() => setIsSheetOpen(false)} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
