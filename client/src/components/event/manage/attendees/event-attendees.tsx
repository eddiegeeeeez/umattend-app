import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { columns } from './data-table/attendance-columns';
import { AttendanceDataTable } from './data-table/attendance-data-table';
import { attendanceData } from '@/constants/index';

export default function EventAttendees() {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-8">
        <div>
          <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-4xl">Attendance Records</h1>
          <p className="text-muted-foreground mt-1 text-sm md:mt-2 md:text-lg">Manage student check-in and check-out records</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full gap-2 font-semibold shadow-sm sm:w-auto">
          <Download className="size-4" />
          Export Data
        </Button>
      </div>

      <AttendanceDataTable columns={columns} data={attendanceData} />
    </div>
  );
}
