import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { educationService } from "../services/education.service";

/**
 * Hook para gestionar Educación
 * Archivo: src/hooks/useEducation.ts
 */
export const useEducation = () => {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["education"]; // Clave para la caché

  // --- 1. QUERY: Obtener todas ---
  const educationQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: educationService.listAll,
    staleTime: 1000 * 60 * 5, // 5 minutos de frescura
  });

  // --- 2. MUTATION: Crear ---
  const createMutation = useMutation({
    mutationFn: educationService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // --- 3. MUTATION: Actualizar ---
  const updateMutation = useMutation({
    mutationFn: educationService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // --- 4. MUTATION: Eliminar ---
  const deleteMutation = useMutation({
    mutationFn: educationService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    // Data
    educationList: educationQuery.data || [],
    isLoading: educationQuery.isLoading,
    isError: educationQuery.isError,

    // Actions
    createEducation: createMutation.mutateAsync,
    updateEducation: updateMutation.mutateAsync,
    deleteEducation: deleteMutation.mutateAsync,

    // Loading States
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

/**
 * Hook para obtener una formación específica por ID
 */
export const useEducationById = (id: number | null) => {
  return useQuery({
    queryKey: ["education", id],
    queryFn: () => educationService.getById(id!),
    enabled: !!id,
  });
};
