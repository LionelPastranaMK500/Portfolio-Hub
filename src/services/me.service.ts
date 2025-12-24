import apiClient from "../config/api";
import type { ApiResponse } from "../types/api/ApiResponse";
import type {
  ProfileDto,
  ProfileUpdateRequest,
  ContactEmailUpdateRequest,
} from "../types/models/profile";

/**
 * ESPEJO DE: MeController.java
 * Backend: src/main/java/studios/tkoh/portfolio/controller/MeController.java
 */
const BASE_URL = "/me";

export const meService = {
  /**
   * @GetMapping("/profile")
   */
  getMyProfile: async (): Promise<ProfileDto> => {
    const response = await apiClient.get<ApiResponse<ProfileDto>>(
      `${BASE_URL}/profile`
    );
    return response.data.data;
  },

  /**
   * @PutMapping("/profile")
   */
  updateMyProfile: async (
    request: ProfileUpdateRequest
  ): Promise<ProfileDto> => {
    const response = await apiClient.put<ApiResponse<ProfileDto>>(
      `${BASE_URL}/profile`,
      request
    );
    return response.data.data;
  },

  /**
   * @PutMapping("/settings/contact-email")
   */
  updateContactEmail: async (
    request: ContactEmailUpdateRequest
  ): Promise<ProfileDto> => {
    const response = await apiClient.put<ApiResponse<ProfileDto>>(
      `${BASE_URL}/settings/contact-email`,
      request
    );
    return response.data.data;
  },
};
