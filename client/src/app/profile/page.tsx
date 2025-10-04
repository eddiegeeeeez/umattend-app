'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const exchangeCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const auth_code = params.get('auth_code');

      if (!auth_code) return;

      try {
        const res = await axios.post('http://localhost:3000/api/v1/auth/exchange', { auth_code });

        console.log(res.data);

        const accessToken = res.data.data.access_token;
        const refreshToken = res.data.data.refresh_token;

        console.log(accessToken, refreshToken);
        

        // store tokens
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);

        // decode user info from JWT
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded = jwtDecode(accessToken) as any;
        setUser({ id: decoded.sub, email: decoded.email });

        // redirect after setting user
        router.push('/');
      } catch (err:unknown) {
        if (typeof err === 'object' && err !== null && 'response' in err) {
          // @ts-expect-error: err.response may exist on axios errors
          console.error('Login failed:', err.response?.data || err.message);
        } else {
          console.error('Login failed:', (err as Error).message);
        }
      }
    };

    exchangeCode();
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>
    </div>
  );
};

export default ProfilePage;
