'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventContent from '@/components/event/event-content';
import EventDetails from '@/components/event/event-details';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { pastEvents } from '@/constants';
import EventsSkeleton from '@/components/event/events-skeleton';

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
          <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">Events</h1>

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
        ) : pastEvents.length > 0 ? (
          <div className="space-y-6 sm:space-y-4">
            {pastEvents.map((event, index) => (
              <EventContent
                key={event.id}
                event={event}
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
        ) : (
          <div className="flex min-h-[65vh] items-center justify-center px-4">
            <div className="flex max-w-md flex-col items-center gap-6 text-center">
              <div className="bg-muted/50 ring-border flex h-28 w-28 items-center justify-center rounded-3xl shadow-sm ring-1">
                <svg
                  className="text-muted-foreground/70 h-14 w-14"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="space-y-3">
                <h3 className="text-foreground text-2xl font-bold tracking-tight">No Past Events</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You haven't attended any events yet. Explore upcoming events and start building your event history!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg" hideClose>
          {selectedEvent && (
            <EventDetails
              event={selectedEvent}
              onClose={() => setIsSheetOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
