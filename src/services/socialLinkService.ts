import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  SocialLinkDto,
  SocialLinkCreateRequest,
  SocialLinkUpdateRequest,
} from "../types/socialLink";
import { useAuthStore } from "./auth/authStore";

export type { SocialLinkDto, SocialLinkCreateRequest, SocialLinkUpdateRequest };

export const SOCIAL_LINKS_QUERY_KEY = ["socialLinks"];

// --- API FUNCTIONS ---

const getMySocialLinks = async (): Promise<SocialLinkDto[]> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.get<ApiResponse<SocialLinkDto[]>>(
    "/api/me/social-links"
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener enlaces sociales");
};

const createSocialLink = async (
  newData: SocialLinkCreateRequest
): Promise<SocialLinkDto> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.post<ApiResponse<SocialLinkDto>>(
    "/api/me/social-links",
    newData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al crear el enlace");
};

const updateSocialLink = async (
  updatedData: SocialLinkUpdateRequest
): Promise<SocialLinkDto> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.put<ApiResponse<SocialLinkDto>>(
    "/api/me/social-links",
    updatedData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al actualizar el enlace");
};

const deleteSocialLink = async (id: number): Promise<void> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.delete<ApiResponse<void>>(
    `/api/me/social-links/${id}`
  );
  if (!response.success) {
    throw new Error(response.message || "Error al eliminar el enlace");
  }
};

// --- HOOKS (Sin cambios) ---

export const useMySocialLinks = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: SOCIAL_LINKS_QUERY_KEY,
    queryFn: getMySocialLinks,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOCIAL_LINKS_QUERY_KEY });
    },
  });
};

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOCIAL_LINKS_QUERY_KEY });
    },
  });
};

export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOCIAL_LINKS_QUERY_KEY });
    },
  });
};
