import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skillService } from "../services/skill.service";
import type {
  SkillCreateRequest,
  SkillUpdateRequest,
} from "../types/models/skill";

const KEYS = {
  CATEGORIES: ["skillCategories"],
  SKILLS: (categoryId: number | null) => ["skills", categoryId],
};

/**
 * 1. HOOK PARA GESTIONAR CATEGORÍAS
 */
export const useSkillCategories = () => {
  const queryClient = useQueryClient();

  // --- QUERY: Obtener todas las categorías ---
  const categoriesQuery = useQuery({
    queryKey: KEYS.CATEGORIES,
    queryFn: skillService.getAllCategories,
    staleTime: 1000 * 60 * 5,
  });

  // --- MUTATION: Crear Categorías (Batch) ---
  const createBatchMutation = useMutation({
    mutationFn: skillService.batchCreateCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.CATEGORIES });
    },
  });

  // --- MUTATION: Actualizar Categorías (Batch) ---
  const updateBatchMutation = useMutation({
    mutationFn: skillService.batchUpdateCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.CATEGORIES });
    },
  });

  // --- MUTATION: Eliminar Categorías (Batch) ---
  const deleteBatchMutation = useMutation({
    mutationFn: skillService.batchDeleteCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.CATEGORIES });
    },
  });

  return {
    categories: categoriesQuery.data || [],
    isLoading: categoriesQuery.isLoading,
    isError: categoriesQuery.isError,

    createCategories: createBatchMutation.mutateAsync,
    updateCategories: updateBatchMutation.mutateAsync,
    deleteCategories: deleteBatchMutation.mutateAsync,

    isCreating: createBatchMutation.isPending,
    isUpdating: updateBatchMutation.isPending,
    isDeleting: deleteBatchMutation.isPending,
  };
};

/**
 * 2. HOOK PARA GESTIONAR SKILLS DENTRO DE UNA CATEGORÍA
 */
export const useSkillsByCategory = (categoryId: number | null) => {
  const queryClient = useQueryClient();
  const queryKey = KEYS.SKILLS(categoryId);

  // --- QUERY: Obtener Skills de esta categoría ---
  const skillsQuery = useQuery({
    queryKey: queryKey,
    queryFn: () => skillService.getSkillsForCategory(categoryId!),
    enabled: !!categoryId,
  });

  // --- MUTATION: Crear Skills (Batch) ---
  const createBatchMutation = useMutation({
    mutationFn: (requests: SkillCreateRequest[]) =>
      skillService.batchCreateSkills(categoryId!, requests),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      queryClient.invalidateQueries({ queryKey: KEYS.CATEGORIES });
    },
  });

  // --- MUTATION: Actualizar Skills (Batch) ---
  const updateBatchMutation = useMutation({
    mutationFn: (requests: SkillUpdateRequest[]) =>
      skillService.batchUpdateSkills(categoryId!, requests),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      queryClient.invalidateQueries({ queryKey: KEYS.CATEGORIES });
    },
  });

  // --- MUTATION: Eliminar Skills (Batch) ---
  const deleteBatchMutation = useMutation({
    mutationFn: (ids: number[]) =>
      skillService.batchDeleteSkills(categoryId!, { ids }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      queryClient.invalidateQueries({ queryKey: KEYS.CATEGORIES });
    },
  });

  return {
    skills: skillsQuery.data || [],
    isLoading: skillsQuery.isLoading,
    isError: skillsQuery.isError,

    createSkills: createBatchMutation.mutateAsync,
    updateSkills: updateBatchMutation.mutateAsync,
    deleteSkills: deleteBatchMutation.mutateAsync,

    isCreating: createBatchMutation.isPending,
    isUpdating: updateBatchMutation.isPending,
    isDeleting: deleteBatchMutation.isPending,
  };
};
