'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAdmin, isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication status
    if (!isAuthenticated()) {
      router.push('/');
      return;
    }

    // Check admin requirement
    if (requireAdmin && !isAdmin()) {
      router.push('/forbidden');
      return;
    }

    // User is authorized
    setIsChecking(false);
  }, [user, requireAdmin, router, isAdmin, isAuthenticated]);

  // Show nothing while checking auth (prevents flash of protected content)
  if (isChecking || !isAuthenticated()) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  // Show forbidden page if admin access required but user is not admin
  if (requireAdmin && !isAdmin()) {
    return null;
  }

  return <>{children}</>;
}
