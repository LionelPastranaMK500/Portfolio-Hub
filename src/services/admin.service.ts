// src/services/adminController.service.ts
import apiClient from "../config/api";
import type { ApiResponse } from "../types/api/ApiResponse";
import type { ProfileDto } from "../types/models/profile";

/**
 * Backend: src/main/java/studios/tkoh/portfolio/controller/AdminController.java
 */
export const adminService = {
  /**
   * @PostMapping("/profiles/{profileId}/toggle-collaborator")
   */
  toggleCollaboratorStatus: async (profileId: number): Promise<ProfileDto> => {
    const response = await apiClient.post<ApiResponse<ProfileDto>>(
      `/admin/profiles/${profileId}/toggle-collaborator`
    );
    return response.data.data;
  },
};
