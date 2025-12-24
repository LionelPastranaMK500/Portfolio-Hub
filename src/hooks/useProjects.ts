import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../services/project.service";

/**
 * Hook para gestionar Proyectos y sus Skills
 * Archivo: src/hooks/useProjects.ts
 */
export const useProjects = () => {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["projects"];

  // --- 1. QUERY: Listar todos ---
  const projectsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: projectService.listAll,
    staleTime: 1000 * 60 * 5,
  });

  // --- 2. MUTATION: Crear ---
  const createMutation = useMutation({
    mutationFn: projectService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // --- 3. MUTATION: Actualizar ---
  const updateMutation = useMutation({
    mutationFn: projectService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // --- 4. MUTATION: Eliminar ---
  const deleteMutation = useMutation({
    mutationFn: projectService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // --- 5. MUTATION: Asociar Skills (Especial) ---
  const associateSkillsMutation = useMutation({
    mutationFn: ({
      projectId,
      skillIds,
    }: {
      projectId: number;
      skillIds: number[];
    }) => projectService.associateSkills(projectId, { skillIds }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["projects", variables.projectId],
      });

      console.log(
        `Skills actualizados para el proyecto ${variables.projectId}`
      );
    },
  });

  return {
    // Data
    projects: projectsQuery.data || [],
    isLoading: projectsQuery.isLoading,
    isError: projectsQuery.isError,

    // Actions Standard
    createProject: createMutation.mutateAsync,
    updateProject: updateMutation.mutateAsync,
    deleteProject: deleteMutation.mutateAsync,

    // Action Especial
    associateSkills: associateSkillsMutation.mutateAsync,

    // Loading States
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isAssociatingSkills: associateSkillsMutation.isPending,
  };
};

/**
 * Hook para obtener UN proyecto por ID
 */
export const useProjectById = (id: number | null) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => projectService.getById(id!),
    enabled: !!id,
  });
};
