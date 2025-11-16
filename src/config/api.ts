// src/config/api.ts
import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";
import { useAuthStore } from "../services/auth/authStore"; // Lo crearemos en el paso 3

// Lee la URL base de las variables de entorno de Vite (.env)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor de Petición (Request)
// Añade el token 'Bearer' a todas las peticiones autenticadas
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

// Interceptor de Respuesta (Response)
// Maneja los errores 401 (Token expirado/inválido)
apiClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa (2xx), solo la devuelve
    return response;
  },
  async (error: AxiosError) => {
    // Si el error es 401 (No Autorizado)
    if (error.response?.status === 401) {
      console.warn("Token JWT expirado o inválido. Cerrando sesión.");

      // Llama a la función logout de nuestro store
      // Esto limpiará el token del estado y de localStorage.
      useAuthStore.getState().logout();

      // Redirige al usuario a la página de login
      window.location.href = "/login";
    }

    // Para cualquier otro error, rechaza la promesa
    return Promise.reject(error);
  }
);

export default apiClient;
