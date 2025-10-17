'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventContent from '@/components/event/event-content';
import EventDetails from '@/components/event/event-details';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { pastEvents } from '@/constants';

const EventsSkeleton = () => {
  return (
    <div className="space-y-6 sm:space-y-4">
      {[1, 2, 3, 4, 5].map((i, index) => (
        <div key={i} className="flex gap-3 sm:gap-6">
          {/* Date Column Skeleton */}
          <div className="mt-1 w-16 flex-shrink-0 pt-1 sm:w-24">
            <Skeleton className="mb-0.5 h-3.5 w-12 bg-neutral-200 sm:h-[14px] sm:w-16" />
            <Skeleton className="h-3 w-8 bg-neutral-200 sm:h-3 sm:w-10" />
          </div>

          {/* Timeline Dot and Line */}
          <div className="relative flex flex-col items-center">
            <div className="h-2 w-2 rounded-full bg-neutral-700" />
            {!(index === [1, 2, 3, 4, 5].length - 1) && <div className="mx-auto mt-1 flex-1 border-l-2 border-neutral-200" aria-hidden />}
          </div>

          {/* Card Skeleton */}
          <Card className="mb-4 flex flex-1 cursor-pointer rounded-2xl shadow-md sm:mb-6">
            <CardContent className="flex h-full flex-col justify-between px-8 py-3">
              <div className="flex flex-1 flex-col justify-center gap-2">
                {/* Time Range Skeleton */}
                <div className="mb-1 flex items-center justify-between">
                  <Skeleton className="h-3.5 w-32 sm:h-[14px] sm:w-36" />
                </div>

                {/* Title Skeleton */}
                <Skeleton className="mb-2 h-[22px] w-3/4 sm:h-[35px]" />

                {/* Location and Attendees Skeleton */}
                <div className="mb-1 flex flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3.5 w-3.5 rounded-sm" />
                    <Skeleton className="h-3.5 w-32 sm:h-[14px] sm:w-40" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3.5 w-3.5 rounded-sm" />
                    <Skeleton className="h-3.5 w-24 sm:h-[14px] sm:w-28" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
export default function PastEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof pastEvents)[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleEventClick = (event: (typeof pastEvents)[0]) => {
    setSelectedEvent(event);
    setIsSheetOpen(true);
  };

  // Simulate loading - Replace with actual data fetching logic
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
          <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">Events</h1>

          <div className="flex w-full items-center gap-2 rounded-lg bg-stone-200 p-1 sm:w-auto">
            <Link
              href="/events"
              className="text-muted-foreground hover:text-foreground w-36 flex-1 rounded-md px-4 py-1.5 text-center text-sm font-medium transition-colors sm:flex-none"
            >
              Upcoming
            </Link>
            <Link
              href="/events/past"
              className="bg-background text-foreground w-36 flex-1 rounded-md px-4 py-1.5 text-center text-sm font-medium shadow-sm transition-colors sm:flex-none"
            >
              Past
            </Link>
          </div>
        </div>

        {isLoading ? (
          <EventsSkeleton />
        ) : (
          <div className="space-y-6 sm:space-y-4">
            {pastEvents.map((event, index) => (
              <EventContent
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                dayOfWeek={event.dayOfWeek}
                startTime={event.startTime}
                endTime={event.endTime}
                location={event.location}
                hasLocation={event.hasLocation}
                attendees={event.attendees}
                image={event.image}
                index={index}
                isLast={index === pastEvents.length - 1}
                onCardClick={() => handleEventClick(event)}
                onManageClick={(e) => {
                  e.stopPropagation();
                  handleEventClick(event);
                }}
              />
            ))}
          </div>
        )}
      </main>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg" hideClose>
          {selectedEvent && (
            <EventDetails
              title={selectedEvent.title}
              description={selectedEvent.description}
              image={selectedEvent.image}
              dayOfWeek={selectedEvent.dayOfWeek}
              date={selectedEvent.date}
              startTime={selectedEvent.startTime}
              endTime={selectedEvent.endTime}
              hasLocation={selectedEvent.hasLocation}
              location={selectedEvent.location}
              attendees={selectedEvent.attendees}
              category={selectedEvent.category}
              onRSVP={() => {
                /* placeholder - open RSVP modal */
              }}
              onShare={() => {
                /* placeholder - share logic */
              }}
              onClose={() => setIsSheetOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
