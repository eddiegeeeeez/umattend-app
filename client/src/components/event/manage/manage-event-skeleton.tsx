import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ManageEventSkeleton() {
  return (
    <div className="bg-background min-h-screen">
      <section className="border-border bg-muted/30 border-b">
        <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-7xl px-3">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
              <div className="flex-1 space-y-4">
                {/* Title Skeleton */}
                <Skeleton className="h-10 w-3/4 bg-neutral-200 md:h-12 lg:h-20" />

                {/* Meta Info Skeleton */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded bg-neutral-200" />
                    <Skeleton className="h-4 w-40 bg-neutral-200" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded bg-neutral-200" />
                    <Skeleton className="h-4 w-32 bg-neutral-200" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded bg-neutral-200" />
                    <Skeleton className="h-4 w-28 bg-neutral-200" />
                  </div>
                </div>

                {/* Location Skeleton */}
                <div className="flex items-start gap-2">
                  <Skeleton className="mt-0.5 h-4 w-4 rounded bg-neutral-200" />
                  <Skeleton className="h-4 w-48 bg-neutral-200" />
                </div>

                {/* Button Skeleton */}
                <div className="pt-2">
                  {/* <Skeleton className="h-10 w-32 bg-neutral-200" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-6">
          <Skeleton className="h-11 w-96 rounded-lg" />
          {/* Stats Grid Skeleton */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Info Skeleton */}
          <Card className="border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-28" />
            </div>
          </Card>
        </div>

        {/* Title & Description Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-full max-w-3xl" />
          <Skeleton className="h-5 w-2/3 max-w-3xl" />
        </div>
      </main>
    </div>
  );
}
