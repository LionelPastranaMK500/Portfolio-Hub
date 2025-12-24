import apiClient from "../config/api";
import type { ApiResponse } from "../types/api/ApiResponse";
import type {
  EducationDto,
  EducationCreateRequest,
  EducationUpdateRequest,
} from "../types/models/education";

/**
 * ESPEJO DE: EducationController.java
 * Backend: src/main/java/studios/tkoh/portfolio/controller/EducationController.java
 * Ruta Base: /api/me/education (OJO: Singular, según tu código Java)
 */
const BASE_URL = "/me/education";

export const educationService = {
  /**
   * @GetMapping
   */
  listAll: async (): Promise<EducationDto[]> => {
    const response = await apiClient.get<ApiResponse<EducationDto[]>>(BASE_URL);
    return response.data.data;
  },

  /**
   * @GetMapping("/{id}")
   */
  getById: async (id: number): Promise<EducationDto> => {
    const response = await apiClient.get<ApiResponse<EducationDto>>(
      `${BASE_URL}/${id}`
    );
    return response.data.data;
  },

  /**
   * @PostMapping
   */
  create: async (request: EducationCreateRequest): Promise<EducationDto> => {
    const response = await apiClient.post<ApiResponse<EducationDto>>(
      BASE_URL,
      request
    );
    return response.data.data;
  },

  /**
   * @PutMapping
   */
  update: async (request: EducationUpdateRequest): Promise<EducationDto> => {
    const response = await apiClient.put<ApiResponse<EducationDto>>(
      BASE_URL,
      request
    );
    return response.data.data;
  },

  /**
   * @PutMapping("/{id}")
   */
  updateWithId: async (
    id: number,
    request: EducationCreateRequest
  ): Promise<EducationDto> => {
    const response = await apiClient.put<ApiResponse<EducationDto>>(
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
