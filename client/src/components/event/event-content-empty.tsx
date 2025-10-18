import React from 'react';
import { CalendarRange } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const EventContentEmpty = () => {
  const user = useAuthStore((state) => state.user);
  const isOrganizer = user?.role && ['admin', 'organizer', 'csg'].includes(user.role);

  return (
    <div className="flex min-h-[65vh] items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <div className="bg-muted/50 ring-border flex h-28 w-28 items-center justify-center rounded-3xl shadow-sm ring-1">
          <CalendarRange className="h-14 w-14 text-stone-400" />
        </div>
        <div className="space-y-3">
          <h3 className="text-foreground text-2xl font-bold tracking-tight">No Upcoming Events</h3>
          <p className="text-muted-foreground leading-relaxed">
            {isOrganizer
              ? 'No upcoming events scheduled. Why not create one to get started?'
              : 'There are no upcoming events at the moment. Check back soon for new events!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventContentEmpty;
