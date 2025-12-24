import apiClient from "../config/api";
import type { ApiResponse } from "../types/api/ApiResponse";
import type { ProfileDto } from "../types/models/profile";
import type { ProjectDto } from "../types/models/project";
import type { SkillDto } from "../types/models/skill";
import type { CertificateDto } from "../types/models/certificate";

/**
 * ESPEJO DE: UploadController.java
 * Backend: src/main/java/studios/tkoh/portfolio/controller/UploadController.java
 */
const BASE_URL = "/me/upload";

export const uploadService = {
  /**
   * @PostMapping("/avatar")
   */
  uploadAvatar: async (file: File): Promise<ProfileDto> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<ApiResponse<ProfileDto>>(
      `${BASE_URL}/avatar`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },

  /**
   * @PostMapping("/resume")
   */
  uploadResume: async (file: File): Promise<ProfileDto> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<ApiResponse<ProfileDto>>(
      `${BASE_URL}/resume`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },

  /**
   * @PostMapping("/project/{projectId}/cover")
   */
  uploadProjectCover: async (
    projectId: number,
    file: File
  ): Promise<ProjectDto> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<ApiResponse<ProjectDto>>(
      `${BASE_URL}/project/${projectId}/cover`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },

  /**
   * @PostMapping("/skill/{skillId}/icon")
   */
  uploadSkillIcon: async (skillId: number, file: File): Promise<SkillDto> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<ApiResponse<SkillDto>>(
      `${BASE_URL}/skill/${skillId}/icon`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },

  /**
   * @PostMapping("/certificate/{certificateId}/file")
   */
  uploadCertificateFile: async (
    certificateId: number,
    file: File
  ): Promise<CertificateDto> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<ApiResponse<CertificateDto>>(
      `${BASE_URL}/certificate/${certificateId}/file`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },
};
