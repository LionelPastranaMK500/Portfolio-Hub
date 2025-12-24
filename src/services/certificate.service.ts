import apiClient from "../config/api";
import type { ApiResponse } from "../types/api/ApiResponse";
import type {
  CertificateDto,
  CertificateCreateRequest,
  CertificateUpdateRequest,
} from "../types/models/certificate";

/**
 * ESPEJO DE: CertificateController.java
 * Backend: src/main/java/studios/tkoh/portfolio/controller/CertificateController.java
 */
const BASE_URL = "/me/certificates";

export const certificateService = {
  /**
   * @GetMapping
   * Lista todos los certificados del usuario actual.
   */
  listAll: async (): Promise<CertificateDto[]> => {
    const response = await apiClient.get<ApiResponse<CertificateDto[]>>(
      BASE_URL
    );
    return response.data.data;
  },

  /**
   * @GetMapping("/{id}")
   */
  getById: async (id: number): Promise<CertificateDto> => {
    const response = await apiClient.get<ApiResponse<CertificateDto>>(
      `${BASE_URL}/${id}`
    );
    return response.data.data;
  },

  /**
   * @PostMapping
   * Crea el registro del certificado.
   */
  create: async (
    request: CertificateCreateRequest
  ): Promise<CertificateDto> => {
    const response = await apiClient.post<ApiResponse<CertificateDto>>(
      BASE_URL,
      request
    );
    return response.data.data;
  },

  /**
   * @PutMapping
   * Actualiza usando el DTO completo.
   */
  update: async (
    request: CertificateUpdateRequest
  ): Promise<CertificateDto> => {
    const response = await apiClient.put<ApiResponse<CertificateDto>>(
      BASE_URL,
      request
    );
    return response.data.data;
  },

  /**
   * @PutMapping("/{id}")
   * Actualiza enviando ID en la URL y datos de creación en el body.
   */
  updateWithId: async (
    id: number,
    request: CertificateCreateRequest
  ): Promise<CertificateDto> => {
    const response = await apiClient.put<ApiResponse<CertificateDto>>(
      `${BASE_URL}/${id}`,
      request
    );
    return response.data.data;
  },

  /**
   * @DeleteMapping("/{id}")
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`${BASE_URL}/${id}`);
  },
};
