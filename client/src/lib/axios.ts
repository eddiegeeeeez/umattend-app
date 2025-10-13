// lib/axios.ts
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status >= 400 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, setAuth, logout } = useAuthStore.getState();

      if (!refreshToken) {
        logout();
        window.location.href = '/';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`/refresh`, { refresh_token: refreshToken });

        const { access_token, refresh_token } = response.data;
        setAuth(access_token, refresh_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logout();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
