// lib/axios.ts
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    console.log('[AXIOS REQUEST] URL:', config.url);
    console.log('[AXIOS REQUEST] Has Access Token:', !!accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log('[AXIOS REQUEST] Authorization header set');
    } else {
      console.warn('[AXIOS REQUEST] No access token found in store!');
    }

    return config;
  },
  (error) => {
    console.error('[AXIOS REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('[AXIOS RESPONSE] Success:', response.status, response.config.url);
    return response;
  },
  async (error) => {
    console.log('[AXIOS RESPONSE ERROR]', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message
    });

    const originalRequest = error.config;

    // Only attempt token refresh on 401 Unauthorized errors (not 403 or other errors)
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('[AXIOS] Attempting token refresh...');
      originalRequest._retry = true;

      const { refreshToken, setAuth, logout } = useAuthStore.getState();

      if (!refreshToken) {
        console.error('[AXIOS] No refresh token available, logging out');
        logout();
        window.location.href = '/';
        return Promise.reject(error);
      }

      try {
        console.log('[AXIOS] Calling refresh endpoint...');
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'}/auth/refresh`,
          { refresh_token: refreshToken },
          { withCredentials: true }
        );

        const { access_token, refresh_token } = response.data.data;
        setAuth(access_token, refresh_token);
        console.log('[AXIOS] Token refreshed successfully');

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('[AXIOS] Token refresh failed, logging out', refreshError);
        logout();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
