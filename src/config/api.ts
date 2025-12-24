// src/config/api.ts
import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";
import { useAuthStore } from "../services/auth/authStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("Token JWT expirado o inválido. Cerrando sesión.");
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
