import { Calendar, Search, Bell, Sparkles } from "lucide-react"
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
      {/* Header Navigation */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Sparkles className="h-5 w-5 text-primary" />
            <nav className="flex items-center gap-6">
              <Link
                href="#"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <Calendar className="h-4 w-4" />
                Events
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <Calendar className="h-4 w-4" />
                Calendars
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <Search className="h-4 w-4" />
                Discover
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">11:31 AM GMT+8</span>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">Create Event</Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Profile Avatar and Info */}
          <Avatar className="h-32 w-32 border-4 border-border shadow-lg">
            <AvatarImage src="/anime-avatar-white-hair.jpg" />
            <AvatarFallback className="text-2xl">MJ</AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Mario Jr Inguito</h1>
            <p className="text-muted-foreground">@mauro</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Joined July 2024</span>
          </div>

          <div className="flex items-center gap-6 text-center">
            <div>
              <span className="text-2xl font-bold text-foreground">2</span>
              <p className="text-sm text-muted-foreground">Hosted</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="text-2xl font-bold text-foreground">7</span>
              <p className="text-sm text-muted-foreground">Attended</p>
            </div>
          </div>
        </div>

        {/* Past Events Section */}
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-foreground">Past Events</h2>
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-4 w-4 rounded-full bg-muted" />
                    <span>By {event.author}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
