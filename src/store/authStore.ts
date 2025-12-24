// src/stores/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import apiClient from "../config/api";
import { meService } from "../services/me.service";
import type { AuthState } from "../types/models/Auth";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // --- ESTADO INICIAL ---
      user: null,
      accessToken: null,
      isAuthenticated: false,

      // --- ACCIÓN: SET TOKEN (Simplificada) ---
      setToken: (token: string) => {
        set({ accessToken: token, isAuthenticated: true });

        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      },

      // --- ACCIÓN: OBTENER DATOS DEL USUARIO ---
      fetchUser: async () => {
        try {
          const profile = await meService.getMyProfile();
          set({ user: profile, isAuthenticated: true });
        } catch (error: any) {
          console.error("Error al obtener el perfil:", error);

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

      // --- REHIDRATACIÓN ---
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Error al rehidratar auth store:", error);
        } else if (state?.accessToken) {
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${state.accessToken}`;
          state.isAuthenticated = true;
          setTimeout(() => {
            state.fetchUser();
          }, 100);
        }
      },
    }
  )
);
