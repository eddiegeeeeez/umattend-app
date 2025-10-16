'use client';

import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Mock single event data
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

export default function EventDetailsPage() {
  const [event, setEvent] = useState<Event>(mockEvent);
  const [attendanceStatus, setAttendanceStatus] = useState<'joined' | 'not_joined'>('joined');

  useEffect(() => {
    setEvent(mockEvent);
    setAttendanceStatus('joined');
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      {/* Hero Section */}
      <section className="border-border bg-muted/30 border-b">
        <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
              {/* Event Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-foreground text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">{event.name}</h1>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {' '}
                      {event.startTime} - {event.endTime}
                    </span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.attendees}/{event.capacity} attending
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-foreground font-medium">{event.location}</p>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {attendanceStatus === 'joined' ? (
                    <Badge className="px-4 py-2 text-sm bg-neutral-200">
                      ✓ You&apos;re attending
                    </Badge>
                  ) : (
                    <Button size="lg" className="font-semibold">
                      RSVP Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Status Card - Only show if joined */}
          {attendanceStatus === 'joined' && (
            <Card className="border-primary/20 bg-primary/5 border-2">
              <CardContent className="flex items-start gap-4 p-6">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>HN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-foreground font-semibold">Thank You for Joining</h3>
                  <p className="text-muted-foreground text-sm">We hope you enjoyed the event!</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* About Event */}
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-bold">About Event</h2>
            <div className="prose prose-sm text-foreground/90 max-w-none leading-relaxed">
              <p>{event.description}</p>
            </div>
          </section>

          <Separator />
        </div>
      </main>
    </div>
  );
}
