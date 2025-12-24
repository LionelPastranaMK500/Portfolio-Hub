import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadService } from "../services/upload.service";
import { useAuthStore } from "../store/authStore";

/**
 * Hook para gestionar subida de archivos (Imágenes, PDF, etc.)
 */
export const useUpload = () => {
  const queryClient = useQueryClient();
  const fetchUser = useAuthStore((state) => state.fetchUser);

  // --- 1. MUTATION: Upload Avatar ---
  const uploadAvatarMutation = useMutation({
    mutationFn: uploadService.uploadAvatar,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      await fetchUser();
      console.log("Avatar actualizado correctamente");
    },
    onError: (error) => console.error("Error al subir avatar:", error),
  });

  // --- 2. MUTATION: Upload Resume (CV) ---
  const uploadResumeMutation = useMutation({
    mutationFn: uploadService.uploadResume,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      await fetchUser();
      console.log("CV actualizado correctamente");
    },
    onError: (error) => console.error("Error al subir CV:", error),
  });

  // --- 3. MUTATION: Upload Project Cover ---
  const uploadProjectCoverMutation = useMutation({
    mutationFn: ({ projectId, file }: { projectId: number; file: File }) =>
      uploadService.uploadProjectCover(projectId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["projects", variables.projectId],
      });

      console.log("Portada de proyecto actualizada");
    },
  });

  // --- 4. MUTATION: Upload Skill Icon ---
  const uploadSkillIconMutation = useMutation({
    mutationFn: ({ skillId, file }: { skillId: number; file: File }) =>
      uploadService.uploadSkillIcon(skillId, file),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skillCategories"] });
      queryClient.invalidateQueries({ queryKey: ["skills"] });

      console.log("Icono de skill actualizado");
    },
  });

  // --- 5. MUTATION: Upload Certificate File ---
  const uploadCertificateFileMutation = useMutation({
    mutationFn: ({
      certificateId,
      file,
    }: {
      certificateId: number;
      file: File;
    }) => uploadService.uploadCertificateFile(certificateId, file),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      console.log("Archivo de certificado subido");
    },
  });

  return {
    // Actions
    uploadAvatar: uploadAvatarMutation.mutateAsync,
    uploadResume: uploadResumeMutation.mutateAsync,
    uploadProjectCover: uploadProjectCoverMutation.mutateAsync,
    uploadSkillIcon: uploadSkillIconMutation.mutateAsync,
    uploadCertificateFile: uploadCertificateFileMutation.mutateAsync,

    // Loading States
    isUploadingAvatar: uploadAvatarMutation.isPending,
    isUploadingResume: uploadResumeMutation.isPending,
    isUploadingProjectCover: uploadProjectCoverMutation.isPending,
    isUploadingSkillIcon: uploadSkillIconMutation.isPending,
    isUploadingCertificate: uploadCertificateFileMutation.isPending,
  };
};
