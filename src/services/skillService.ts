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

const getSkillCategories = async (): Promise<SkillCategoryDto[]> => {
  // CORRECCIÓN: /api added
  const { data: res } = await apiClient.get<ApiResponse<SkillCategoryDto[]>>(
    "/api/me/skill-categories"
  );
  if (res.success) return res.data;
  throw new Error(res.message);
};

const createCategory = async (
  data: SkillCategoryCreateRequest
): Promise<void> => {
  // CORRECCIÓN: /api added
  const { data: res } = await apiClient.post<ApiResponse<SkillCategoryDto[]>>(
    "/api/me/skill-categories/batch",
    [data]
  );
  if (!res.success) throw new Error(res.message);
};

const updateCategory = async (
  data: SkillCategoryUpdateRequest
): Promise<void> => {
  // CORRECCIÓN: /api added
  const { data: res } = await apiClient.put<ApiResponse<SkillCategoryDto[]>>(
    "/api/me/skill-categories/batch",
    [data]
  );
  if (!res.success) throw new Error(res.message);
};

const deleteCategory = async (id: number): Promise<void> => {
  const payload: CategoryBatchDeleteRequest = { ids: [id] };
  // CORRECCIÓN: /api added
  const { data: res } = await apiClient.delete<ApiResponse<void>>(
    "/api/me/skill-categories/batch",
    { data: payload }
  );
  if (!res.success) throw new Error(res.message);
};

const createSkill = async ({
  categoryId,
  data,
}: {
  categoryId: number;
  data: SkillCreateRequest;
}): Promise<void> => {
  // CORRECCIÓN: /api added
  const { data: res } = await apiClient.post<ApiResponse<SkillDto[]>>(
    `/api/me/skill-categories/${categoryId}/skills/batch`,
    [data]
  );
  if (!res.success) throw new Error(res.message);
};

const updateSkill = async ({
  categoryId,
  data,
}: {
  categoryId: number;
  data: SkillUpdateRequest;
}): Promise<void> => {
  // CORRECCIÓN: /api added
  const { data: res } = await apiClient.put<ApiResponse<SkillDto[]>>(
    `/api/me/skill-categories/${categoryId}/skills/batch`,
    [data]
  );
  if (!res.success) throw new Error(res.message);
};

const deleteSkill = async ({
  categoryId,
  skillId,
}: {
  categoryId: number;
  skillId: number;
}): Promise<void> => {
  const payload: SkillBatchDeleteRequest = { ids: [skillId] };
  // CORRECCIÓN: /api added
  const { data: res } = await apiClient.delete<ApiResponse<void>>(
    `/api/me/skill-categories/${categoryId}/skills/batch`,
    { data: payload }
  );
  if (!res.success) throw new Error(res.message);
};

// --- HOOKS (Sin cambios) ---

export const useSkillCategories = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: SKILL_CATEGORIES_QUERY_KEY,
    queryFn: getSkillCategories,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
};

const useInvalidateSkills = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY });
};

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
