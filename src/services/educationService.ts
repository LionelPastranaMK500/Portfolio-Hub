// src/services/educationService.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  EducationDto,
  EducationCreateRequest,
  EducationUpdateRequest,
} from "../types/education";
import { useAuthStore } from "./auth/authStore";

// 1. Identificador único de la query
export const EDUCATION_QUERY_KEY = ["education"];

// --- API FUNCTIONS ---

/**
 * GET /api/me/education
 * Obtiene TODA la educación del usuario autenticado
 */
const getMyEducation = async (): Promise<EducationDto[]> => {
  const { data: response } = await apiClient.get<ApiResponse<EducationDto[]>>(
    "/me/education"
  );
  if (response.success) {
    return response.data;
  }
  throw new Error(response.message || "Error al obtener la educación");
};

/**
 * POST /api/me/education
 * Crea una nueva entrada de educación
 */
const createEducation = async (
  newData: EducationCreateRequest
): Promise<EducationDto> => {
  const { data: response } = await apiClient.post<ApiResponse<EducationDto>>(
    "/me/education",
    newData
  );
  if (response.success) {
    return response.data;
  }
  throw new Error(response.message || "Error al crear la entrada de educación");
};

/**
 * PUT /api/me/education
 * Actualiza una entrada de educación existente
 */
const updateEducation = async (
  updatedData: EducationUpdateRequest
): Promise<EducationDto> => {
  const { data: response } = await apiClient.put<ApiResponse<EducationDto>>(
    "/me/education",
    updatedData
  );
  if (response.success) {
    return response.data;
  }
  throw new Error(response.message || "Error al actualizar la educación");
};

/**
 * DELETE /api/me/education/{id}
 * Elimina una entrada de educación
 */
const deleteEducation = async (id: number): Promise<void> => {
  const { data: response } = await apiClient.delete<ApiResponse<void>>(
    `/me/education/${id}`
  );
  if (!response.success) {
    throw new Error(response.message || "Error al eliminar la educación");
  }
};

// --- REACT QUERY HOOKS ---

/**
 * Hook para obtener la lista de educación del usuario.
 */
export const useMyEducation = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: EDUCATION_QUERY_KEY,
    queryFn: getMyEducation,
    enabled: !!isAuthenticated, // Solo activo si está logueado
    staleTime: 1000 * 60 * 5, // 5 minutos de caché
  });
};

/**
 * Hook (Mutación) para CREAR una nueva entrada de educación.
 */
export const useCreateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEducation,
    onSuccess: () => {
      // Invalida la caché de 'education' para refrescar
      queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ACTUALIZAR una entrada de educación.
 */
export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ELIMINAR una entrada de educación.
 */
export const useDeleteEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEY });
    },
  });
};
