import React from 'react';
import { ChevronRight, MapPin, TriangleAlert, UsersRound } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface EventContentProps {
  id?: number;
  title: string;
  date: string;
  dayOfWeek: string;
  time: string;
  location?: string | null;
  hasLocation?: boolean;
  attendees?: number;
  image?: string | StaticImageData;
  index: number;
  isLast?: boolean;
  onCardClick?: () => void;
  onManageClick?: (e: React.MouseEvent) => void;
}

const EventContent = ({
  title,
  date,
  dayOfWeek,
  time,
  location,
  hasLocation = false,
  attendees = 0,
  image,
  index,
  isLast = false,
  onCardClick,
  onManageClick
}: EventContentProps) => {
  return (
    <div className="flex gap-3 sm:gap-6">
      <div className="w-16 flex-shrink-0 pt-1 sm:w-24">
        <div className="text-foreground text-xs font-medium sm:text-sm">{date}</div>
        <div className="text-muted-foreground text-[10px] sm:text-xs">{dayOfWeek}</div>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="bg-primary mt-2 h-2 w-2 rounded-full" />
        {!isLast && <div className="border-primary/20 mx-auto mt-1 flex-1 border-l-2" aria-hidden />}
      </div>

      <Card className="mb-4 flex flex-1 cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-md transition-colors sm:mb-6" onClick={onCardClick}>
        <CardContent className="flex h-full flex-col justify-between px-8 py-3">
          <div className="flex flex-1 flex-col justify-center gap-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-muted-foreground text-xs sm:text-sm">{time}</span>
              <Button
                variant="outline"
                size="sm"
                className="text-muted-foreground hover:text-foreground border-border/40 rounded-lg bg-transparent px-4 py-2 text-xs shadow-sm sm:text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onManageClick?.(e);
                }}
              >
                Manage Event
                <ChevronRight size={18} />
              </Button>
            </div>
            <h3 className="text-foreground mb-2 text-lg leading-tight font-semibold">{title}</h3>
            <div className="mb-1 flex flex-row gap-4">
              {hasLocation ? (
                <div className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                  <MapPin size={14} />
                  <span className="line-clamp-1">{location}</span>
                </div>
              ) : (
                <div className="text-primary flex items-center gap-2 text-xs sm:text-sm">
                  <TriangleAlert size={14} />
                  <span className="font-medium">Location Missing</span>
                </div>
              )}
              <div className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                <UsersRound size={14} />
                <span>{attendees && attendees > 0 ? `${attendees} guests` : 'No guests'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventContent;
