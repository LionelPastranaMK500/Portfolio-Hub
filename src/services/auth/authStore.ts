// src/services/auth/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import apiClient from "../../config/api";
import type { ApiResponse } from "../../types/ApiResponse";
import type { User } from "../../types/User";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../../types/auth/Auth";

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
          // CORRECCIÓN: Se cambió "apí" por "api"
          const { data: response } = await apiClient.post<
            ApiResponse<AuthResponse>
          >("/api/auth/login", credentials);

          if (response.success && response.data.token) {
            const token = response.data.token;

            set({ accessToken: token, isAuthenticated: true });
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;

            // Intentamos obtener el usuario, pero si falla no bloqueamos el login inmediatamente aquí,
            // el manejo de errores interno de fetchUser decidirá.
            await get().fetchUser();
          } else {
            throw new Error(response.message || "Error al iniciar sesión");
          }
        } catch (error) {
          get().logout();
          throw error;
        }
      },

      // --- ACCIÓN: REGISTRO ---
      register: async (credentials: RegisterCredentials) => {
        try {
          const { data: response } = await apiClient.post<
            ApiResponse<AuthResponse>
          >("/api/auth/register", credentials);

          if (response.success && response.data.token) {
            const token = response.data.token;
            set({ accessToken: token, isAuthenticated: true });
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;

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
          const { data: response } = await apiClient.get<ApiResponse<User>>(
            "/api/me/profile"
          );

          if (response.success && response.data) {
            set({ user: response.data, isAuthenticated: true });
          } else {
            // Si la API responde pero success es false (ej. token inválido lógico)
            console.error("Error API Profile:", response.message);
            // Opcional: Si el backend dice "Token inválido", podríamos cerrar sesión aquí.
          }
        } catch (error: any) {
          console.error("Error al obtener el perfil:", error);

          // CORRECCIÓN CLAVE: Solo cerrar sesión si es error de autenticación (401/403)
          // Si es error de red (500, Network Error), NO cerramos sesión para no "botar" al usuario.
          if (
            error.response?.status === 401 ||
            error.response?.status === 403
          ) {
            get().logout();
          }
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
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Error al rehidratar el auth store:", error);
          state?.logout();
        } else if (state?.accessToken) {
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${state.accessToken}`;
          state.isAuthenticated = true;
          // Intentar refrescar datos al recargar página
          setTimeout(() => {
            state.fetchUser();
          }, 1);
        }
      },
    }
  )
);
