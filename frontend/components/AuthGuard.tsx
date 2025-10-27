'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: 'buyer' | 'dealer' | 'admin';
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  requireAuth = true,
  requireRole,
  redirectTo = '/login' 
}: AuthGuardProps) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // Dacă necesită autentificare și nu este autentificat
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Dacă necesită un rol specific
    if (requireRole && user?.role !== requireRole) {
      router.push('/unauthorized');
      return;
    }
  }, [isLoading, isAuthenticated, user, requireAuth, requireRole, redirectTo, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Wrong role
  if (requireRole && user?.role !== requireRole) {
    return null;
  }

  return <>{children}</>;
}
