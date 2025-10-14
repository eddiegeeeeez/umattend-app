import React from 'react';
import { Calendar, MapPin, UsersRound, AlertTriangle } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import { Button } from './ui/button';
import { SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';

interface EventDetailsProps {
  title: string;
  description?: string;
  image?: string | StaticImageData;
  dayOfWeek?: string;
  date?: string;
  time?: string;
  hasLocation?: boolean;
  location?: string | null;
  attendees?: number;
  category?: string;
  onRSVP?: () => void;
  onShare?: () => void;
}

const EventDetails = ({
  title,
  description,
  image,
  dayOfWeek,
  date,
  time,
  hasLocation = false,
  location,
  attendees = 0,
  category,
  onRSVP,
  onShare
}: EventDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-muted relative -mt-6 mb-6 h-64 w-full overflow-hidden">
        <Image
          src={image || '/placeholder.svg'}
          alt={title}
          fill
          sizes="(min-width: 640px) 32rem, 100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <SheetHeader>
        <SheetTitle className="text-2xl">{title}</SheetTitle>
        {description && <SheetDescription className="text-base">{description}</SheetDescription>}
      </SheetHeader>

      <div className="px-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div>
              <div className="text-foreground font-medium">
                {dayOfWeek}, {date}
              </div>
              <div className="text-muted-foreground text-sm">{time}</div>
            </div>
          </div>

          {hasLocation ? (
            <div className="flex items-start gap-3">
              <MapPin className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <div className="text-foreground font-medium">{location}</div>
                <div className="text-muted-foreground text-sm">Location</div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-primary mt-0.5 h-5 w-5" />
              <div className="text-primary font-medium">Location Missing</div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <UsersRound className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div>
              <div className="text-foreground font-medium">{attendees > 0 ? `${attendees} guests attending` : 'No guests yet'}</div>
              <div className="text-muted-foreground text-sm">Be the first to RSVP!</div>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-10">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full font-medium" size="lg" onClick={onRSVP}>
            RSVP to Event
          </Button>
          <Button variant="outline" className="w-full bg-transparent" size="lg" onClick={onShare}>
            {/* keep the inline svg for share (small and simple) */}
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
      </div>

      <div className="border-t p-4">
        <div className="bg-muted inline-flex items-center rounded-full px-4 py-1 text-sm font-medium"># {category}</div>
      </div>
    </div>
  );
};

export default EventDetails;
