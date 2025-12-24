// src/services/profileService.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type { User } from "../types/User"; // ProfileDto
import { useAuthStore } from "../services/auth/authStore";

export const MY_PROFILE_QUERY_KEY = ["myProfile"];

export interface ProfileUpdateRequest {
  fullName: string;
  headline: string;
  bio: string;
  contactEmail: string;
  location?: string;
}

// --- API FUNCTIONS ---

const fetchMyProfile = async (): Promise<User> => {
  // Mantenemos la ruta consistente con authStore
  const { data: response } = await apiClient.get<ApiResponse<User>>(
    "/api/me/profile"
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener perfil");
};

const updateMyProfile = async (data: ProfileUpdateRequest): Promise<User> => {
  const { data: response } = await apiClient.put<ApiResponse<User>>(
    "/api/me/profile",
    data
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al actualizar perfil");
};

// --- HOOKS ---

export const useMyProfile = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: MY_PROFILE_QUERY_KEY,
    queryFn: fetchMyProfile,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: (updatedUser) => {
      // 1. Actualizamos la caché de React Query
      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, updatedUser);

      // 2. Actualizamos el store de Auth para mantener sincronía
      useAuthStore.getState().fetchUser();
    },
  });
};
