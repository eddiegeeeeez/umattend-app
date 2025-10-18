import { useEffect, useState } from 'react';
import { is } from 'date-fns/locale';
import { Download, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { columns } from './data-table/attendance-columns';
import { AttendanceDataTable } from './data-table/attendance-data-table';
import EvenAttendeesSkeleton from './event-attendees-skeleton';
import { attendanceData } from '@/constants/index';

export default function EventAttendees() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  if (isLoading) {
    return <EvenAttendeesSkeleton isLoading={isLoading} />;
  }

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-8 md:grid-cols-3 md:gap-6">
        <div className="bg-card border-border rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-medium md:text-sm">Total Students</p>
              <p className="text-foreground mt-1 text-2xl font-bold md:mt-2 md:text-3xl">12</p>
            </div>
            <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full md:size-12">
              <Users className="text-primary size-5 md:size-6" />
            </div>
          </div>
        </div>

        <div className="bg-card border-border rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-medium md:text-sm">Checked In</p>
              <p className="text-foreground mt-1 text-2xl font-bold md:mt-2 md:text-3xl">12</p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full bg-green-500/10 md:size-12">
              <Calendar className="size-5 text-green-600 md:size-6" />
            </div>
          </div>
        </div>

        <div className="bg-card border-border rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-medium md:text-sm">Checked Out</p>
              <p className="text-foreground mt-1 text-2xl font-bold md:mt-2 md:text-3xl">12</p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/10 md:size-12">
              <Calendar className="size-5 text-blue-600 md:size-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-8">
        <div>
          <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">Attendance Records</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage student check-in and check-out records</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button onClick={handleRefresh} variant="outline" className="w-full gap-2 bg-transparent font-semibold shadow-sm sm:w-auto">
            Refresh
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full gap-2 font-semibold shadow-sm sm:w-auto">
            <Download className="size-4" />
            Export Data
          </Button>
        </div>
      </div>

      <AttendanceDataTable columns={columns} data={attendanceData} />
    </div>
  );
}
