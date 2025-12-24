import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { experienceService } from "../services/experience.service";

/**
 * Hook para gestionar Experiencia Laboral
 * Archivo: src/hooks/useExperience.ts
 */
export const useExperience = () => {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["experiences"];

  // --- 1. QUERY: Obtener todas ---
  const experienceQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: experienceService.listAll,
    staleTime: 1000 * 60 * 5,
  });

  // --- 2. MUTATION: Crear ---
  const createMutation = useMutation({
    mutationFn: experienceService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // --- 3. MUTATION: Actualizar ---
  const updateMutation = useMutation({
    mutationFn: experienceService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // --- 4. MUTATION: Eliminar ---
  const deleteMutation = useMutation({
    mutationFn: experienceService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    // Data
    experiences: experienceQuery.data || [],
    isLoading: experienceQuery.isLoading,
    isError: experienceQuery.isError,

    // Actions
    createExperience: createMutation.mutateAsync,
    updateExperience: updateMutation.mutateAsync,
    deleteExperience: deleteMutation.mutateAsync,

    // Loading States
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

/**
 * Hook para obtener una experiencia específica por ID
 */
export const useExperienceById = (id: number | null) => {
  return useQuery({
    queryKey: ["experiences", id],
    queryFn: () => experienceService.getById(id!),
    enabled: !!id,
  });
};
