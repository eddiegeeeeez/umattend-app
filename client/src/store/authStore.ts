// store/authStore.ts
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  role: 'student' | 'admin' | 'csg' | 'instructor' | 'organizer';
  done_onboarding: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
  isDoneOnboarding: () => boolean;
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
          refreshToken
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null
        });
      },

      isAdmin: () => {
        const state = get();
        return state.user?.role === 'admin' || state.user?.role === 'csg' || state.user?.role === 'organizer';
      },

      isAuthenticated: () => {
        const state = get();
        return state.accessToken !== null && state.accessToken !== null && state.user !== null;
      },

      isDoneOnboarding: () => {
        const state = get();
        return state.user?.done_onboarding ?? false;
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
