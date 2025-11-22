// src/services/skillService.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";

// Importamos los tipos originales
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

// --- RE-EXPORTACIÓN (La técnica Pro) ---
export type {
  SkillCategoryDto,
  SkillCategoryCreateRequest,
  SkillCategoryUpdateRequest,
  SkillDto,
  SkillCreateRequest,
  SkillUpdateRequest,
};

export const SKILL_CATEGORIES_QUERY_KEY = ["skillCategories"];

// --- API FUNCTIONS ---

// 1. Obtener todo el árbol
const getSkillCategories = async (): Promise<SkillCategoryDto[]> => {
  const { data: res } = await apiClient.get<ApiResponse<SkillCategoryDto[]>>(
    "/me/skill-categories"
  );
  if (res.success) return res.data;
  throw new Error(res.message);
};

// 2. Crear Categoría (Batch de 1)
const createCategory = async (
  data: SkillCategoryCreateRequest
): Promise<void> => {
  // La API espera un array (batch), así que envolvemos el objeto en [data]
  const { data: res } = await apiClient.post<ApiResponse<SkillCategoryDto[]>>(
    "/me/skill-categories/batch",
    [data]
  );
  if (!res.success) throw new Error(res.message);
};

// 3. Actualizar Categoría
const updateCategory = async (
  data: SkillCategoryUpdateRequest
): Promise<void> => {
  const { data: res } = await apiClient.put<ApiResponse<SkillCategoryDto[]>>(
    "/me/skill-categories/batch",
    [data]
  );
  if (!res.success) throw new Error(res.message);
};

// 4. Eliminar Categoría
const deleteCategory = async (id: number): Promise<void> => {
  const payload: CategoryBatchDeleteRequest = { ids: [id] };
  const { data: res } = await apiClient.delete<ApiResponse<void>>(
    "/me/skill-categories/batch",
    { data: payload }
  );
  if (!res.success) throw new Error(res.message);
};

// 5. Crear Skill (Batch de 1)
const createSkill = async ({
  categoryId,
  data,
}: {
  categoryId: number;
  data: SkillCreateRequest;
}): Promise<void> => {
  const { data: res } = await apiClient.post<ApiResponse<SkillDto[]>>(
    `/me/skill-categories/${categoryId}/skills/batch`,
    [data]
  );
  if (!res.success) throw new Error(res.message);
};

// 6. Actualizar Skill
const updateSkill = async ({
  categoryId,
  data,
}: {
  categoryId: number;
  data: SkillUpdateRequest;
}): Promise<void> => {
  const { data: res } = await apiClient.put<ApiResponse<SkillDto[]>>(
    `/me/skill-categories/${categoryId}/skills/batch`,
    [data]
  );
  if (!res.success) throw new Error(res.message);
};

// 7. Eliminar Skill
const deleteSkill = async ({
  categoryId,
  skillId,
}: {
  categoryId: number;
  skillId: number;
}): Promise<void> => {
  const payload: SkillBatchDeleteRequest = { ids: [skillId] };
  const { data: res } = await apiClient.delete<ApiResponse<void>>(
    `/me/skill-categories/${categoryId}/skills/batch`,
    { data: payload }
  );
  if (!res.success) throw new Error(res.message);
};

// --- HOOKS ---

export const useSkillCategories = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: SKILL_CATEGORIES_QUERY_KEY,
    queryFn: getSkillCategories,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
};

// Helper para invalidar cache
const useInvalidateSkills = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY });
};

// --- Hooks de Mutación Simplificados ---

export const useCreateCategory = () => {
  const invalidate = useInvalidateSkills();
  return useMutation({ mutationFn: createCategory, onSuccess: invalidate });
};

export const useUpdateCategory = () => {
  const invalidate = useInvalidateSkills();
  return useMutation({ mutationFn: updateCategory, onSuccess: invalidate });
};

export const useDeleteCategory = () => {
  const invalidate = useInvalidateSkills();
  return useMutation({ mutationFn: deleteCategory, onSuccess: invalidate });
};

export const useCreateSkill = () => {
  const invalidate = useInvalidateSkills();
  return useMutation({ mutationFn: createSkill, onSuccess: invalidate });
};

export const useUpdateSkill = () => {
  const invalidate = useInvalidateSkills();
  return useMutation({ mutationFn: updateSkill, onSuccess: invalidate });
};

export const useDeleteSkill = () => {
  const invalidate = useInvalidateSkills();
  return useMutation({ mutationFn: deleteSkill, onSuccess: invalidate });
};
