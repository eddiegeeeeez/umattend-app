'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventContent from '@/components/event/event-content';
import EventDetails from '@/components/event/event-details';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { events } from '@/constants';
import EventsSkeleton from '@/components/event/events-skeleton';


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
        ) : (
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
