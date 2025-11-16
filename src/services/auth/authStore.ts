// src/services/auth/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import apiClient from "../../config/api"; // El que creamos en el paso 1
import type { ApiResponse } from "../..//types/ApiResponse";
import type { User } from "../../types/User";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../../types/auth/Auth";

// Definimos la forma de nuestro estado de autenticación
interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // --- ESTADO INICIAL ---
      user: null,
      accessToken: null,
      isAuthenticated: false,

      // --- ACCIÓN: LOGIN ---
      login: async (credentials: LoginCredentials) => {
        try {
          // 1. Pide el token a /api/auth/login
          const { data: response } = await apiClient.post<
            ApiResponse<AuthResponse>
          >("/auth/login", credentials);

          if (response.success && response.data.token) {
            const token = response.data.token;

            // 2. Guarda el token en el estado y en el header de Axios
            set({ accessToken: token, isAuthenticated: true });
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;

            // 3. Busca los datos del usuario con el nuevo token
            await get().fetchUser();
          } else {
            throw new Error(response.message || "Error al iniciar sesión");
          }
        } catch (error) {
          get().logout(); // Limpia todo si falla
          throw error; // Lanza el error para que el formulario lo muestre
        }
      },

      // --- ACCIÓN: REGISTRO ---
      register: async (credentials: RegisterCredentials) => {
        try {
          // 1. Registra al usuario en /api/auth/register
          const { data: response } = await apiClient.post<
            ApiResponse<AuthResponse>
          >("/auth/register", credentials);

          if (response.success && response.data.token) {
            // 2. Si el registro es exitoso, logueamos al usuario inmediatamente
            const token = response.data.token;
            set({ accessToken: token, isAuthenticated: true });
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;

            // 3. Busca los datos del usuario
            await get().fetchUser();
          } else {
            throw new Error(response.message || "Error en el registro");
          }
        } catch (error) {
          get().logout();
          throw error;
        }
      },

      // --- ACCIÓN: OBTENER DATOS DEL USUARIO ---
      fetchUser: async () => {
        try {
          // Llama a /api/me/profile (endpoint protegido)
          const { data: response } = await apiClient.get<ApiResponse<User>>(
            "/me/profile"
          );

          if (response.success && response.data) {
            // Guarda los datos del perfil (ProfileDto) en el estado
            set({ user: response.data, isAuthenticated: true });
          } else {
            // Si la API devuelve success: false
            throw new Error(response.message);
          }
        } catch (error) {
          console.error("Error al obtener el perfil:", error);
          get().logout(); // Cierra sesión si no se pueden obtener los datos
        }
      },

      // --- ACCIÓN: LOGOUT ---
      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
        delete apiClient.defaults.headers.common["Authorization"];
      },
    }),
    {
      // --- CONFIGURACIÓN DE PERSISTENCIA ---
      name: "auth-storage", // Nombre en localStorage
      storage: createJSONStorage(() => localStorage),

      // Solo persistimos el token, no los datos del usuario
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),

      // Función que se ejecuta al recargar la página
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Error al rehidratar el auth store:", error);
          state?.logout();
        } else if (state?.accessToken) {
          // Si hay un token guardado, ponerlo en Axios
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${state.accessToken}`;
          state.isAuthenticated = true;

          // E intentar obtener los datos frescos del usuario
          setTimeout(() => {
            state.fetchUser();
          }, 1);
        }
      },
    }
  )
);
