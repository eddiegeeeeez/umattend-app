import { Calendar, Search, Bell, Sparkles, QrCode, Mail, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function ProfilePage() {
  const pastEvents = [
    {
      id: 1,
      title: "a",
      image: "/dark-green-striped-pattern.jpg",
      author: "Mario Jr Inguito",
      date: "Sun, Oct 5, 6:30 AM",
    },
    {
      id: 2,
      title: "test",
      image: "/colorful-gradient-abstract.png",
      author: "Mario Jr Inguito",
      date: "Sat, Oct 4, 7:00 PM",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:p-12">
        {/* Hero Profile Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 shadow-xl mb-8">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.1),transparent_50%)]" />

          <div className="relative px-6 sm:p-8 py-8 sm:p-12">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Left Column - Avatar and Basic Info */}
              <div className="flex flex-col items-center lg:items-start gap-6 lg:w-80">
                <Avatar className="h-40 w-40 border-4 border-background shadow-2xl ring-4 ring-primary/20">
                  <AvatarImage src="/anime-avatar-white-hair.jpg" />
                  <AvatarFallback className="text-3xl font-bold">MJ</AvatarFallback>
                </Avatar>

                <div className="text-center lg:text-left w-full">
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-balance">Mario Jr Inguito</h1>
                  <p className="text-lg text-muted-foreground mb-4">@mauro</p>

                  <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground mb-6">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Joined July 2024</span>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border bg-background/80 backdrop-blur-sm p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-3xl font-bold text-foreground mb-1">2</div>
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Hosted</div>
                    </div>
                    <div className="rounded-xl border border-border bg-background/80 backdrop-blur-sm p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-3xl font-bold text-foreground mb-1">7</div>
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Attended</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - QR Code and Actions */}
              <div className="flex-1 flex flex-col gap-6 w-full">
                {/* QR Code Card */}
                <div className="rounded-xl border border-border bg-background/80 backdrop-blur-sm p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5">
                        <QrCode className="h-24 w-24 text-primary/60" />
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-foreground mb-2">Your Digital Pass</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        Use this QR code to quickly check in to events. Event organizers can scan this to verify your
                        attendance.
                      </p>
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                      >
                        Download QR Code
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-border bg-background/80 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition-all hover:border-primary/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</div>
                        <div className="text-sm font-semibold text-foreground">mauro@umindanao.edu.ph</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-background/80 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition-all hover:border-primary/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Member Type
                        </div>
                        <div className="text-sm font-semibold text-foreground">Student</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Past Events</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              View All
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary/50"
              >
                <div className="flex gap-4 p-4">
                  <div className="relative flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="h-24 w-24 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground mb-2 truncate group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="truncate">By {event.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
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
  )
}
