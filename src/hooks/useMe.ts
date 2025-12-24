import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { meService } from "../services/me.service";
import { useAuthStore } from "../store/authStore";

/**
 * Hook para gestionar el perfil del usuario logueado
 * Archivo: src/hooks/useMe.ts
 */
export const useMe = () => {
  const queryClient = useQueryClient();
  const fetchUser = useAuthStore((state) => state.fetchUser);

  const QUERY_KEY = ["myProfile"];

  // --- 1. QUERY: Obtener mi perfil ---
  const profileQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: meService.getMyProfile,

    staleTime: 1000 * 30,

    refetchOnWindowFocus: true,
  });

  // --- 2. MUTATION: Actualizar Perfil (Bio, Nombre, etc.) ---
  const updateProfileMutation = useMutation({
    mutationFn: meService.updateMyProfile,
    onSuccess: async (updatedProfile) => {
      queryClient.setQueryData(QUERY_KEY, updatedProfile);
      await fetchUser();

      console.log("Perfil actualizado correctamente");
    },
    onError: (error) => console.error("Error al actualizar perfil:", error),
  });

  // --- 3. MUTATION: Actualizar Email de Contacto ---
  const updateEmailMutation = useMutation({
    mutationFn: meService.updateContactEmail,
    onSuccess: async (updatedProfile) => {
      queryClient.setQueryData(QUERY_KEY, updatedProfile);
      await fetchUser();
      console.log("Email de contacto actualizado");
    },
    onError: (error) => console.error("Error al actualizar email:", error),
  });

  return {
    // Data
    myProfile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,

    // Actions
    updateProfile: updateProfileMutation.mutateAsync,
    updateContactEmail: updateEmailMutation.mutateAsync,

    // Loading States
    isUpdatingProfile: updateProfileMutation.isPending,
    isUpdatingEmail: updateEmailMutation.isPending,
  };
};
