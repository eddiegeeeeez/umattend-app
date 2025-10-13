'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

<<<<<<< HEAD:client/src/components/ProtectedRoute.tsx
// components/ProtectedRoute.tsx

// components/ProtectedRoute.tsx

// components/ProtectedRoute.tsx

// components/ProtectedRoute.tsx

// components/ProtectedRoute.tsx

// components/ProtectedRoute.tsx

=======
>>>>>>> 97eac06d42cff0e6899d2382afca033bf9086ddb:client/src/components/protected-routes.tsx
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAdmin } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push('/');
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
