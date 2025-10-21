'use client';

import { Globe, Monitor, MapPin, History } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getAuthLoginHistoryOptions } from '@/api/client/@tanstack/react-query.gen';

const LoginHistorySkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="space-y-2 rounded-lg border p-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    ))}
  </div>
);

const formatLocation = (city?: string, region?: string, country?: string) => {
  const parts = [city, region, country].filter(Boolean);
  if (parts.length === 0) return 'Unknown Location';

  if (parts.every((part) => part === 'Local')) return 'Local Network';

  if (city && country && city !== 'Local') {
    return `${city}, ${country}`;
  }

  return parts.join(', ');
};

type LoginHistoryEntry = {
  id?: string;
  browser?: string;
  os?: string;
  city?: string;
  region?: string;
  country?: string;
};

export const LoginHistoryTable = () => {
  const { data, isLoading, isError } = useQuery({
    ...getAuthLoginHistoryOptions(),
    staleTime: 5 * 60 * 1000,
    retry: 1
  });

  const loginHistory = (data?.data?.login_history || []).slice(0, 5) as LoginHistoryEntry[];

  if (isError) {
    return (
      <Card className="border-border border shadow-sm">
        <CardHeader className="border-border border-b pb-4">
          <CardTitle className="text-foreground text-lg font-semibold">Login History</CardTitle>
          <CardDescription className="text-muted-foreground">View your recent login activity</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-muted-foreground flex flex-col items-center justify-center py-12 text-center">
            <Globe className="text-muted-foreground/50 mb-3 h-12 w-12" />
            <p className="text-sm">Failed to load login history</p>
            <p className="text-xs">Please try again later</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border border shadow-sm">
      <CardHeader className="border-border border-b pb-4">
        <CardTitle className="text-foreground text-lg font-semibold">Login History</CardTitle>
        <CardDescription className="text-muted-foreground">View your 5 most recent login sessions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <LoginHistorySkeleton />
        ) : loginHistory.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center justify-center py-12 text-center">
            <History className="text-muted-foreground/50 mb-3 h-12 w-12" />
            <p className="text-sm font-medium">No login history found</p>
            <p className="text-xs">Your login activity will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {loginHistory.map((entry) => {
              const login = entry as LoginHistoryEntry;
              const location = formatLocation(login.city, login.region, login.country);
              const browser = login.browser || 'Unknown Browser';
              const os = login.os || 'Unknown OS';

              return (
                <div key={login.id} className="border-border hover:bg-muted/50 rounded-lg border p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                      <span className="text-foreground text-sm">{os}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                      <span className="text-foreground text-sm">{browser}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
