import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function EvenAttendeesSkeleton() {
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-8">
        <div className="flex-1">
          <Skeleton className="mb-2 h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Skeleton className="h-10 w-full sm:w-32" />
      </div>
    </>
  );
}
