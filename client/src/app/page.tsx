//TODO migrate the uri and endpoints to secrets
'use client';

import { Suspense, useEffect } from 'react';
import axios from 'axios';
import { GalleryVerticalEnd } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      router.push('/dashboard');
    }
  }, [router, searchParams]);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost/api/v1/auth/google'; // backend auth URL
  };

  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const exchangeCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const auth_code = params.get('auth_code');

      try {
        const res = await axios.post('/api/v1/auth/exchange', { auth_code });

        console.log(res.data);

        const accessToken = res.data.data.access_token;
        const refreshToken = res.data.data.refresh_token;

        if (res.status >= 200) {
          setAuth(accessToken, refreshToken);
          router.push('/');
        }
      } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'response' in err) {
          const response = (err as { response?: { data?: unknown } }).response;
          console.error('Login failed:', response?.data ?? (err instanceof Error ? err.message : String(err)));
        } else {
          console.error('Login failed:', (err as Error).message);
        }
      }
    };

    exchangeCode();
  }, [router, setAuth]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">Enter your email below to login to your account</p>
              </div>
              <div className="grid gap-6">
                <Button variant="outline" className="w-full cursor-pointer" onClick={handleGoogleLogin}>
                  <a href="http://localhost/api/v1/auth/google" className="flex w-full items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </a>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block"></div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
