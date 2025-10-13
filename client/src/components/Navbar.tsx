'use client';

import React, { useState, useEffect } from 'react';
import { Bell, CalendarMinus2, Menu, Plus, Search, TicketSlash } from 'lucide-react';
import Link from 'next/link';
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
            <Link href="/dashboard" className="text-foreground hover:text-foreground/80 flex items-center gap-1.5 text-sm font-medium transition-colors">
              <TicketSlash size={16} color="gray" />
              Events
            </Link>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground hidden font-medium sm:flex">
              Create Event
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-muted-foreground hidden text-xs lg:inline">{formatTime(now)}</span>

          <button className="hover:bg-muted hidden rounded-md p-1.5 transition-colors sm:block">
            <Search size={18} color="gray" />
          </button>
          <button className="hover:bg-muted hidden rounded-md p-1.5 transition-colors sm:block">
            <Bell size={18} color="gray" />
          </button>
          <button className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">U</button>
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
          <nav className="mx-3 mt-8 flex flex-col gap-4">
            <Link
              href="/dashboard"
              className="bg-muted text-foreground flex items-center gap-3 rounded-md px-3 py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <TicketSlash size={18} color="gray" />
              Events
            </Link>
            <div className="border-border/40 my-4 border-t" />
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
