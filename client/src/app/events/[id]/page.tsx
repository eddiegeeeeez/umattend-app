import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Mock data - replace with actual data fetching
async function getEventData(id: string) {
  // Simulate API call
  return {
    id,
    title: 'APTOS HOURS: Davao City',
    description:
      'Join us for Aptos Hours, a relaxed and informal gathering for builders, enthusiasts, and curious minds exploring the Aptos ecosystem! Hosted by Hiraya Network, this is your chance to connect, collaborate, and chat about all things Aptos—fueled by drinks (and maybe some snacks). No formal agenda, just great vibes.',
    date: 'Saturday, April 26',
    year: 2025,
    time: '5:00 PM - 8:00 PM GMT+8',
    venue: 'The Bloom Coffee & Start-Up Space',
    location: 'Davao City, Davao Region',
    status: 'joined', // 'joined' | 'available' | 'full'
    attendees: 42,
    maxAttendees: 50,
    organizer: {
      name: 'Hiraya Network',
      avatar: '/desk-organizer.png'
    },
    whyAttend: [
      {
        emoji: '🤝',
        title: 'Meet & Greet',
        description: 'Connect with developers, founders, and community members building (or planning to build) on Aptos.'
      },
      {
        emoji: '🚀',
        title: 'Onboard with Hiraya',
        description: 'Learn how you can contribute to or collaborate with Hiraya Network and the Aptos ecosystem.'
      },
      {
        emoji: '💡',
        title: "What's Next for Aptos?",
        description: 'Share ideas, discuss upcoming developments, and explore opportunities.'
      },
      {
        emoji: '🌐',
        title: 'Beyond Web3',
        description: 'Network with non-Web3 communities and bridge the gap between traditional and decentralized spaces.'
      }
    ],
    whatToExpect: [
      'Drinks on us + light bites',
      'Open discussions—no structured program, just organic conversations',
      'A welcoming space for both newbies and veterans'
    ],
    socialLinks: {
      facebook: 'https://www.facebook.com/hirayanetwork',
      twitter: 'https://x.com/hirayanetwork'
    }
  };
}

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventData(id);

  if (!event) {
    notFound();
  }

  const dateMonth = event.date.split(' ')[1];
  const dateDay = event.date.split(' ')[2].replace(',', '');

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="border-border bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
              {/* Date Badge */}
              <div className="flex-shrink-0">
                <div className="border-border bg-card flex h-20 w-20 flex-col items-center justify-center rounded-lg border-2 text-center shadow-sm">
                  <span className="text-muted-foreground text-xs font-semibold uppercase">{dateMonth}</span>
                  <span className="text-foreground text-2xl font-bold">{dateDay}</span>
                </div>
              </div>

              {/* Event Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-foreground text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">{event.title}</h1>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {event.date}, {event.year}
                    </span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.attendees}/{event.maxAttendees} attending
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-foreground font-medium">{event.venue}</p>
                    <p className="text-muted-foreground">{event.location}</p>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {event.status === 'joined' ? (
                    <Badge variant="secondary" className="px-4 py-2 text-sm">
                      ✓ You&apos;re attending
                    </Badge>
                  ) : (
                    <Button size="lg" className="font-semibold">
                      RSVP Now
                    </Button>
                  )}
                  <Button size="lg" variant="outline">
                    Share Event
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Status Card - Only show if joined */}
          {event.status === 'joined' && (
            <Card className="border-primary/20 bg-primary/5 border-2">
              <CardContent className="flex items-start gap-4 p-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={event.organizer.avatar || '/placeholder.svg'} />
                  <AvatarFallback>HN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-foreground font-semibold">Thank You for Joining</h3>
                  <p className="text-muted-foreground text-sm">We hope you enjoyed the event!</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* About Event */}
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-bold">About Event</h2>
            <div className="prose prose-sm text-foreground/90 max-w-none leading-relaxed">
              <p>{event.description}</p>
            </div>
          </section>

          <Separator />

          {/* Why Attend */}
          <section className="space-y-6">
            <h2 className="text-foreground text-2xl font-bold">Why Attend?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {event.whyAttend.map((item, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl" role="img" aria-label={item.title}>
                        {item.emoji}
                      </span>
                      <div className="space-y-1">
                        <h3 className="text-foreground font-semibold">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator />

          {/* What to Expect */}
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-bold">What to Expect</h2>
            <ul className="space-y-3">
              {event.whatToExpect.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-0.5">✓</span>
                  <span className="text-foreground/90 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-foreground/90 pt-2 leading-relaxed">
              Whether you&apos;re deep into Aptos or just Web3-curious, come hang out, ask questions, and meet like-minded folks!
            </p>
          </section>

          <Separator />

          {/* Call to Action */}
          <Card className="border-primary bg-primary/5 border-2">
            <CardContent className="p-6 text-center">
              <p className="text-foreground mb-4 text-lg font-semibold">🔗 RSVP now—before the coffee runs out!</p>
              {event.status !== 'joined' && (
                <Button size="lg" className="font-semibold">
                  Reserve Your Spot
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          <section className="space-y-4"></section>

          <Separator />

          {/* Location */}
          <section className="space-y-4"></section>
        </div>
      </main>
    </div>
  );
}
