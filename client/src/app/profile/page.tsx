import React from 'react';
import { Calendar, Search, Bell, Sparkles, QrCode, Mail, Users } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const page = () => {
  const pastEvents = [
    {
      id: 1,
      title: 'a',
      author: 'Mario Jr Inguito',
      date: 'Sun, Oct 5, 6:30 AM'
    },
    {
      id: 2,
      title: 'test',
      author: 'Mario Jr Inguito',
      date: 'Sat, Oct 4, 7:00 PM'
    }
  ];
  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Hero Profile Card */}
        <div className="border-border from-card to-card/50 relative mb-10 overflow-hidden rounded-2xl border bg-gradient-to-br shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.08),transparent_60%)]" />
          <div className="relative px-8 py-12">
            <div className="flex flex-col items-start gap-10 lg:flex-row">
              {/* Left Column - Avatar and Basic Info */}
              <div className="flex w-full flex-col items-center gap-8 lg:w-80 lg:items-start">
                <Avatar className="border-background ring-primary/20 h-36 w-36 border-4 shadow-xl ring-2">
                  <AvatarImage src="/anime-avatar-white-hair.jpg" />
                  <AvatarFallback className="text-3xl font-bold">MJ</AvatarFallback>
                </Avatar>
                <div className="w-full text-center lg:text-left">
                  <h1 className="text-foreground mb-2 text-2xl font-bold text-balance sm:text-3xl">Mario Jr Inguito</h1>
                  <div className="text-muted-foreground mb-6 flex items-center justify-center gap-2 text-sm lg:justify-start">
                    <Calendar className="text-primary h-4 w-4" />
                    <span>Joined July 2024</span>
                  </div>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
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
              </div>
              {/* Right Column - QR Code and Actions */}
              <div className="flex w-full flex-1 flex-col gap-8">
                {/* QR Code Card */}
                <div className="border-border bg-background/90 rounded-xl border p-6 shadow-lg">
                  <div className="flex flex-col items-center gap-6 sm:flex-row">
                    <div className="flex-shrink-0">
                      <div className="border-primary/30 bg-primary/5 flex h-44 w-44 items-center justify-center rounded-xl border-2 border-dashed">
                        <QrCode className="text-primary/60 h-20 w-20" />
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-foreground mb-2 text-xl font-bold">Your Digital Pass</h3>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        Use this QR code to quickly check in to events. Event organizers can scan this to verify your attendance.
                      </p>
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                        Download QR Code
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Quick Info Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border-border bg-background/90 hover:border-primary/50 flex min-w-0 items-center gap-3 rounded-xl border p-4 shadow-sm transition-all hover:shadow-md">
                    <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                      <Mail className="text-primary h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Email</div>
                      <div className="text-foreground text-sm font-semibold break-all">mauro@umindanao.edu.ph</div>
                    </div>
                  </div>
                  <div className="border-border bg-background/90 hover:border-primary/50 flex min-w-0 items-center gap-3 rounded-xl border p-4 shadow-sm transition-all hover:shadow-md">
                    <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                      <Users className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Member Type</div>
                      <div className="text-foreground text-sm font-semibold">Student</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-foreground text-xl font-semibold">Past Events</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80 cursor-pointer">
              View All
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="group border-border bg-card hover:border-primary/50 flex flex-col justify-center rounded-xl border px-6 py-5 shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-foreground group-hover:text-primary mb-1 flex items-center gap-2 truncate text-lg font-bold transition-colors">
                    {event.title}
                  </h3>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Users className="text-primary h-4 w-4" />
                    <span className="truncate">By {event.author}</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Calendar className="text-primary h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
