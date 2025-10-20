import { useState } from 'react';
import { Download, Users, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import type { AttendanceRecord } from '@/types/events';
import { columns } from './data-table/attendance-columns';
import { AttendanceDataTable } from './data-table/attendance-data-table';
import EvenAttendeesSkeleton from './event-attendees-skeleton';
import { getEventByEventIdAttendeesOptions } from '@/api/client/@tanstack/react-query.gen';
import { Event } from '@/api/client/sdk.gen';
import { formatDateTime } from '@/lib/utils';

interface EventAttendeesProps {
  eventId: string;
  checkOutRequired: boolean;
}

export default function EventAttendees({ eventId }: EventAttendeesProps) {
  const [search] = useState('');
  const [page] = useState(1);
  const limit = 10;

  // Fetch attendees data from API
  const {
    data: attendeesData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    ...getEventByEventIdAttendeesOptions({
      path: {
        event_id: eventId
      },
      query: {
        page,
        limit,
        search: search || undefined
      }
    }),
    // Enable the query only when we have an eventId
    enabled: !!eventId,
    retry: false
  });

  console.log(isError);

  console.log(error);
  
  

  const handleRefresh = () => {
    refetch();
  };

  const handleExport = async () => {
    try {
      toast.loading('Generating export file...');

      const response = await Event.getEventExportByEventId({
        path: {
          event_id: eventId
        }
      });

      // The response.data is a Blob
      const csvBlob = response.data;

      if (!csvBlob) {
        toast.dismiss();
        toast.error('No data to export');
        return;
      }

      // Create a download link
      const url = window.URL.createObjectURL(csvBlob as Blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `event-${eventId}-attendees.csv`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.dismiss();
      toast.success('Export downloaded successfully');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to export data');
      console.error('Export error:', error);
    }
  };

  if (isLoading) {
    return <EvenAttendeesSkeleton />;
  }

  // Transform API data to AttendanceRecord format
  const attendanceRecords: AttendanceRecord[] =
    attendeesData?.data?.data
      ?.map((item) => {
        const student = item.student;
        if (!student) return null;

        return {
          id: student.student_id?.toString() || '',
          name: student.name || '',
          department: student.department || '',
          program: student.program || '',
          email: student.umindanao_email || '',
          checkInAt: formatDateTime(student.check_in_at ?? undefined),
          checkInBy: student.check_in_by || 'Self',
          checkOutAt: formatDateTime(student.check_out_at ?? undefined),
          checkOutBy: student.check_out_by || (student.check_out_at ? 'Self' : '-')
        };
      })
      .filter((record): record is AttendanceRecord => record !== null) || [];

  const totalStudents = attendeesData?.data?.pagination?.total || 0;
  const checkedInCount = attendanceRecords.filter((r) => r.checkInAt !== '-').length;
  const checkedOutCount = attendanceRecords.filter((r) => r.checkOutAt !== '-').length;

  return (
    <div>
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
              <p className="text-foreground mt-1 text-xl font-bold sm:text-2xl md:mt-2 md:text-3xl">{checkedInCount}</p>
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
              <p className="text-foreground mt-1 text-xl font-bold sm:text-2xl md:mt-2 md:text-3xl">{checkedOutCount}</p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-full bg-blue-500/10 sm:size-10 md:size-12">
              <Calendar className="size-4 text-blue-600 sm:size-5 md:size-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:mb-8">
        <div>
          <h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">Attendance Records</h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm md:mt-2 md:text-base lg:text-lg">Manage student check-in and check-out records</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" className="flex-1 gap-2 bg-transparent text-sm font-semibold shadow-sm sm:flex-none">
            Refresh
          </Button>
          <Button
            onClick={handleExport}
            disabled={totalStudents === 0}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 gap-2 text-sm font-semibold shadow-sm disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:opacity-50 sm:flex-none"
          >
            <Download className="size-4" />
            <span className="xs:inline hidden">Export Data</span>
            <span className="xs:hidden">Export</span>
          </Button>
        </div>
      </div>

      <AttendanceDataTable columns={columns} data={attendanceRecords} />
    </div>
  );
}
