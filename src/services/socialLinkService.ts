// src/services/socialLinkService.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  SocialLinkDto,
  SocialLinkCreateRequest,
  SocialLinkUpdateRequest,
} from "../types/socialLink";
import { useAuthStore } from "./auth/authStore";

// 1. Query Key
export const SOCIAL_LINKS_QUERY_KEY = ["socialLinks"];

// --- API FUNCTIONS ---

/**
 * GET /api/me/social-links
 * Obtiene TODOS los enlaces sociales del usuario
 */
const getMySocialLinks = async (): Promise<SocialLinkDto[]> => {
  const { data: response } = await apiClient.get<ApiResponse<SocialLinkDto[]>>(
    "/me/social-links"
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener enlaces sociales");
};

/**
 * POST /api/me/social-links
 * Crea un nuevo enlace social
 */
const createSocialLink = async (
  newData: SocialLinkCreateRequest
): Promise<SocialLinkDto> => {
  const { data: response } = await apiClient.post<ApiResponse<SocialLinkDto>>(
    "/me/social-links",
    newData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al crear el enlace");
};

/**
 * PUT /api/me/social-links
 * Actualiza un enlace social (el ID va en el body)
 */
const updateSocialLink = async (
  updatedData: SocialLinkUpdateRequest
): Promise<SocialLinkDto> => {
  const { data: response } = await apiClient.put<ApiResponse<SocialLinkDto>>(
    "/me/social-links",
    updatedData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al actualizar el enlace");
};

/**
 * DELETE /api/me/social-links/{id}
 * Elimina un enlace social
 */
const deleteSocialLink = async (id: number): Promise<void> => {
  const { data: response } = await apiClient.delete<ApiResponse<void>>(
    `/me/social-links/${id}`
  );
  if (!response.success) {
    throw new Error(response.message || "Error al eliminar el enlace");
  }
};

// --- REACT QUERY HOOKS ---

/**
 * Hook para obtener la lista de enlaces sociales del usuario.
 */
export const useMySocialLinks = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: SOCIAL_LINKS_QUERY_KEY,
    queryFn: getMySocialLinks,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

/**
 * Hook (Mutación) para CREAR un nuevo enlace social.
 */
export const useCreateSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOCIAL_LINKS_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ACTUALIZAR un enlace social.
 */
export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOCIAL_LINKS_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ELIMINAR un enlace social.
 */
export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOCIAL_LINKS_QUERY_KEY });
    },
  });
};
