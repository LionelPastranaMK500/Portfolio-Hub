// src/services/experienceService.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  ExperienceDto,
  ExperienceCreateRequest,
  ExperienceUpdateRequest,
} from "../types/experience";
import { useAuthStore } from "./auth/authStore";

// 1. Identificador único para este "recurso" en la caché de React Query
export const EXPERIENCE_QUERY_KEY = ["experience"];

// --- API FUNCTIONS (Funciones que llaman a Axios) ---

/**
 * GET /api/me/experience
 * Obtiene TODAS las experiencias del usuario autenticado
 */
const getMyExperience = async (): Promise<ExperienceDto[]> => {
  const { data: response } = await apiClient.get<ApiResponse<ExperienceDto[]>>(
    "/me/experience"
  );
  if (response.success) {
    return response.data;
  }
  throw new Error(response.message || "Error al obtener la experiencia");
};

/**
 * POST /api/me/experience
 * Crea una nueva experiencia
 */
const createExperience = async (
  newData: ExperienceCreateRequest
): Promise<ExperienceDto> => {
  const { data: response } = await apiClient.post<ApiResponse<ExperienceDto>>(
    "/me/experience",
    newData
  );
  if (response.success) {
    return response.data;
  }
  throw new Error(response.message || "Error al crear la experiencia");
};

/**
 * PUT /api/me/experience
 * Actualiza una experiencia existente
 */
const updateExperience = async (
  updatedData: ExperienceUpdateRequest
): Promise<ExperienceDto> => {
  const { data: response } = await apiClient.put<ApiResponse<ExperienceDto>>(
    "/me/experience",
    updatedData
  );
  if (response.success) {
    return response.data;
  }
  throw new Error(response.message || "Error al actualizar la experiencia");
};

/**
 * DELETE /api/me/experience/{id}
 * Elimina una experiencia
 */
const deleteExperience = async (id: number): Promise<void> => {
  const { data: response } = await apiClient.delete<ApiResponse<void>>(
    `/me/experience/${id}`
  );
  if (!response.success) {
    throw new Error(response.message || "Error al eliminar la experiencia");
  }
};

// --- REACT QUERY HOOKS (Hooks que usan los componentes) ---

/**
 * Hook para obtener la lista de experiencias del usuario.
 * Solo se activa si el usuario está autenticado.
 */
export const useMyExperience = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: EXPERIENCE_QUERY_KEY,
    queryFn: getMyExperience,
    enabled: !!isAuthenticated, // Solo se ejecuta si el usuario está logueado
    staleTime: 1000 * 60 * 5, // 5 minutos de caché
  });
};

/**
 * Hook (Mutación) para CREAR una nueva experiencia.
 * Invalidará la caché de 'experience' para refrescar la lista.
 */
export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      // Invalida la query "experience" para que se vuelva a cargar
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ACTUALIZAR una experiencia.
 * Invalidará la caché de 'experience' para refrescar la lista.
 */
export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ELIMINAR una experiencia.
 * Invalidará la caché de 'experience' para refrescar la lista.
 */
export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEY });
    },
  });
};
