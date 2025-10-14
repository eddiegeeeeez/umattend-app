"use client"

import { AttendanceDataTable } from "@/components/event/data-table/attendance-data-table"
import { columns } from "@/components/event/data-table/attendance-columns"
import { Button } from "@/components/ui/button"
import { Calendar, Search, Bell, User, Sparkles, Download, Users } from "lucide-react"

// Sample data
const attendanceData = [
  {
    id: "2021-00001",
    name: "Juan Dela Cruz",
    email: "jdelacruz@umindanao.edu.ph",
    checkInAt: "2024-10-14 08:30 AM",
    checkInBy: "Admin User",
    checkOutAt: "2024-10-14 05:00 PM",
    checkOutBy: "Admin User",
  },
  {
    id: "2021-00002",
    name: "Maria Santos",
    email: "msantos@umindanao.edu.ph",
    checkInAt: "2024-10-14 08:45 AM",
    checkInBy: "Admin User",
    checkOutAt: "2024-10-14 04:30 PM",
    checkOutBy: "Admin User",
  },
  {
    id: "2021-00003",
    name: "Pedro Reyes",
    email: "preyes@umindanao.edu.ph",
    checkInAt: "2024-10-14 09:00 AM",
    checkInBy: "Self Check-in",
    checkOutAt: "2024-10-14 05:15 PM",
    checkOutBy: "Self Check-out",
  },
  {
    id: "2021-00004",
    name: "Ana Garcia",
    email: "agarcia@umindanao.edu.ph",
    checkInAt: "2024-10-14 08:15 AM",
    checkInBy: "Admin User",
    checkOutAt: "2024-10-14 04:45 PM",
    checkOutBy: "Admin User",
  },
  {
    id: "2021-00005",
    name: "Carlos Mendoza",
    email: "cmendoza@umindanao.edu.ph",
    checkInAt: "2024-10-14 08:50 AM",
    checkInBy: "Self Check-in",
    checkOutAt: "2024-10-14 05:30 PM",
    checkOutBy: "Self Check-out",
  },
  {
    id: "2021-00006",
    name: "Sofia Rodriguez",
    email: "srodriguez@umindanao.edu.ph",
    checkInAt: "2024-10-14 08:20 AM",
    checkInBy: "Admin User",
    checkOutAt: "2024-10-14 04:50 PM",
    checkOutBy: "Admin User",
  },
  {
    id: "2021-00007",
    name: "Miguel Torres",
    email: "mtorres@umindanao.edu.ph",
    checkInAt: "2024-10-14 09:10 AM",
    checkInBy: "Self Check-in",
    checkOutAt: "2024-10-14 05:20 PM",
    checkOutBy: "Self Check-out",
  },
  {
    id: "2021-00008",
    name: "Isabella Cruz",
    email: "icruz@umindanao.edu.ph",
    checkInAt: "2024-10-14 08:35 AM",
    checkInBy: "Admin User",
    checkOutAt: "2024-10-14 04:55 PM",
    checkOutBy: "Admin User",
  },
  {
    id: "2021-00009",
    name: "Diego Fernandez",
    email: "dfernandez@umindanao.edu.ph",
    checkInAt: "2024-10-14 08:55 AM",
    checkInBy: "Self Check-in",
    checkOutAt: "2024-10-14 05:25 PM",
    checkOutBy: "Self Check-out",
  },
  {
    id: "2021-00010",
    name: "Lucia Martinez",
    email: "lmartinez@umindanao.edu.ph",
    checkInAt: "2024-10-14 08:25 AM",
    checkInBy: "Admin User",
    checkOutAt: "2024-10-14 04:40 PM",
    checkOutBy: "Admin User",
  },
  {
    id: "2021-00011",
    name: "Roberto Gonzales",
    email: "rgonzales@umindanao.edu.ph",
    checkInAt: "2024-10-14 08:40 AM",
    checkInBy: "Self Check-in",
    checkOutAt: "2024-10-14 05:10 PM",
    checkOutBy: "Self Check-out",
  },
  {
    id: "2021-00012",
    name: "Carmen Lopez",
    email: "clopez@umindanao.edu.ph",
    checkInAt: "2024-10-14 08:55 AM",
    checkInBy: "Admin User",
    checkOutAt: "2024-10-14 04:35 PM",
    checkOutBy: "Admin User",
  },
]

export default function AttendancePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center gap-4 md:gap-8">
            <Sparkles className="size-5 md:size-6 text-primary" />
            <nav className="hidden md:flex items-center gap-6">
              <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                <Calendar className="size-4" />
                Events
              </button>
              <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <Calendar className="size-4" />
                Calendars
              </button>
              <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <Search className="size-4" />
                Discover
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <span className="hidden sm:block text-xs md:text-sm text-muted-foreground font-medium">11:31 AM GMT+8</span>
            <Button className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-sm text-sm md:text-base px-3 md:px-4">
              Create Event
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted size-8 md:size-10">
              <Search className="size-4 md:size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted size-8 md:size-10">
              <Bell className="size-4 md:size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted size-8 md:size-10">
              <User className="size-4 md:size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground mt-1 md:mt-2">12</p>
              </div>
              <div className="size-10 md:size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="size-5 md:size-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Checked In</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground mt-1 md:mt-2">12</p>
              </div>
              <div className="size-10 md:size-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Calendar className="size-5 md:size-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Checked Out</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground mt-1 md:mt-2">12</p>
              </div>
              <div className="size-10 md:size-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Calendar className="size-5 md:size-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">Attendance Records</h1>
            <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-lg">
              Manage student check-in and check-out records
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-sm gap-2 w-full sm:w-auto">
            <Download className="size-4" />
            Export Data
          </Button>
        </div>

        <AttendanceDataTable columns={columns} data={attendanceData} />
      </main>
    </div>
  )
}
