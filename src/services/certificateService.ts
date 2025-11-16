// src/services/certificateService.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  CertificateDto,
  CertificateCreateRequest,
  CertificateUpdateRequest,
} from "../types/certificate";
import { useAuthStore } from "./auth/authStore";

// 1. Query Key
export const CERTIFICATES_QUERY_KEY = ["certificates"];

// --- API FUNCTIONS ---

/**
 * GET /api/me/certificates
 * Obtiene TODOS los certificados del usuario
 */
const getMyCertificates = async (): Promise<CertificateDto[]> => {
  const { data: response } = await apiClient.get<ApiResponse<CertificateDto[]>>(
    "/me/certificates"
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener certificados");
};

/**
 * POST /api/me/certificates
 * Crea un nuevo certificado (solo los datos de texto)
 */
const createCertificate = async (
  newData: CertificateCreateRequest
): Promise<CertificateDto> => {
  const { data: response } = await apiClient.post<ApiResponse<CertificateDto>>(
    "/me/certificates",
    newData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al crear el certificado");
};

/**
 * PUT /api/me/certificates
 * Actualiza los datos de texto de un certificado
 */
const updateCertificate = async (
  updatedData: CertificateUpdateRequest
): Promise<CertificateDto> => {
  const { data: response } = await apiClient.put<ApiResponse<CertificateDto>>(
    "/me/certificates",
    updatedData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al actualizar el certificado");
};

/**
 * DELETE /api/me/certificates/{id}
 * Elimina un certificado
 */
const deleteCertificate = async (id: number): Promise<void> => {
  const { data: response } = await apiClient.delete<ApiResponse<void>>(
    `/me/certificates/${id}`
  );
  if (!response.success) {
    throw new Error(response.message || "Error al eliminar el certificado");
  }
};

/**
 * POST /api/me/upload/certificate/{certificateId}/file
 * Sube el archivo de imagen/pdf para un certificado existente
 */
const uploadCertificateFile = async ({
  certificateId,
  file,
}: {
  certificateId: number;
  file: File;
}): Promise<CertificateDto> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data: response } = await apiClient.post<ApiResponse<CertificateDto>>(
    `/me/upload/certificate/${certificateId}/file`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al subir el archivo");
};

// --- REACT QUERY HOOKS ---

/**
 * Hook para obtener la lista de certificados del usuario.
 */
export const useMyCertificates = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: CERTIFICATES_QUERY_KEY,
    queryFn: getMyCertificates,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

/**
 * Hook (Mutación) para CREAR un nuevo certificado (datos de texto).
 */
export const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCertificate,
    onSuccess: () => {
      // Invalida la caché para refrescar la lista
      queryClient.invalidateQueries({ queryKey: CERTIFICATES_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ACTUALIZAR un certificado (datos de texto).
 */
export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATES_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ELIMINAR un certificado.
 */
export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATES_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para SUBIR EL ARCHIVO de un certificado.
 */
export const useUploadCertificateFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadCertificateFile,
    onSuccess: () => {
      // Refresca la lista, ya que 'imageUrl' y 'fileId' habrán cambiado
      queryClient.invalidateQueries({ queryKey: CERTIFICATES_QUERY_KEY });
    },
  });
};
