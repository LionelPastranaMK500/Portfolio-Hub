import apiClient from "../config/api";
import type { ApiResponse } from "../types/api/ApiResponse";
import type {
  ExperienceDto,
  ExperienceCreateRequest,
  ExperienceUpdateRequest,
} from "../types/models/experience";

/**
 * ESPEJO DE: ExperienceController.java
 * Backend: src/main/java/studios/tkoh/portfolio/controller/ExperienceController.java
 * Ruta Base: /api/me/experience (Singular, tal como está en el Controller)
 */
const BASE_URL = "/me/experience";

export const experienceService = {
  /**
   * @GetMapping
   * Lista todas las experiencias.
   */
  listAll: async (): Promise<ExperienceDto[]> => {
    const response = await apiClient.get<ApiResponse<ExperienceDto[]>>(
      BASE_URL
    );
    return response.data.data;
  },

  /**
   * @GetMapping("/{id}")
   * Obtiene una experiencia por ID.
   */
  getById: async (id: number): Promise<ExperienceDto> => {
    const response = await apiClient.get<ApiResponse<ExperienceDto>>(
      `${BASE_URL}/${id}`
    );
    return response.data.data;
  },

  /**
   * @PostMapping
   * Crea una nueva experiencia.
   */
  create: async (request: ExperienceCreateRequest): Promise<ExperienceDto> => {
    const response = await apiClient.post<ApiResponse<ExperienceDto>>(
      BASE_URL,
      request
    );
    return response.data.data;
  },

  /**
   * @PutMapping
   * Actualiza usando el DTO completo (con ID dentro).
   */
  update: async (request: ExperienceUpdateRequest): Promise<ExperienceDto> => {
    const response = await apiClient.put<ApiResponse<ExperienceDto>>(
      BASE_URL,
      request
    );
    return response.data.data;
  },

  /**
   * @PutMapping("/{id}")
   * Actualiza enviando ID en la URL y los datos de creación en el body.
   */
  updateWithId: async (
    id: number,
    request: ExperienceCreateRequest
  ): Promise<ExperienceDto> => {
    const response = await apiClient.put<ApiResponse<ExperienceDto>>(
      `${BASE_URL}/${id}`,
      request
    );
    return response.data.data;
  },

  /**
   * @DeleteMapping("/{id}")
   * Elimina una experiencia.
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`${BASE_URL}/${id}`);
  },
};
