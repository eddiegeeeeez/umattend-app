import React from 'react';
import { CalendarRange } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const PastEventContentEmpty = () => {
  const user = useAuthStore((state) => state.user);
  const isOrganizer = user?.role && ['admin', 'organizer', 'csg'].includes(user.role);

  const title = 'No Past Events';
  const message = isOrganizer
    ? 'No past events yet. Start organizing events to build your history.'
    : 'No past events to display. Stay tuned for upcoming events.';

  return (
    <div className="flex min-h-[65vh] items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-muted/50 shadow-sm ring-1 ring-border">
          <CalendarRange className="h-14 w-14 text-stone-400" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">{title}</h3>
          <p className="leading-relaxed text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default PastEventContentEmpty;