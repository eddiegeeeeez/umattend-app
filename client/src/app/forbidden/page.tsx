import { ShieldXIcon, HomeIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

export default function ForbiddenPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Empty className="max-w-2xl border">
        <EmptyHeader>
          <EmptyMedia>
            <ShieldXIcon className="text-primary h-16 w-16" />
          </EmptyMedia>
          <EmptyTitle className="text-2xl">403 - Access Forbidden</EmptyTitle>
          <EmptyDescription className="text-base">
            You don&apos;t have permission to access this resource. This page is restricted to authorized users only. If you believe this is an error, please
            contact support.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/events">
                <HomeIcon />
                Back to Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">
                <MailIcon />
                Contact Support
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
