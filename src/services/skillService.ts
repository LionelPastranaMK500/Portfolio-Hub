// src/services/skillService.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  SkillCategoryDto,
  SkillCategoryCreateRequest,
  SkillCategoryUpdateRequest,
  BatchDeleteRequest as CategoryBatchDeleteRequest,
} from "../types/skillCategory";
import type {
  SkillDto,
  SkillCreateRequest,
  SkillUpdateRequest,
  BatchDeleteRequest as SkillBatchDeleteRequest,
} from "../types/skill";
import { useAuthStore } from "./auth/authStore";

// Query Key principal para toda la data de skills/categorías
export const SKILL_CATEGORIES_QUERY_KEY = ["skillCategories"];

// --- API: Funciones de SkillCategory ---

/**
 * GET /api/me/skill-categories
 */
const getSkillCategories = async (): Promise<SkillCategoryDto[]> => {
  const { data: res } = await apiClient.get<ApiResponse<SkillCategoryDto[]>>(
    "/me/skill-categories"
  );
  if (res.success) return res.data;
  throw new Error(res.message || "Error al obtener categorías");
};

/**
 * POST /api/me/skill-categories/batch
 */
const batchCreateCategories = async (
  newData: SkillCategoryCreateRequest[]
): Promise<SkillCategoryDto[]> => {
  const { data: res } = await apiClient.post<ApiResponse<SkillCategoryDto[]>>(
    "/me/skill-categories/batch",
    newData
  );
  if (res.success) return res.data;
  throw new Error(res.message || "Error al crear categorías");
};

/**
 * PUT /api/me/skill-categories/batch
 */
const batchUpdateCategories = async (
  updatedData: SkillCategoryUpdateRequest[]
): Promise<SkillCategoryDto[]> => {
  const { data: res } = await apiClient.put<ApiResponse<SkillCategoryDto[]>>(
    "/me/skill-categories/batch",
    updatedData
  );
  if (res.success) return res.data;
  throw new Error(res.message || "Error al actualizar categorías");
};

/**
 * DELETE /api/me/skill-categories/batch
 */
const batchDeleteCategories = async (
  payload: CategoryBatchDeleteRequest
): Promise<void> => {
  const { data: res } = await apiClient.delete<ApiResponse<void>>(
    "/me/skill-categories/batch",
    { data: payload } // DELETE con body se pasa en la propiedad 'data'
  );
  if (!res.success) {
    throw new Error(res.message || "Error al eliminar categorías");
  }
};

// --- API: Funciones de Skill (Anidadas) ---

/**
 * POST /api/me/skill-categories/{categoryId}/skills/batch
 */
const batchCreateSkills = async ({
  categoryId,
  skills,
}: {
  categoryId: number;
  skills: SkillCreateRequest[];
}): Promise<SkillDto[]> => {
  const { data: res } = await apiClient.post<ApiResponse<SkillDto[]>>(
    `/me/skill-categories/${categoryId}/skills/batch`,
    skills
  );
  if (res.success) return res.data;
  throw new Error(res.message || "Error al crear skills");
};

/**
 * PUT /api/me/skill-categories/{categoryId}/skills/batch
 */
const batchUpdateSkills = async ({
  categoryId,
  skills,
}: {
  categoryId: number;
  skills: SkillUpdateRequest[];
}): Promise<SkillDto[]> => {
  const { data: res } = await apiClient.put<ApiResponse<SkillDto[]>>(
    `/me/skill-categories/${categoryId}/skills/batch`,
    skills
  );
  if (res.success) return res.data;
  throw new Error(res.message || "Error al actualizar skills");
};

/**
 * DELETE /api/me/skill-categories/{categoryId}/skills/batch
 */
const batchDeleteSkills = async ({
  categoryId,
  payload,
}: {
  categoryId: number;
  payload: SkillBatchDeleteRequest;
}): Promise<void> => {
  const { data: res } = await apiClient.delete<ApiResponse<void>>(
    `/me/skill-categories/${categoryId}/skills/batch`,
    { data: payload }
  );
  if (!res.success) {
    throw new Error(res.message || "Error al eliminar skills");
  }
};

// --- Hooks: SkillCategory ---

/**
 * Hook para OBTENER todas las categorías y sus skills anidados.
 */
export const useSkillCategories = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: SKILL_CATEGORIES_QUERY_KEY,
    queryFn: getSkillCategories,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

/**
 * Hook (Mutación) para CREAR categorías en lote.
 */
export const useBatchCreateCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: batchCreateCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ACTUALIZAR categorías en lote.
 */
export const useBatchUpdateCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: batchUpdateCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ELIMINAR categorías en lote.
 */
export const useBatchDeleteCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: batchDeleteCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY });
    },
  });
};

// --- Hooks: Skill (Anidados) ---

/**
 * Hook (Mutación) para CREAR skills en lote bajo una categoría.
 */
export const useBatchCreateSkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: batchCreateSkills,
    onSuccess: () => {
      // Cualquier cambio en los skills requiere refrescar el árbol completo
      queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ACTUALIZAR skills en lote bajo una categoría.
 */
export const useBatchUpdateSkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: batchUpdateSkills,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ELIMINAR skills en lote bajo una categoría.
 */
export const useBatchDeleteSkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: batchDeleteSkills,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY });
    },
  });
};
