'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactSupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-between p-4">
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* Logo and Branding */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <h1 className="mb-3 text-5xl font-bold text-balance transition-opacity hover:opacity-80">
                <span className="text-yellow-500">UM</span>
                <span className="text-foreground">Attend</span>
              </h1>
            </Link>
            <p className="text-muted-foreground text-lg text-balance">UMAttend on the latest events in the campus</p>
          </div>

          {/* Contact Support Card */}
          <Card className="border-border shadow-2xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-foreground text-2xl font-bold">Contact Support</CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                Having trouble? We&apos;re here to help. Send us a message and we&apos;ll get back to you soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Full Name
                    </Label>
                    <Input id="name" type="text" placeholder="Juan Dela Cruz" required className="h-11" disabled={isSubmitting} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email Address
                    </Label>
                    <Input id="email" type="email" placeholder="juan.delacruz@um.edu.ph" required className="h-11" disabled={isSubmitting} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-foreground font-medium">
                      Subject
                    </Label>
                    <Input id="subject" type="text" placeholder="What do you need help with?" required className="h-11" disabled={isSubmitting} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your issue in detail..."
                      required
                      className="min-h-[150px] resize-none"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 flex-1 text-base font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="border-primary-foreground mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                    <Link href="/" className="flex-1">
                      <Button type="button" variant="outline" className="h-12 w-full bg-transparent text-base font-semibold" disabled={isSubmitting}>
                        Back to Login
                      </Button>
                    </Link>
                  </div>
                </form>
              ) : (
                <div className="space-y-6 py-8 text-center">
                  <div className="flex justify-center">
                    <div className="bg-primary/20 flex h-16 w-16 items-center justify-center rounded-full">
                      <svg className="text-primary h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-foreground text-xl font-bold">Message Sent!</h3>
                    <p className="text-muted-foreground">Thank you for contacting us. We&apos;ll get back to you within 24-48 hours.</p>
                  </div>
                  <Link href="/">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-base font-semibold">Return to Login</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Contact Info */}
          <div className="mt-6 space-y-2 text-center">
            <p className="text-muted-foreground text-sm">You can also reach us at:</p>
            <p className="text-foreground text-sm font-medium">support@umattend.edu.ph</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full pb-4 text-center">
        <p className="text-muted-foreground/70 text-xs">Powered by UMAttend Engineering Team</p>
      </div>
    </div>
  );
}
