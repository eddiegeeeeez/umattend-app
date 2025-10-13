'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { pastEvents } from '@/constants';

export default function PastEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof pastEvents)[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleEventClick = (event: (typeof pastEvents)[0]) => {
    setSelectedEvent(event);
    setIsSheetOpen(true);
  };

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Page Title and Toggle */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
          <h1 className="text-foreground text-2xl font-bold sm:text-3xl">Events</h1>

          <div className="bg-muted/50 flex w-full items-center gap-2 rounded-lg p-1 sm:w-auto">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground flex-1 rounded-md px-4 py-1.5 text-center text-sm font-medium transition-colors sm:flex-none"
            >
              Upcoming
            </Link>
            <Link
              href="/dashboard/past"
              className="bg-background text-foreground flex-1 rounded-md px-4 py-1.5 text-center text-sm font-medium shadow-sm transition-colors sm:flex-none"
            >
              Past
            </Link>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {pastEvents.map((event, index) => (
            <div key={event.id} className="flex gap-3 sm:gap-6">
              {/* Date column - adjusted for mobile */}
              <div className="w-16 flex-shrink-0 pt-1 sm:w-24">
                <div className="text-foreground text-xs font-medium sm:text-sm">{event.date}</div>
                <div className="text-muted-foreground text-[10px] sm:text-xs">{event.dayOfWeek}</div>
              </div>

              {/* Timeline line */}
              <div className="relative flex flex-col items-center">
                <div className="bg-muted-foreground/40 mt-2 h-2 w-2 rounded-full" />
                {index < pastEvents.length - 1 && <div className="bg-border/40 mt-2 w-px flex-1" />}
              </div>

              <Card
                className="bg-card border-border/40 hover:border-border mb-4 flex-1 cursor-pointer transition-colors sm:mb-6"
                onClick={() => handleEventClick(event)}
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <div className="order-2 flex-1 sm:order-1">
                      <div className="text-muted-foreground mb-2 text-xs sm:text-sm">{event.time}</div>
                      <h3 className="text-foreground mb-3 text-base font-semibold sm:text-lg">{event.title}</h3>

                      {/* Location and guests info */}
                      <div className="mb-4 space-y-2">
                        {event.hasLocation ? (
                          <div className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                            <svg className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        ) : (
                          <div className="text-primary flex items-center gap-2 text-xs sm:text-sm">
                            <svg className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                            <span className="font-medium">Location Missing</span>
                          </div>
                        )}

                        <div className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                          <svg className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span>{event.attendees > 0 ? `${event.attendees} guests` : 'No guests'}</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground border-border/40 bg-transparent text-xs sm:text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}
                      >
                        View Event
                        <svg className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Button>
                    </div>

                    <div className="bg-muted relative order-1 h-40 w-full flex-shrink-0 overflow-hidden rounded-lg sm:order-2 sm:h-24 sm:w-24">
                      <Image src={event.image || '/placeholder.svg'} alt={event.title} fill className="object-cover" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-border/40 mt-12 border-t sm:mt-16">
        <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
          <div className="text-muted-foreground flex flex-col items-center justify-between gap-2 text-xs sm:flex-row">
            <p>Powered by UMAttend Engineering Team</p>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </footer>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selectedEvent && (
            <div className="space-y-6">
              <div className="bg-muted -mx-6 -mt-6 mb-6 h-64 w-full overflow-hidden">
                <img src={selectedEvent.image || '/placeholder.svg'} alt={selectedEvent.title} className="h-full w-full object-cover" />
              </div>

              <SheetHeader>
                <SheetTitle className="text-2xl">{selectedEvent.title}</SheetTitle>
                <SheetDescription className="text-base">{selectedEvent.description}</SheetDescription>
              </SheetHeader>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="text-muted-foreground mt-0.5 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <div className="text-foreground font-medium">
                      {selectedEvent.dayOfWeek}, {selectedEvent.date}
                    </div>
                    <div className="text-muted-foreground text-sm">{selectedEvent.time}</div>
                  </div>
                </div>

                {selectedEvent.hasLocation ? (
                  <div className="flex items-start gap-3">
                    <svg className="text-muted-foreground mt-0.5 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="text-foreground font-medium">{selectedEvent.location}</div>
                      <button className="text-primary text-sm hover:underline">View on map</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <svg className="text-primary mt-0.5 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div className="text-primary font-medium">Location Missing</div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <svg className="text-muted-foreground mt-0.5 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <div>
                    <div className="text-foreground font-medium">{selectedEvent.attendees} guests attended</div>
                    <div className="text-muted-foreground text-sm">Event has ended</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share Event
                </Button>
              </div>

              <div className="border-t pt-4">
                <div className="bg-muted inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">{selectedEvent.category}</div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
