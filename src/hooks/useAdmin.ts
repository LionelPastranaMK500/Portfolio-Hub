import { useMutation } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";

/**
 * Hook para gestiones de Administrador
 * Archivo: src/hooks/useAdmin.ts
 */
export const useAdmin = () => {
  // --- MUTATION: Toggle Collaborator ---
  const toggleCollaboratorMutation = useMutation({
    mutationFn: adminService.toggleCollaboratorStatus,

    onSuccess: (data) => {
      console.log("Estado de colaborador cambiado:", data);
    },

    onError: (error) => {
      console.error("Error al cambiar estado de colaborador:", error);
    },
  });

  return {
    // Exponemos la función y sus estados
    toggleCollaborator: toggleCollaboratorMutation.mutate,
    toggleCollaboratorAsync: toggleCollaboratorMutation.mutateAsync,
    isToggling: toggleCollaboratorMutation.isPending,
    toggleError: toggleCollaboratorMutation.error,
  };
};
