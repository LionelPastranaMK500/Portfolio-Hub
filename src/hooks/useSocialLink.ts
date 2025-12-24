import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { socialLinkService } from "../services/socialLink.service";

/**
 * Hook para gestionar Redes Sociales
 * Archivo: src/hooks/useSocialLink.ts
 */
export const useSocialLinks = () => {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["socialLinks"];

  // --- 1. QUERY: Listar todas ---
  const socialLinksQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: socialLinkService.listAll,
    staleTime: 1000 * 60 * 5,
  });

  // --- 2. MUTATION: Crear ---
  const createMutation = useMutation({
    mutationFn: socialLinkService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // --- 3. MUTATION: Actualizar ---
  const updateMutation = useMutation({
    mutationFn: socialLinkService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // --- 4. MUTATION: Eliminar ---
  const deleteMutation = useMutation({
    mutationFn: socialLinkService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    // Data
    socialLinks: socialLinksQuery.data || [],
    isLoading: socialLinksQuery.isLoading,
    isError: socialLinksQuery.isError,

    // Actions
    createSocialLink: createMutation.mutateAsync,
    updateSocialLink: updateMutation.mutateAsync,
    deleteSocialLink: deleteMutation.mutateAsync,

    // Loading States
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

/**
 * Hook para obtener una red social específica por ID (para editar)
 */
export const useSocialLinkById = (id: number | null) => {
  return useQuery({
    queryKey: ["socialLinks", id],
    queryFn: () => socialLinkService.getById(id!),
    enabled: !!id,
  });
};
