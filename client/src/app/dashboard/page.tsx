'use client';

import { useState } from 'react';
import { MapPin, UsersRound, Calendar, AlertTriangle, ChevronRight, TriangleAlert } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import EventContent from '@/components/EventContent';
import EventDetails from '@/components/EventDetails';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { events } from '@/constants';

export default function DashboardPage() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleEventClick = (event: (typeof events)[0]) => {
    setSelectedEvent(event);
    setIsSheetOpen(true);
  };

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
          <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">Events</h1>

          <div className="bg-muted/50 flex w-full items-center gap-2 rounded-lg p-1 sm:w-auto">
            <Link
              href="/dashboard"
              className="bg-background text-foreground flex-1 rounded-md px-4 py-1.5 text-center text-sm font-medium shadow-sm transition-colors sm:flex-none"
            >
              Upcoming
            </Link>
            <Link
              href="/dashboard/past"
              className="text-muted-foreground hover:text-foreground flex-1 rounded-md px-4 py-1.5 text-center text-sm font-medium transition-colors sm:flex-none"
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
              time={event.time}
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
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selectedEvent && (
            <EventDetails
              title={selectedEvent.title}
              description={selectedEvent.description}
              image={selectedEvent.image}
              dayOfWeek={selectedEvent.dayOfWeek}
              date={selectedEvent.date}
              time={selectedEvent.time}
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
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
