import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { certificateService } from "../services/certificate.service";

/**
 * Hook para gestionar Certificados
 * Archivo: src/hooks/useCertificates.ts
 */
export const useCertificates = () => {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["certificates"];

  // --- 1. QUERY: Obtener todos ---
  const certificatesQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: certificateService.listAll,
    staleTime: 1000 * 60 * 5,
  });

  // --- 2. MUTATION: Crear ---
  const createMutation = useMutation({
    mutationFn: certificateService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // --- 3. MUTATION: Actualizar ---
  const updateMutation = useMutation({
    mutationFn: certificateService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // --- 4. MUTATION: Eliminar ---
  const deleteMutation = useMutation({
    mutationFn: certificateService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    // Data
    certificates: certificatesQuery.data || [],
    isLoading: certificatesQuery.isLoading,
    isError: certificatesQuery.isError,

    // Actions
    createCertificate: createMutation.mutateAsync,
    updateCertificate: updateMutation.mutateAsync,
    deleteCertificate: deleteMutation.mutateAsync,

    // Loading States
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

// Hook individual
export const useCertificateById = (id: number | null) => {
  return useQuery({
    queryKey: ["certificates", id],
    queryFn: () => certificateService.getById(id!),
    enabled: !!id,
  });
};
