'use client';

import { Calendar, Search, Bell, User, Sparkles, Download, Users } from 'lucide-react';
import { columns } from '@/components/event/manage/attendees/data-table/attendance-columns';
import { AttendanceDataTable } from '@/components/event/manage/attendees/data-table/attendance-data-table';
import { Button } from '@/components/ui/button';

// Sample data

export default function AttendancePage() {
  return (
    <div className="bg-background min-h-screen">


      <main className="container mx-auto px-4 py-6 md:px-8 md:py-10">
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


      </main>
    </div>
  );
}
