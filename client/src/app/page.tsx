'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useExchangeCode from '@/hooks/useExchangeCode';
import { useAuthStore } from '@/store/authStore';

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticating, accessToken, refreshToken, isError, serverMessage, exchangeCode } = useExchangeCode();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      router.push('/dashboard');
    }
  }, [router, searchParams]);

  const handleGoogleLogin = () => {
    router.push('/api/v1/auth/google');
  };

  useEffect(() => {
    const auth_code = searchParams.get('auth_code');
    if (auth_code) {
      exchangeCode('auth_code', auth_code);
      if (accessToken && refreshToken) {
        setAuth(accessToken, refreshToken);
      }
    }

    const error_code = searchParams.get('error_code');
    if (error_code) {
      exchangeCode('error_code', error_code);
    }

  }, [exchangeCode, setAuth, accessToken, refreshToken, searchParams, router]);

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-between p-4">
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          {/* Logo and Branding */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-5xl font-bold text-balance">
              <span className="text-yellow-500">UM</span>
              <span className="text-foreground">Attend</span>
            </h1>
            <p className="text-muted-foreground text-lg text-balance">UMAttend on the latest events in the campus</p>
          </div>

          {/* Login Card */}
          <Card className="border-border shadow-2xl">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-foreground text-2xl font-bold">Welcome Ga!</CardTitle>
              <CardDescription className="text-muted-foreground text-base">Sign in with your Google account to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isError && (
                <div className="rounded-md border border-red-300 bg-red-50 p-4">
                  <p className="text-red-800">{serverMessage || 'An error occurred during authentication. Please try again.'}</p>
                </div>
              )}

              {!isAuthenticating ? (
                <>
                  <Button
                    onClick={handleGoogleLogin}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full text-base font-semibold transition-all duration-200"
                    size="lg"
                  >
                    <svg
                      className="mr-3 h-5 w-5"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Continue with Google
                  </Button>

                  <p className="text-muted-foreground text-center text-xs leading-relaxed">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-8 py-4">
                  <div className="relative">
                    <div className="border-muted border-t-primary h-16 w-16 animate-spin rounded-full border-4" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary/20 h-8 w-8 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-4 text-center">
                    <p className="text-foreground text-lg font-semibold">Authenticating...</p>
                    <p className="text-muted-foreground text-sm">Please wait while we verify your credentials</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Need help?{' '}
              <a href="#" className="text-primary font-medium hover:underline">
                Contact Support
              </a>
            </p>
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
