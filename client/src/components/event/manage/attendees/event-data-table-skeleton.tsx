import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function EventDataTableSkeleton() {
  return (
    <>
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
    </>
  );
}
