'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ClickSpark from '@/components/ClickSpark';
import LoginForm from '@/components/login-form';
import useExchangeCode from '@/hooks/useExchangeCode';
import { getUserOptions } from '@/api/client/@tanstack/react-query.gen';
import { useAuthStore } from '@/store/authStore';

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticating, accessToken, isError, serverMessage, exchangeCode } = useExchangeCode();
  const setAuth = useAuthStore((state) => state.setAuth);
  const updateUser = useAuthStore((state) => state.updateUser);

  const handleGoogleLogin = async () => {
    router.push('/api/v1/auth/google');
  };

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isDoneOnboarding = useAuthStore((state) => state.isDoneOnboarding);

  // Fetch user data after authentication
  const { data: userData } = useQuery({
    ...getUserOptions(),
    enabled: isAuthenticated(),
    staleTime: Infinity // Don't refetch unless manually invalidated
  });
  

  // Update user data in store when fetched (merge with existing JWT data)
  useEffect(() => {
    if (userData?.success && userData?.data?.user) {
      const apiUser = userData.data.user;
      const currentUser = useAuthStore.getState().user;

      // Merge API data with existing JWT data (preserve student_id from JWT)
      updateUser({
        user_id: apiUser.id,
        student_id: currentUser?.student_id, // Keep from JWT
        umindanao_email: apiUser.umindanao_email || currentUser?.umindanao_email,
        name: apiUser.name || currentUser?.name,
        department: apiUser.department || currentUser?.department,
        program: apiUser.program || currentUser?.program,
        role: (apiUser.role as 'student' | 'admin' | 'csg' | 'instructor' | 'organizer') || currentUser?.role || 'student',
        done_onboarding: apiUser.done_onboarding ?? currentUser?.done_onboarding ?? false,
        profile_picture: apiUser.profile_picture || currentUser?.profile_picture || ''
      });
    }
  }, [userData, updateUser]);

  useEffect(() => {
    const auth_code = searchParams.get('auth_code');
    const error_code = searchParams.get('error_code');

    const handleAuthCode = async () => {
      if (!auth_code) return;
      const result = await exchangeCode('auth_code', auth_code);
      console.log(result);
      
      if (result.accessToken && result.refreshToken) {
        setAuth(result.accessToken, result.refreshToken);
      }

      router.push(!isDoneOnboarding() ? '/onboarding' : '/events');
    };

    const handleErrorCode = async () => {
      if (!error_code) return;
      await exchangeCode('error_code', error_code);
    };

    handleAuthCode();
    handleErrorCode();
  }, [exchangeCode, setAuth, searchParams, router, isDoneOnboarding]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    }

    if (isAuthenticated() && !isDoneOnboarding()) {
      router.push('/onboarding');
    }

    if (isAuthenticated() && isDoneOnboarding()) {
      router.push('/events');
    }
  }, [isAuthenticated, isDoneOnboarding, router]);

  return (
    <ClickSpark sparkColor="#000" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <LoginForm
        serverMessage={serverMessage}
        isError={isError}
        isAuthenticating={isAuthenticating}
        handleGoogleLogin={handleGoogleLogin}
        accessToken={accessToken}
      />
    </ClickSpark>
  );
}
