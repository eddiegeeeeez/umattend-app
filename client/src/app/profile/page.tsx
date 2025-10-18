'use client';

import { useState } from 'react';
import { useRef, useEffect, useMemo } from 'react';
import { Calendar, Mail, Users } from 'lucide-react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import ProfileSkeleton from '@/components/skeletons/profile-skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/authStore';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  const ref = useRef<HTMLDivElement>(null);

  // Generate QR code data on client side only to avoid hydration mismatch
  const QRCode = useMemo(() => {
    if (typeof window === 'undefined') return '';

    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const hour = String(now.getHours()).padStart(2, '0');
    const time = `${month}${date}${year}${hour}`;
    return btoa(`${time}${String(user?.student_id)}`);
  }, [user?.student_id]);

  const options: Options = useMemo(
    () => ({
      type: 'canvas',
      shape: 'square',
      width: 170,
      height: 170,
      margin: 0,
      qrOptions: {
        mode: 'Byte',
        errorCorrectionLevel: 'H'
      },
      imageOptions: {
        saveAsBlob: true,
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 0
      },
      dotsOptions: { type: 'rounded', color: '#000000', roundSize: true },
      backgroundOptions: { round: 0, color: '#fdfcf1' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#f3cb00' },
      cornersDotOptions: { type: 'dot', color: '#000000' },
      data: `${QRCode}`
    }),
    [QRCode]
  );

  const qrCode = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new QRCodeStyling(options);
    }
    return null;
  }, [options]);

  useEffect(() => {
    if (!qrCode) return;
    if (ref.current && !ref.current.hasChildNodes()) {
      qrCode.append(ref.current);
    }
    qrCode.update(options);
  }, [qrCode, options]);

  const toTitleCase = (str: string) =>
    str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase();
  };
  const [activeTab, setActiveTab] = useState('attended');

  const hostedEvents = [
    {
      id: 1,
      title: 'Annual Tech Conference 2025',
      image: '/dark-green-striped-pattern.jpg',
      author: 'Mario Jr Inguito',
      date: 'Sun, Mar 15, 9:30 AM',
      attendees: 342,
      capacity: 500
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      image: '/colorful-gradient-abstract.png',
      author: 'Mario Jr Inguito',
      date: 'Sat, Feb 20, 2:00 PM',
      attendees: 89,
      capacity: 150
    }
  ];

  const attendedEvents = [
    {
      id: 1,
      title: 'a',
      image: '/dark-green-striped-pattern.jpg',
      author: 'Mario Jr Inguito',
      date: 'Sun, Oct 5, 6:30 AM'
    },
    {
      id: 2,
      title: 'test',
      image: '/colorful-gradient-abstract.png',
      author: 'Mario Jr Inguito',
      date: 'Sat, Oct 4, 7:00 PM'
    }
  ];

  if (!user) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Hero Profile Card */}
        <div className="border-border from-card to-card/50 relative mb-10 overflow-hidden rounded-2xl border bg-gradient-to-br shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.08),transparent_60%)]" />
          <div className="relative px-8 py-12">
            <div className="flex flex-col items-start gap-10 lg:flex-row">
              {/* Left Column - Avatar and Basic Info */}
              <div className="flex w-full flex-col items-center justify-between gap-8 lg:w-80">
                <div className="flex flex-col items-center gap-5">
                  <Avatar className="border-background ring-primary/20 h-36 w-36 border-4 shadow-xl ring-2">
                    <AvatarImage src={user?.profile_picture || undefined} />
                    <AvatarFallback className="bg-foreground text-background text-xl font-semibold">{getInitials(user?.name || '')}</AvatarFallback>
                  </Avatar>
                  <div className="w-full text-center lg:text-left">
                    <h1 className="text-foreground mb-2 text-center text-2xl font-bold sm:text-3xl">{toTitleCase(user?.name || '')}</h1>
                    <p className="text-muted-foreground mb-1 text-center text-sm font-bold">{user?.student_id}</p>
                    <p className="text-muted-foreground mb-2 text-center text-sm">{user?.department}</p>
                    <p className="text-muted-foreground mb-2 text-center text-sm">{user?.program}</p>
                    {/* Stats Cards */}
                  </div>
                </div>
                <div className="grid w-full grid-cols-2 gap-3">
                  <div className="border-border bg-background/90 min-w-0 rounded-xl border p-4 text-center shadow-sm transition-shadow hover:shadow-md">
                    <div className="text-foreground mb-1 text-xl font-bold">2</div>
                    <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Hosted</div>
                  </div>

                  <div className="border-border bg-background/90 min-w-0 rounded-xl border p-4 text-center shadow-sm transition-shadow hover:shadow-md">
                    <div className="text-foreground mb-1 text-xl font-bold">7</div>
                    <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Attended</div>
                  </div>
                </div>
              </div>
              {/* Right Column - QR Code and Actions */}
              <div className="flex w-full flex-1 flex-col gap-8">
                {/* QR Code Card */}
                <div className="border-border bg-background/90 rounded-xl border p-6 shadow-lg">
                  <div className="flex flex-col items-center gap-6 sm:flex-row">
                    <div className="flex-shrink-0">
                      <div
                        ref={ref}
                        className="border-primary/30 bg-primary/5 pointer-events-none flex h-44 w-44 items-center justify-center rounded-xl border-2 border-dashed select-none"
                        onContextMenu={(e) => e.preventDefault()}
                        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-foreground mb-2 text-xl font-bold">Your Digital Pass</h3>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        Use this QR code to quickly check in and out of events. Event organizers can scan it to verify your attendance.
                      </p>
                    </div>
                  </div>
                  <div className="bg-primary/40 mt-2 rounded-md p-2">
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      This QR code updates periodically for security reasons. Always use the latest version shown in your account.
                    </p>
                  </div>
                </div>
                {/* Quick Info Cards */}
                <div className="grid gap-4">
                  <div className="border-border bg-background/90 hover:border-primary/50 flex min-w-0 items-center gap-3 rounded-xl border p-4 shadow-sm transition-all hover:shadow-md">
                    <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                      <Mail className="text-primary h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Email</div>
                      <div className="text-foreground text-sm font-semibold break-all">{user?.umindanao_email}</div>
                    </div>
                  </div>
                  <div className="border-border bg-background/90 hover:border-primary/50 flex min-w-0 items-center gap-3 rounded-xl border p-4 shadow-sm transition-all hover:shadow-md">
                    <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                      <Users className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Member Type</div>
                      <div className="text-foreground text-sm font-semibold">{toTitleCase(user?.role || '')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="text-muted-foreground mb-6 inline-flex h-11 items-center justify-center gap-x-2 rounded-lg bg-neutral-200 p-1">
            <TabsTrigger value="attended" className="rounded-md px-4 py-2 text-sm font-medium">
              <Calendar className="mr-2 h-4 w-4" />
              Attended Events
            </TabsTrigger>
            <TabsTrigger value="hosted" className="rounded-md px-4 py-2 text-sm font-medium">
              <Calendar className="mr-2 h-4 w-4" />
              Hosted Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attended" className="space-y-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-foreground text-2xl font-bold">Attended Events</h2>
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                View All
              </Button>
            </div>

            {attendedEvents.length === 0 ? (
              <div className="border-border bg-card/50 flex flex-col items-center justify-center rounded-lg border p-8 py-12 text-center">
                <Calendar className="text-muted-foreground mb-4 h-12 w-12" />
                <h3 className="text-foreground mb-2 text-lg font-semibold">No attended events yet</h3>
                <p className="text-muted-foreground text-sm">Events you attend will appear here</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {attendedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group border-border bg-card hover:border-primary/50 relative overflow-hidden rounded-xl border shadow-md transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex flex-col gap-4 p-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-foreground group-hover:text-primary mb-2 truncate text-lg font-bold transition-colors">{event.title}</h3>
                        <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                          <div className="from-primary/20 to-primary/5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br">
                            <div className="bg-primary h-2 w-2 rounded-full" />
                          </div>
                          <span className="truncate">By {event.author}</span>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 text-sm">
                          <Calendar className="text-primary h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="hosted" className="space-y-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-foreground text-2xl font-bold">Hosted Events</h2>
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                View All
              </Button>
            </div>

            {hostedEvents.length === 0 ? (
              <div className="border-border bg-card/50 flex flex-col items-center justify-center rounded-lg border p-8 py-12 text-center">
                <Calendar className="text-muted-foreground mb-4 h-12 w-12" />
                <h3 className="text-foreground mb-2 text-lg font-semibold">No hosted events yet</h3>
                <p className="text-muted-foreground mb-4 text-sm">Create your first event to get started</p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Create Event</Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {hostedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group border-border bg-card hover:border-primary/50 relative overflow-hidden rounded-xl border shadow-md transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex flex-col gap-4 p-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-foreground group-hover:text-primary mb-2 truncate text-lg font-bold transition-colors">{event.title}</h3>
                        <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                          <div className="from-primary/20 to-primary/5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br">
                            <div className="bg-primary h-2 w-2 rounded-full" />
                          </div>
                          <span className="truncate">By {event.author}</span>
                        </div>
                        <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                          <Calendar className="text-primary h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 text-xs">
                          <Users className="text-primary h-3 w-3" />
                          <span>
                            {event.attendees} / {event.capacity} attendees
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProfilePage;
