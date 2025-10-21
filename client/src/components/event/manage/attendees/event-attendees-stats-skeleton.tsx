import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function EventAttendeesStatsSkeleton() {
  return (
    <>
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
    </>
  );
}
