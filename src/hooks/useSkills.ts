// src/hooks/useSkills.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skillService } from "../services/skill.service";
import type {
  SkillCreateRequest,
  SkillUpdateRequest,
  GlobalSkillDto,
} from "../types/models/skill";

const KEYS = {
  CATEGORIES: ["skillCategories"],
  SKILLS: (categoryId: number | null) => ["skills", categoryId],
  SEARCH: (query: string) => ["globalSkills", query],
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
  // ... (código anterior sin cambios)
  const queryClient = useQueryClient();
  const queryKey = KEYS.SKILLS(categoryId);

  const skillsQuery = useQuery({
    queryKey: queryKey,
    queryFn: () => skillService.getSkillsForCategory(categoryId!),
    enabled: !!categoryId,
  });

  const createBatchMutation = useMutation({
    mutationFn: (requests: SkillCreateRequest[]) =>
      skillService.batchCreateSkills(categoryId!, requests),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      queryClient.invalidateQueries({ queryKey: KEYS.CATEGORIES });
    },
  });

  const updateBatchMutation = useMutation({
    mutationFn: (requests: SkillUpdateRequest[]) =>
      skillService.batchUpdateSkills(categoryId!, requests),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      queryClient.invalidateQueries({ queryKey: KEYS.CATEGORIES });
    },
  });

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

/**
 * 3. HOOK PARA BÚSQUEDA GLOBAL (NUEVO)
 * Ideal para el autocomplete.
 */
export const useGlobalSkillSearch = (query: string) => {
  // AHORA SÍ: Usamos GlobalSkillDto[] explícitamente en el genérico
  return useQuery<GlobalSkillDto[]>({
    queryKey: KEYS.SEARCH(query),
    queryFn: () => skillService.searchGlobalSkills(query),
    enabled: !!query && query.trim().length >= 2,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
