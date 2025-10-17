'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventContent from '@/components/event/event-content';
import EventDetails from '@/components/event/event-details';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { events } from '@/constants';

const EventsSkeleton = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
          <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">Events</h1>

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

        {/* Event Cards Skeleton */}
        <div className="space-y-6 sm:space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 sm:gap-6">
              <div className="flex w-16 flex-col gap-2 pt-1 sm:w-24">
                <Skeleton className="h-3 w-12 bg-neutral-200" />
                <Skeleton className="h-3 w-12 bg-neutral-200" />
              </div>

              <div className="relative flex flex-col items-center">
                <div className="h-2 w-2 rounded-full bg-neutral-700" />
                {!(i === events.length - 1) && <div className="mx-auto mt-1 flex-1 border-l-2 border-neutral-200" aria-hidden />}
              </div>
              <div className="bg-card border-border mb-4 flex w-full flex-col overflow-hidden rounded-xl border px-8 py-3 shadow-sm sm:flex-row">
                {/* Content Skeleton */}
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
                  <div className="space-y-3">
                    {/* Title */}
                    <Skeleton className="h-6 w-3/4" />

                    {/* Date and Time */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-48" />
                    </div>

                    {/* Attendees */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>

                  {/* Button Skeleton */}
                  <div className="mt-4 flex justify-end">
                    <Skeleton className="h-9 w-24" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default function DashboardPage() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleEventClick = (event: (typeof events)[0]) => {
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

  if (isLoading) {
    return <EventsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
          <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">Events</h1>

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

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-4">
          {events.map((event, index) => (
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
              isLast={index === events.length - 1}
              onCardClick={() => handleEventClick(event)}
              onManageClick={(e) => {
                e.stopPropagation();
                handleEventClick(event);
              }}
            />
          ))}
        </div>
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
