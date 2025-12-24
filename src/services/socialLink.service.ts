import apiClient from "../config/api";
import type { ApiResponse } from "../types/api/ApiResponse";
import type {
  SocialLinkDto,
  SocialLinkCreateRequest,
  SocialLinkUpdateRequest,
} from "../types/models/socialLink";

/**
 * ESPEJO DE: SocialLinkController.java
 * Backend: src/main/java/studios/tkoh/portfolio/controller/SocialLinkController.java
 */
const BASE_URL = "/me/social-links";

export const socialLinkService = {
  /**
   * @GetMapping
   * Lista todas las redes sociales.
   */
  listAll: async (): Promise<SocialLinkDto[]> => {
    const response = await apiClient.get<ApiResponse<SocialLinkDto[]>>(
      BASE_URL
    );
    return response.data.data;
  },

  /**
   * @GetMapping("/{id}")
   */
  getById: async (id: number): Promise<SocialLinkDto> => {
    const response = await apiClient.get<ApiResponse<SocialLinkDto>>(
      `${BASE_URL}/${id}`
    );
    return response.data.data;
  },

  /**
   * @PostMapping
   */
  create: async (request: SocialLinkCreateRequest): Promise<SocialLinkDto> => {
    const response = await apiClient.post<ApiResponse<SocialLinkDto>>(
      BASE_URL,
      request
    );
    return response.data.data;
  },

  /**
   * @PutMapping
   */
  update: async (request: SocialLinkUpdateRequest): Promise<SocialLinkDto> => {
    const response = await apiClient.put<ApiResponse<SocialLinkDto>>(
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
    request: SocialLinkCreateRequest
  ): Promise<SocialLinkDto> => {
    const response = await apiClient.put<ApiResponse<SocialLinkDto>>(
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
