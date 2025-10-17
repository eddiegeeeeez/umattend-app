import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function EventsSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-4">
      {[1, 2, 3, 4, 5].map((i, index) => (
        <div key={i} className="flex gap-3 sm:gap-6">
          {/* Date Column Skeleton */}
          <div className="mt-1 w-16 flex-shrink-0 pt-1 sm:w-24">
            <Skeleton className="mb-0.5 h-3.5 w-12 bg-neutral-200 sm:h-[14px] sm:w-16" />
            <Skeleton className="h-3 w-8 bg-neutral-200 sm:h-3 sm:w-10" />
          </div>

          {/* Timeline Dot and Line */}
          <div className="relative flex flex-col items-center">
            <div className="h-2 w-2 rounded-full bg-neutral-700" />
            {!(index === [1, 2, 3, 4, 5].length - 1) && <div className="mx-auto mt-1 flex-1 border-l-2 border-neutral-200" aria-hidden />}
          </div>

          {/* Card Skeleton */}
          <Card className="mb-4 flex flex-1 cursor-pointer rounded-2xl shadow-md sm:mb-6">
            <CardContent className="flex h-full flex-col justify-between px-8 py-3">
              <div className="flex flex-1 flex-col justify-center gap-2">
                {/* Time Range Skeleton */}
                <div className="mb-1 flex items-center justify-between">
                  <Skeleton className="h-3.5 w-32 sm:h-[14px] sm:w-36" />
                </div>

                {/* Title Skeleton */}
                <Skeleton className="mb-2 h-[22px] w-3/4 sm:h-[35px]" />

                {/* Location and Attendees Skeleton */}
                <div className="mb-1 flex flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3.5 w-3.5 rounded-sm" />
                    <Skeleton className="h-3.5 w-32 sm:h-[14px] sm:w-40" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3.5 w-3.5 rounded-sm" />
                    <Skeleton className="h-3.5 w-24 sm:h-[14px] sm:w-28" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
