import React from 'react';
import { Calendar, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import EventAttendeesStatsSkeleton from './event-attendees-stats-skeleton';
import { getEventAttendanceCountOptions } from '@/api/client/@tanstack/react-query.gen';

export default function EventAttendeesStats({ totalStudents, totalCheckedOut, isLoading }: { totalStudents: number, totalCheckedOut: number, isLoading: boolean }) {


  if (isLoading) {
    return <EventAttendeesStatsSkeleton />;
  }

  return (
    <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4 md:mb-8 md:grid-cols-3 md:gap-6">
      <div className="bg-card border-border rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-xs font-medium sm:text-sm">Total Students</p>
            <p className="text-foreground mt-1 text-xl font-bold sm:text-2xl md:mt-2 md:text-3xl">{totalStudents}</p>
          </div>
          <div className="bg-primary/10 flex size-9 items-center justify-center rounded-full sm:size-10 md:size-12">
            <Users className="text-primary size-4 sm:size-5 md:size-6" />
          </div>
        </div>
      </div>

      <div className="bg-card border-border rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-xs font-medium sm:text-sm">Checked In</p>
            <p className="text-foreground mt-1 text-xl font-bold sm:text-2xl md:mt-2 md:text-3xl">{totalStudents}</p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-full bg-green-500/10 sm:size-10 md:size-12">
            <Calendar className="size-4 text-green-600 sm:size-5 md:size-6" />
          </div>
        </div>
      </div>

      <div className="bg-card border-border rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-xs font-medium sm:text-sm">Checked Out</p>
            <p className="text-foreground mt-1 text-xl font-bold sm:text-2xl md:mt-2 md:text-3xl">{totalCheckedOut}</p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-full bg-blue-500/10 sm:size-10 md:size-12">
            <Calendar className="size-4 text-blue-600 sm:size-5 md:size-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
