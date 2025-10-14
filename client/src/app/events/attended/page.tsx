'use client';

import { Calendar, Search, Bell, User, Sparkles, Download, Users } from 'lucide-react';
import { columns } from '@/components/event/data-table/attendance-columns';
import { AttendanceDataTable } from '@/components/event/data-table/attendance-data-table';
import { Button } from '@/components/ui/button';

// Sample data
const attendanceData = [
  {
    id: '2021-00001',
    name: 'Juan Dela Cruz',
    email: 'jdelacruz@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:30 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 05:00 PM',
    checkOutBy: 'Admin User'
  },
  {
    id: '2021-00002',
    name: 'Maria Santos',
    email: 'msantos@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:45 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 04:30 PM',
    checkOutBy: 'Admin User'
  },
  {
    id: '2021-00003',
    name: 'Pedro Reyes',
    email: 'preyes@umindanao.edu.ph',
    checkInAt: '2024-10-14 09:00 AM',
    checkInBy: 'Self Check-in',
    checkOutAt: '2024-10-14 05:15 PM',
    checkOutBy: 'Self Check-out'
  },
  {
    id: '2021-00004',
    name: 'Ana Garcia',
    email: 'agarcia@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:15 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 04:45 PM',
    checkOutBy: 'Admin User'
  },
  {
    id: '2021-00005',
    name: 'Carlos Mendoza',
    email: 'cmendoza@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:50 AM',
    checkInBy: 'Self Check-in',
    checkOutAt: '2024-10-14 05:30 PM',
    checkOutBy: 'Self Check-out'
  },
  {
    id: '2021-00006',
    name: 'Sofia Rodriguez',
    email: 'srodriguez@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:20 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 04:50 PM',
    checkOutBy: 'Admin User'
  },
  {
    id: '2021-00007',
    name: 'Miguel Torres',
    email: 'mtorres@umindanao.edu.ph',
    checkInAt: '2024-10-14 09:10 AM',
    checkInBy: 'Self Check-in',
    checkOutAt: '2024-10-14 05:20 PM',
    checkOutBy: 'Self Check-out'
  },
  {
    id: '2021-00008',
    name: 'Isabella Cruz',
    email: 'icruz@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:35 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 04:55 PM',
    checkOutBy: 'Admin User'
  },
  {
    id: '2021-00009',
    name: 'Diego Fernandez',
    email: 'dfernandez@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:55 AM',
    checkInBy: 'Self Check-in',
    checkOutAt: '2024-10-14 05:25 PM',
    checkOutBy: 'Self Check-out'
  },
  {
    id: '2021-00010',
    name: 'Lucia Martinez',
    email: 'lmartinez@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:25 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 04:40 PM',
    checkOutBy: 'Admin User'
  },
  {
    id: '2021-00011',
    name: 'Roberto Gonzales',
    email: 'rgonzales@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:40 AM',
    checkInBy: 'Self Check-in',
    checkOutAt: '2024-10-14 05:10 PM',
    checkOutBy: 'Self Check-out'
  },
  {
    id: '2021-00012',
    name: 'Carmen Lopez',
    email: 'clopez@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:55 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 04:35 PM',
    checkOutBy: 'Admin User'
  }
];

export default function AttendancePage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="bg-card sticky top-0 z-50 border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
          <div className="flex items-center gap-4 md:gap-8">
            <Sparkles className="text-primary size-5 md:size-6" />
            <nav className="hidden items-center gap-6 md:flex">
              <button className="text-foreground hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors">
                <Calendar className="size-4" />
                Events
              </button>
              <button className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors">
                <Calendar className="size-4" />
                Calendars
              </button>
              <button className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors">
                <Search className="size-4" />
                Discover
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-muted-foreground hidden text-xs font-medium sm:block md:text-sm">11:31 AM GMT+8</span>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 hidden px-3 text-sm font-semibold shadow-sm sm:flex md:px-4 md:text-base">
              Create Event
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted size-8 md:size-10">
              <Search className="size-4 md:size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted size-8 md:size-10">
              <Bell className="size-4 md:size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted size-8 rounded-full md:size-10">
              <User className="size-4 md:size-5" />
            </Button>
          </div>
        </div>
      </header>

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
      </main>
    </div>
  );
}
