import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  CertificateDto,
  CertificateCreateRequest,
  CertificateUpdateRequest,
} from "../types/certificate";
import { useAuthStore } from "./auth/authStore";

export type {
  CertificateDto,
  CertificateCreateRequest,
  CertificateUpdateRequest,
};

export const CERTIFICATES_QUERY_KEY = ["certificates"];

// --- API FUNCTIONS ---

const getMyCertificates = async (): Promise<CertificateDto[]> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.get<ApiResponse<CertificateDto[]>>(
    "/api/me/certificates"
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener certificados");
};

const createCertificate = async (
  newData: CertificateCreateRequest
): Promise<CertificateDto> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.post<ApiResponse<CertificateDto>>(
    "/api/me/certificates",
    newData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al crear el certificado");
};

const updateCertificate = async (
  updatedData: CertificateUpdateRequest
): Promise<CertificateDto> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.put<ApiResponse<CertificateDto>>(
    "/api/me/certificates",
    updatedData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al actualizar el certificado");
};

const deleteCertificate = async (id: number): Promise<void> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.delete<ApiResponse<void>>(
    `/api/me/certificates/${id}`
  );
  if (!response.success) {
    throw new Error(response.message || "Error al eliminar el certificado");
  }
};

const uploadCertificateFile = async ({
  certificateId,
  file,
}: {
  certificateId: number;
  file: File;
}): Promise<CertificateDto> => {
  const formData = new FormData();
  formData.append("file", file);

  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.post<ApiResponse<CertificateDto>>(
    `/api/me/upload/certificate/${certificateId}/file`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al subir el archivo");
};

// --- HOOKS (Sin cambios) ---

export const useMyCertificates = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: CERTIFICATES_QUERY_KEY,
    queryFn: getMyCertificates,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATES_QUERY_KEY });
    },
  });
};

export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATES_QUERY_KEY });
    },
  });
};

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATES_QUERY_KEY });
    },
  });
};

export const useUploadCertificateFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadCertificateFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATES_QUERY_KEY });
    },
  });
};
