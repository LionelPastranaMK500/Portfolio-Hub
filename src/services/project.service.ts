import apiClient from "../config/api";
import type { ApiResponse } from "../types/api/ApiResponse";
import type {
  ProjectDto,
  ProjectCreateRequest,
  ProjectUpdateRequest,
  ProjectSkillAssociationRequest,
} from "../types/models/project";

/**
 * ESPEJO DE: ProjectMeController.java
 * Backend: src/main/java/studios/tkoh/portfolio/controller/ProjectMeController.java
 */
const BASE_URL = "/me/projects";

export const projectService = {
  /**
   * @GetMapping
   * Lista todos los proyectos.
   */
  listAll: async (): Promise<ProjectDto[]> => {
    const response = await apiClient.get<ApiResponse<ProjectDto[]>>(BASE_URL);
    return response.data.data;
  },

  /**
   * @GetMapping("/{id}")
   */
  getById: async (id: number): Promise<ProjectDto> => {
    const response = await apiClient.get<ApiResponse<ProjectDto>>(
      `${BASE_URL}/${id}`
    );
    return response.data.data;
  },

  /**
   * @PostMapping
   */
  create: async (request: ProjectCreateRequest): Promise<ProjectDto> => {
    const response = await apiClient.post<ApiResponse<ProjectDto>>(
      BASE_URL,
      request
    );
    return response.data.data;
  },

  /**
   * @PutMapping
   */
  update: async (request: ProjectUpdateRequest): Promise<ProjectDto> => {
    const response = await apiClient.put<ApiResponse<ProjectDto>>(
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
    request: ProjectCreateRequest
  ): Promise<ProjectDto> => {
    const response = await apiClient.put<ApiResponse<ProjectDto>>(
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

  // --- Métodos Específicos de Projects ---

  /**
   * @PostMapping("/{projectId}/skills")
   */
  associateSkills: async (
    projectId: number,
    request: ProjectSkillAssociationRequest
  ): Promise<ProjectDto> => {
    const response = await apiClient.post<ApiResponse<ProjectDto>>(
      `${BASE_URL}/${projectId}/skills`,
      request
    );
    return response.data.data;
  },
};
