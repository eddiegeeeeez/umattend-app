// components/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

// components/ProtectedRoute.tsx

// components/ProtectedRoute.tsx

// components/ProtectedRoute.tsx

// components/ProtectedRoute.tsx

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAdmin } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (requireAdmin && !isAdmin()) {
      router.push('/unauthorized');
    }
  }, [user, requireAdmin, router, isAdmin]);

  if (!user) return null;
  if (requireAdmin && !isAdmin()) return null;

  return <>{children}</>;
}
