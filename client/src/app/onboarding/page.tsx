'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function OnboardinPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isDoneOnboarding = useAuthStore((state) => state.isDoneOnboarding);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    }

    if (isDoneOnboarding()) {
      router.push('/events');
    }
  }, [isAuthenticated, router, isDoneOnboarding]);
  return <div>page</div>;
}
