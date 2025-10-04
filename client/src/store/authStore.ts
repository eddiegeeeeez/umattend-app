// store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  role: 'student' | 'admin';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      
      setAuth: (accessToken: string, refreshToken: string) => {
        const decoded = jwtDecode<User>(accessToken);
        set({
          user: decoded,
          accessToken,
          refreshToken,
        });
      },
      
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        });
      },
      
      isAdmin: () => {
        const state = get();
        return state.user?.role === 'admin';
      },

      isAuthenticated: () => {
        const state = get();
        return state.accessToken !== null && state.user !== null;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);