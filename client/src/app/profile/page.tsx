import { Calendar, QrCode, Mail, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const pastEvents = [
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

  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:p-12 sm:px-6">
        {/* Hero Profile Card */}
        <div className="border-border from-card to-card/50 relative mb-8 overflow-hidden rounded-2xl border bg-gradient-to-br shadow-xl">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.1),transparent_50%)]" />

          <div className="relative px-6 py-8 sm:p-8 sm:p-12">
            <div className="flex flex-col items-center gap-8 lg:flex-row">
              {/* Left Column - Avatar and Basic Info */}
              <div className="flex flex-col items-center gap-6 lg:w-80 lg:items-start">
                <Avatar className="border-background ring-primary/20 h-40 w-40 border-4 shadow-2xl ring-4">
                  <AvatarImage src="/anime-avatar-white-hair.jpg" />
                  <AvatarFallback className="text-3xl font-bold">MJ</AvatarFallback>
                </Avatar>

                <div className="w-full text-center lg:text-left">
                  <h1 className="text-foreground mb-2 text-3xl font-bold text-balance sm:text-4xl">Mario Jr Inguito</h1>
                  <p className="text-muted-foreground mb-4 text-lg">@mauro</p>

                  <div className="text-muted-foreground mb-6 flex items-center justify-center gap-2 text-sm lg:justify-start">
                    <Calendar className="text-primary h-4 w-4" />
                    <span>Joined July 2024</span>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border-border bg-background/80 rounded-xl border p-4 text-center shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
                      <div className="text-foreground mb-1 text-3xl font-bold">2</div>
                      <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Hosted</div>
                    </div>
                    <div className="border-border bg-background/80 rounded-xl border p-4 text-center shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
                      <div className="text-foreground mb-1 text-3xl font-bold">7</div>
                      <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Attended</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - QR Code and Actions */}
              <div className="flex w-full flex-1 flex-col gap-6">
                {/* QR Code Card */}
                <div className="border-border bg-background/80 rounded-xl border p-6 shadow-lg backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-6 sm:flex-row">
                    <div className="flex-shrink-0">
                      <div className="border-primary/30 bg-primary/5 flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed">
                        <QrCode className="text-primary/60 h-24 w-24" />
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
                  <div className="border-border bg-background/80 hover:border-primary/50 rounded-xl border p-4 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                        <Mail className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Email</div>
                        <div className="text-foreground text-sm font-semibold">mauro@umindanao.edu.ph</div>
                      </div>
                    </div>
                  </div>
                  <div className="border-border bg-background/80 hover:border-primary/50 rounded-xl border p-4 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
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
        </div>

        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-foreground text-2xl font-bold">Past Events</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              View All
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="group border-border bg-card hover:border-primary/50 relative overflow-hidden rounded-xl border shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex gap-4 p-4">
                  <div className="relative flex-shrink-0 overflow-hidden rounded-lg">
                    {/* <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="h-24 w-24 object-cover transition-transform duration-300 group-hover:scale-110"
                    /> */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

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
        </div>
      </main>
    </div>
  );
}
