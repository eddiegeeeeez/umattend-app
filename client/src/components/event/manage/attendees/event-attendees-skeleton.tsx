import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function EvenAttendeesSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-8 md:grid-cols-3 md:gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border-border rounded-xl border p-5 shadow-sm md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Skeleton className="mb-3 h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
              <Skeleton className="size-10 rounded-full md:size-12" />
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-8">
        <div className="flex-1">
          <Skeleton className="mb-2 h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Skeleton className="h-10 w-full sm:w-32" />
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <div className="border-border border-b p-4 md:p-6">
          <Skeleton className="h-10 w-full max-w-sm" />
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="border-border border-b">
              <div className="bg-muted/50 grid grid-cols-10 gap-4 p-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))}
              </div>
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border-border grid grid-cols-10 gap-4 border-b p-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((j) => (
                  <Skeleton key={j} className="h-5 w-full" />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="border-border flex items-center justify-between border-t p-4">
          <Skeleton className="h-5 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
