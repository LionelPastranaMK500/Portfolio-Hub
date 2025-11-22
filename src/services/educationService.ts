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

export type { EducationDto, EducationCreateRequest, EducationUpdateRequest };

export const EDUCATION_QUERY_KEY = ["education"];

// --- API FUNCTIONS ---

const getMyEducation = async (): Promise<EducationDto[]> => {
  const { data: response } = await apiClient.get<ApiResponse<EducationDto[]>>(
    "/me/education"
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener la educación");
};

const createEducation = async (
  newData: EducationCreateRequest
): Promise<EducationDto> => {
  const { data: response } = await apiClient.post<ApiResponse<EducationDto>>(
    "/me/education",
    newData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al crear la educación");
};

const updateEducation = async (
  updatedData: EducationUpdateRequest
): Promise<EducationDto> => {
  const { data: response } = await apiClient.put<ApiResponse<EducationDto>>(
    "/me/education",
    updatedData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al actualizar la educación");
};

const deleteEducation = async (id: number): Promise<void> => {
  const { data: response } = await apiClient.delete<ApiResponse<void>>(
    `/me/education/${id}`
  );
  if (!response.success) {
    throw new Error(response.message || "Error al eliminar la educación");
  }
};

// --- HOOKS ---

export const useMyEducation = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: EDUCATION_QUERY_KEY,
    queryFn: getMyEducation,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEY });
    },
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEY });
    },
  });
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEY });
    },
  });
};
