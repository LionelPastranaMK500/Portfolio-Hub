import apiClient from "../config/api";
import type { ApiResponse } from "../types/api/ApiResponse";
import type {
  SkillCategoryDto,
  SkillCategoryCreateRequest,
  SkillCategoryUpdateRequest,
} from "../types/models/skillCategory";
import type {
  SkillDto,
  SkillCreateRequest,
  SkillUpdateRequest,
  BatchDeleteRequest,
  GlobalSkillDto,
} from "../types/models/skill";

/**
 * ESPEJO DE: SkillMeController.java
 * Backend: src/main/java/studios/tkoh/portfolio/controller/SkillMeController.java
 */
const BASE_URL = "/me/skill-categories";

export const skillService = {
  // --- Global Skill Search (NUEVO) ---

  /**
   * @GetMapping("/search")
   * Busca habilidades globales por nombre (autocompletado)
   */
  searchGlobalSkills: async (query: string): Promise<GlobalSkillDto[]> => {
    if (!query || query.trim() === "") return [];

    const response = await apiClient.get<ApiResponse<GlobalSkillDto[]>>(
      `${BASE_URL}/search`,
      {
        params: { query },
      }
    );
    return response.data.data;
  },

  // --- SkillCategory Endpoints ---

  /**
   * @GetMapping
   */
  getAllCategories: async (): Promise<SkillCategoryDto[]> => {
    const response = await apiClient.get<ApiResponse<SkillCategoryDto[]>>(
      BASE_URL
    );
    return response.data.data;
  },

  /**
   * @GetMapping("/{categoryId}")
   */
  getCategoryById: async (categoryId: number): Promise<SkillCategoryDto> => {
    const response = await apiClient.get<ApiResponse<SkillCategoryDto>>(
      `${BASE_URL}/${categoryId}`
    );
    return response.data.data;
  },

  /**
   * @PostMapping("/batch")
   */
  batchCreateCategories: async (
    requests: SkillCategoryCreateRequest[]
  ): Promise<SkillCategoryDto[]> => {
    const response = await apiClient.post<ApiResponse<SkillCategoryDto[]>>(
      `${BASE_URL}/batch`,
      requests
    );
    return response.data.data;
  },

  /**
   * @PutMapping("/batch")
   */
  batchUpdateCategories: async (
    requests: SkillCategoryUpdateRequest[]
  ): Promise<SkillCategoryDto[]> => {
    const response = await apiClient.put<ApiResponse<SkillCategoryDto[]>>(
      `${BASE_URL}/batch`,
      requests
    );
    return response.data.data;
  },

  /**
   * @DeleteMapping("/batch")
   */
  batchDeleteCategories: async (request: BatchDeleteRequest): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`${BASE_URL}/batch`, {
      data: request,
    });
  },

  // --- Skill (Anidado) Endpoints ---

  /**
   * @GetMapping("/{categoryId}/skills")
   */
  getSkillsForCategory: async (categoryId: number): Promise<SkillDto[]> => {
    const response = await apiClient.get<ApiResponse<SkillDto[]>>(
      `${BASE_URL}/${categoryId}/skills`
    );
    return response.data.data;
  },

  /**
   * @PostMapping("/{categoryId}/skills/batch")
   */
  batchCreateSkills: async (
    categoryId: number,
    requests: SkillCreateRequest[]
  ): Promise<SkillDto[]> => {
    const response = await apiClient.post<ApiResponse<SkillDto[]>>(
      `${BASE_URL}/${categoryId}/skills/batch`,
      requests
    );
    return response.data.data;
  },

  /**
   * @PutMapping("/{categoryId}/skills/batch")
   */
  batchUpdateSkills: async (
    categoryId: number,
    requests: SkillUpdateRequest[]
  ): Promise<SkillDto[]> => {
    const response = await apiClient.put<ApiResponse<SkillDto[]>>(
      `${BASE_URL}/${categoryId}/skills/batch`,
      requests
    );
    return response.data.data;
  },

  /**
   * @DeleteMapping("/{categoryId}/skills/batch")
   */
  batchDeleteSkills: async (
    categoryId: number,
    request: BatchDeleteRequest
  ): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(
      `${BASE_URL}/${categoryId}/skills/batch`,
      { data: request }
    );
  },
};
