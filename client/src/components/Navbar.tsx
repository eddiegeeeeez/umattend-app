'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Menu, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { NavUser } from './nav-user';
import { Button } from './ui/button';
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

  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg'
    }
  };

  return (
    <header className="border-border/40 sticky top-0 z-50 mx-4 border-b backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between sm:px-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <button className="hover:bg-muted rounded-md p-2 transition-colors md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={18} />
          </button>

          <Link href="/dashboard" className="flex items-center gap-1.5">
            <h1 className="text-3xl font-bold text-balance">
              <span className="text-yellow-500">UM</span>
              <span className="text-foreground">Attend</span>
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-5">
          <Link href="/create-event" className="font-medium hover:underline">
            Create Event
          </Link>

          <span className="text-muted-foreground hidden lg:inline">{formatTime(now)}</span>

          <NavUser user={data.user} />
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
