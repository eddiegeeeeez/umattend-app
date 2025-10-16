'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { getUserOptions } from '@/api/client/@tanstack/react-query.gen';
import { useAuthStore } from '@/store/authStore';

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [now, setNow] = useState<Date>(new Date());
  const updateUser = useAuthStore((state) => state.updateUser);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatGmtOffset = (date: Date) => {
    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const abs = Math.abs(offsetMinutes);
    const hours = Math.floor(abs / 60);
    const minutes = abs % 60;
    return `GMT${sign}${hours}${minutes ? `:${minutes.toString().padStart(2, '0')}` : ''}`;
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formatTime = (date: Date) => {
    const timeStr = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', hour12: true }).format(date);
    return `${timeStr} ${formatGmtOffset(date)}`;
  };

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Fetch user data after authentication
  const { data: userData } = useQuery({
    ...getUserOptions(),
    enabled: isAuthenticated(),
    staleTime: Infinity // Don't refetch unless manually invalidated
  });

  // Update user data in store when fetched (merge with existing JWT data)
  useEffect(() => {
    if (userData?.success && userData?.data?.user) {
      const apiUser = userData.data.user;
      const currentUser = useAuthStore.getState().user;

      // Merge API data with existing JWT data (preserve student_id from JWT)
      updateUser({
        user_id: apiUser.id,
        student_id: currentUser?.student_id, // Keep from JWT
        umindanao_email: apiUser.umindanao_email || currentUser?.umindanao_email,
        name: apiUser.name || currentUser?.name,
        department: apiUser.department || currentUser?.department,
        program: apiUser.program || currentUser?.program,
        role: (apiUser.role as 'student' | 'admin' | 'csg' | 'instructor' | 'organizer') || currentUser?.role || 'student',
        done_onboarding: apiUser.done_onboarding ?? currentUser?.done_onboarding ?? false,
        profile_picture: apiUser.profile_picture || currentUser?.profile_picture || ''
      });
    }
  }, [userData, updateUser]);

  const studentData = {
    name: user?.name || 'User',
    idNumber: user?.student_id?.toString() || 'N/A',
    email: user?.umindanao_email || 'N/A'
  };

  const logoutUser = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="border-border bg-background sticky top-0 z-50 border-b">
      <div className="container mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="hover:bg-muted rounded-md bg-transparent p-2 transition-colors md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={18} />
          </div>

          <Link href="/events" className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold text-balance">
              <span className="text-yellow-500">UM</span>
              <span className="text-foreground">Attend</span>
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-6 md:flex">
            {user?.role && ['admin', 'organizer', 'csg'].includes(user.role) && (
              <Link href="/events/new">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground hidden cursor-pointer font-medium sm:flex">
                  Create Event
                </Button>
              </Link>
            )}
          </nav>

          <span className="text-muted-foreground hidden text-xs lg:inline">{formatTime(now)}</span>

          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profile_picture || undefined} />
                <AvatarFallback className="bg-foreground text-background text-sm font-semibold">{getInitials(studentData.name)}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-64 rounded-xl border border-gray-200 p-0 shadow-lg">
              <div className="flex items-center gap-3 border-b px-4 py-3">
                <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profile_picture || undefined} alt={studentData.name} />
                    <AvatarFallback className="bg-foreground text-background text-sm font-semibold">{getInitials(studentData.name)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="text-foreground truncate text-sm font-semibold">{studentData.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{studentData.email}</span>
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
                  onClick={logoutUser}
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
            </div>

            {user?.role && ['admin', 'organizer', 'csg'].includes(user.role) && (
              <Link href="/events/new" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full font-medium">
                  <Plus size={16} className="mr-2" />
                  Create Event
                </Button>
              </Link>
            )}
            <div className="border-border/40 border-b" />
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
