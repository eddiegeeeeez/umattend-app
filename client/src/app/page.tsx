'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ClickSpark from '@/components/ClickSpark';
import LoginForm from '@/components/login-form';
import useExchangeCode from '@/hooks/useExchangeCode';
import { useAuthStore } from '@/store/authStore';

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticating, accessToken, isError, serverMessage, exchangeCode } = useExchangeCode();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleGoogleLogin = async () => {
    // router.push('/api/v1/auth/google');

    router.push('/onboarding');
  };

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isDoneOnboarding = useAuthStore((state) => state.isDoneOnboarding);

  useEffect(() => {
    const auth_code = searchParams.get('auth_code');
    const error_code = searchParams.get('error_code');

    const handleAuthCode = async () => {
      if (!auth_code) return;
      const result = await exchangeCode('auth_code', auth_code);
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
      router.push('/dashboard');
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
