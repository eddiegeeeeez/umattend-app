'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Menu, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatGmtOffset = (date: Date) => {
    // getTimezoneOffset returns minutes behind UTC (e.g., -480 for GMT+8)
    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const abs = Math.abs(offsetMinutes);
    const hours = Math.floor(abs / 60);
    const minutes = abs % 60;
    return `GMT${sign}${hours}${minutes ? `:${minutes.toString().padStart(2, '0')}` : ''}`;
  };

  const formatTime = (date: Date) => {
    const timeStr = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', hour12: true }).format(date);
    return `${timeStr} ${formatGmtOffset(date)}`;
  };

  return (
    <header className="border-border/40 bg-background sticky top-0 z-50 border-b">
      <div className="container mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <button className="hover:bg-muted rounded-md p-2 transition-colors md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={18} />
          </button>

          <Link href="/dashboard" className="flex items-center gap-1.5">
            <div className="bg-primary h-5 w-5 rounded" />
            <span className="text-foreground text-sm font-medium">UMAttend</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/create-event">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground hidden cursor-pointer font-medium sm:flex">
                Create Event
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-muted-foreground hidden text-xs lg:inline">{formatTime(now)}</span>

          {/* <Button className="bg-transparent hover:bg-muted hidden rounded-md p-1.5 transition-colors sm:block">
            <Search size={18} color="gray" />
          </Button> */}

          <Popover>
            <PopoverTrigger>
              <Button className="hover:bg-muted hidden rounded-md bg-transparent p-1.5 transition-colors sm:block" aria-label="Notifications">
                <Bell size={18} color="gray" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 rounded-xl border border-gray-200 p-0 shadow-lg">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <span className="text-foreground text-sm font-semibold">Notifications</span>
                <button className="text-primary text-xs hover:underline">Mark all as read</button>
              </div>
              <div className="max-h-72 divide-y divide-gray-100 overflow-y-auto">
                {/* Example notification list, replace with dynamic data */}
                {/* <div className="flex flex-col items-center justify-center py-8 text-muted-foreground text-sm">
                  <Bell size={32} className="opacity-30" />
                  <span className="mb-2">No new notifications</span>
                </div> */}

                <div className="hover:bg-muted/50 flex cursor-pointer items-start gap-3 px-4 py-3">
                  <div className="bg-primary/10 mt-0.5 rounded-full p-1">
                    <Bell size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-foreground mb-0.5 text-xs font-medium">Event Reminder</div>
                    <div className="text-muted-foreground text-xs">Tech Innovation Summit starts in 1 hour.</div>
                    <div className="text-muted-foreground mt-1 text-[10px]">2m ago</div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <Button className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">U</Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 rounded-xl border border-gray-200 p-0 shadow-lg">
              <div className="flex items-center gap-3 border-b px-4 py-3">
                <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">U</div>
                <div className="flex min-w-0 flex-col">
                  <span className="text-foreground truncate text-sm font-semibold">John Kyle Dellatan</span>
                  <span className="text-muted-foreground truncate text-xs">j.dellatan.534126@umindanao.edu.ph</span>
                </div>
              </div>
              <div className="flex flex-col py-1">
                <button className="hover:bg-muted px-4 py-3 text-left text-xs transition-colors">View Profile</button>
                <button className="hover:bg-muted px-4 py-3 text-left text-xs transition-colors">Sign Out</button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[280px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <div className="bg-primary h-5 w-5 rounded" />
              UMAttend
            </SheetTitle>
          </SheetHeader>
          <nav className="mx-3 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-muted-foreground text-sm">{formatTime(now)}</span>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Search"
                  className="hover:bg-muted rounded-md p-2"
                  onClick={() => {
                    // close sheet for now; hook search panel/modal here
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Search size={18} color="gray" />
                </button>
                <button
                  aria-label="Notifications"
                  className="hover:bg-muted rounded-md p-2"
                  onClick={() => {
                    // close sheet for now; hook notifications panel here
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Bell size={18} color="gray" />
                </button>
              </div>
            </div>

            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full justify-start font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Plus size={16} className="mr-2" />
              Create Event
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
