import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  ExperienceDto,
  ExperienceCreateRequest,
  ExperienceUpdateRequest,
} from "../types/experience";
import { useAuthStore } from "./auth/authStore";

export type { ExperienceDto, ExperienceCreateRequest, ExperienceUpdateRequest };

export const EXPERIENCE_QUERY_KEY = ["experience"];

// --- API FUNCTIONS ---

const getMyExperience = async (): Promise<ExperienceDto[]> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.get<ApiResponse<ExperienceDto[]>>(
    "/api/me/experience"
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener la experiencia");
};

const createExperience = async (
  newData: ExperienceCreateRequest
): Promise<ExperienceDto> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.post<ApiResponse<ExperienceDto>>(
    "/api/me/experience",
    newData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al crear la experiencia");
};

const updateExperience = async (
  updatedData: ExperienceUpdateRequest
): Promise<ExperienceDto> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.put<ApiResponse<ExperienceDto>>(
    "/api/me/experience",
    updatedData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al actualizar la experiencia");
};

const deleteExperience = async (id: number): Promise<void> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.delete<ApiResponse<void>>(
    `/api/me/experience/${id}`
  );
  if (!response.success) {
    throw new Error(response.message || "Error al eliminar la experiencia");
  }
};

// --- HOOKS (Sin cambios) ---

export const useMyExperience = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: EXPERIENCE_QUERY_KEY,
    queryFn: getMyExperience,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEY });
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEY });
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEY });
    },
  });
};
