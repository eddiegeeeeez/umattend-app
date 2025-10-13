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
        <div className="bg-muted-foreground/40 mt-2 h-2 w-2 rounded-full" />
        {!isLast && <div className="bg-border/40 mt-2 w-px flex-1" />}
      </div>

      <Card className="bg-card border-border/40 hover:border-border mb-4 flex-1 cursor-pointer transition-colors sm:mb-6" onClick={onCardClick}>
        <CardContent className="px-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="order-2 flex-1 sm:order-1">
              <div className="text-muted-foreground mb-2 text-xs sm:text-sm">{time}</div>
              <h3 className="text-foreground mb-3 text-base font-semibold sm:text-lg">{title}</h3>

              <div className="mb-4 space-y-2">
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

              <Button
                variant="outline"
                size="sm"
                className="text-muted-foreground hover:text-foreground border-border/40 bg-transparent text-xs sm:text-sm"
                onClick={(e) => onManageClick?.(e)}
              >
                Manage Event
                <ChevronRight size={18} />
              </Button>
            </div>

            <div className="bg-muted relative order-1 h-40 w-full flex-shrink-0 overflow-hidden rounded-lg sm:order-2 sm:h-24 sm:w-24">
              <Image
                src={image || '/placeholder.svg'}
                alt={title}
                fill
                sizes="(min-width: 640px) 6rem, 100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventContent;
