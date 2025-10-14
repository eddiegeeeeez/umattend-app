'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Menu, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifSheetOpen, setIsNotifSheetOpen] = useState(false);
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

  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg'
    }
  };

  return (
    <header className="border-border/40 sticky top-0 z-50 mx-4 mx-auto max-w-4xl border-b backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between sm:px-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="hover:bg-muted rounded-md bg-transparent p-2 transition-colors md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={18} />
          </div>

          <Link href="/dashboard" className="flex items-center gap-1.5">
            <h1 className="text-3xl font-bold text-balance">
              <span className="text-yellow-500">UM</span>
              <span className="text-foreground">Attend</span>
            </h1>
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

          {/* <Popover>
            <PopoverTrigger>
              <div className="hover:bg-muted hidden rounded-md bg-transparent p-1.5 transition-colors sm:block" aria-label="Notifications">
                <Bell size={18} color="gray" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 rounded-xl border border-gray-200 p-0 shadow-lg">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <span className="text-foreground text-sm font-semibold">Notifications</span>
                <div className="text-primary cursor-pointer text-xs hover:underline">Mark all as read</div>
              </div>
              <div className="max-h-72 divide-y divide-gray-100 overflow-y-auto">
                

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
          </Popover> */}

          <Popover>
            <PopoverTrigger>
              <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">U</div>
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
                <div
                  className="hover:bg-muted cursor-pointer justify-start bg-transparent px-4 py-3 text-left text-xs font-normal transition-colors"
                  onClick={() => router.push('/profile')}
                >
                  View Profile
                </div>
                <div
                  className="hover:bg-muted cursor-pointer justify-start bg-transparent px-4 py-3 text-left text-xs font-normal transition-colors"
                  onClick={() => router.push('/')}
                >
                  Sign Out
                </div>
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
              {/* <div className="flex items-center gap-2">
                <div
                  aria-label="Notifications"
                  className="hover:bg-muted rounded-md p-2"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => setIsNotifSheetOpen(true), 300); // wait for menu to close
                  }}
                >
                  <Bell size={18} color="gray" />
                </div>
              </div> */}
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
      {/* <Sheet open={isNotifSheetOpen} onOpenChange={setIsNotifSheetOpen}>
        <SheetContent side="right" className="w-[340px] max-w-full p-0">
          <div className="flex w-full min-w-0 flex-wrap items-center justify-between gap-2 border-b px-4 py-3 sm:flex-nowrap">
            <span className="text-foreground min-w-0 flex-shrink flex-grow truncate text-base font-semibold break-words">Notifications</span>
          </div>
          <div className="max-h-[80vh] divide-y divide-gray-100 overflow-y-auto">
            <div className="hover:bg-muted/50 flex cursor-pointer items-start gap-3 px-4 py-3">
              <div className="bg-primary/10 mt-0.5 rounded-full p-1">
              </div>
              <div className="flex-1">
                <div className="text-foreground mb-0.5 text-xs font-medium">Event Reminder</div>
                <div className="text-muted-foreground text-xs">Tech Innovation Summit starts in 1 hour.</div>
                <div className="text-muted-foreground mt-1 text-[10px]">3m ago</div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet> */}
    </header>
  );
};

export default Navbar;
