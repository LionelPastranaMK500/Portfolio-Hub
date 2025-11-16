// src/services/profileService.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type { User } from "../types/User"; // Este es nuestro ProfileDto
import { useAuthStore } from "../services/auth/authStore";

// --- Definición de la "Query Key" ---
// Esto es un identificador único para esta consulta
export const MY_PROFILE_QUERY_KEY = ["myProfile"];

// --- Función de Fetching ---
// Esta es la función que React Query llamará
const fetchMyProfile = async (): Promise<User> => {
  const { data: response } = await apiClient.get<ApiResponse<User>>(
    "/me/profile"
  );
  if (response.success) {
    return response.data;
  }
  throw new Error(response.message || "Error al obtener el perfil");
};

// --- Custom Hook (useMyProfile) ---
// Este es el hook que usaremos en nuestros componentes
export const useMyProfile = () => {
  // Obtenemos el estado de autenticación de Zustand
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: MY_PROFILE_QUERY_KEY,
    queryFn: fetchMyProfile,

    // --- Opciones Clave ---

    // 1. 'enabled: !!isAuthenticated'
    //    Esto es crucial: React Query SOLO ejecutará esta consulta
    //    SI el usuario está autenticado (según Zustand).
    enabled: !!isAuthenticated,

    // 2. 'staleTime'
    //    Para evitar llamadas innecesarias, le decimos a React Query
    //    que considere los datos "frescos" por 5 minutos.
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
