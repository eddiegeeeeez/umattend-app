import React from 'react';
import { Calendar, MapPin, UsersRound, AlertTriangle, Share2, ArrowUpRight, ChevronsLeft } from 'lucide-react';
import { type StaticImageData } from 'next/image';
import { Button } from '../ui/button';
import { SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';

interface EventDetailsProps {
  title: string;
  description?: string;
  image?: string | StaticImageData;
  dayOfWeek?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  hasLocation?: boolean;
  location?: string | null;
  attendees?: number;
  category?: string;
  onRSVP?: () => void;
  onShare?: () => void;
  onClose?: () => void;
}

const EventDetails = ({
  title,
  description,
  dayOfWeek,
  date,
  startTime,
  endTime,
  hasLocation = false,
  location,
  attendees = 0,
  category,
  onRSVP,
  onShare,
  onClose
}: EventDetailsProps) => {
  return (
    <div className="space-y-8">
      <SheetHeader className="border-border border-b">
        <div className="flex items-center justify-between space-x-3">
          <Button className="hover:text-primary !h-8 cursor-pointer !py-1 hover:bg-stone-800" onClick={onClose}>
            <ChevronsLeft />
          </Button>
          <Button className="hover:text-primary !h-8 cursor-pointer !py-1 hover:bg-stone-800">
            Event Page
            <ArrowUpRight />
          </Button>
        </div>
      </SheetHeader>

      <div className="flex flex-col gap-8 px-6 py-4">
        {/* Title and Guest Count */}
        <div className="space-y-3">
          <SheetTitle className="text-3xl leading-tight font-bold tracking-tight">{title}</SheetTitle>
          <div className="flex items-center gap-2">
            <UsersRound className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-sm">{attendees > 0 ? `${attendees} attendees` : 'No attendees yet'}</span>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-5">
          {/* Date and Time */}
          <div className="flex items-center gap-4">
            <div className="bg-background ring-1 ring-border flex h-12 w-12 flex-shrink-0 flex-col overflow-hidden rounded-lg shadow-sm">
              <div className="bg-foreground flex items-center justify-center py-0.5">
                <span className="text-background text-[9px] font-bold uppercase tracking-wide">{date?.split(',')[0]?.slice(0, 3) || 'APR'}</span>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <span className="text-foreground text-base font-medium leading-none">{date?.split(' ')[1] || '5'}</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-foreground text-base font-semibold">
                {dayOfWeek}, {date}
              </div>
              <div className="text-muted-foreground text-sm">{startTime} - {endTime}</div>
            </div>
          </div>

          {/* Location */}
          {hasLocation ? (
            <div className="flex items-center gap-4">
              <div className="bg-background ring-1 ring-border flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg shadow-sm">
                <MapPin className="text-foreground h-5 w-5" strokeWidth={2} />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-foreground text-base font-medium">{location?.split(',')[0] || location}</div>
                <div className="text-muted-foreground text-sm">{location?.includes(',') ? location.split(',').slice(1).join(',').trim() : ''}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 ring-1 ring-primary/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                <AlertTriangle className="text-primary h-5 w-5" strokeWidth={2} />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-primary text-base font-semibold">Location Missing</div>
                <div className="text-muted-foreground text-sm">No location provided</div>
              </div>
            </div>
          )}
        </div>

        {description && (
          <div className="border-border border-t pt-6">
            <SheetDescription className="text-foreground text-base leading-relaxed">{description}</SheetDescription>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
