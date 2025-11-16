// src/services/projectService.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  ProjectDto,
  ProjectCreateRequest,
  ProjectUpdateRequest,
  ProjectSkillAssociationRequest,
} from "../types/project";
import { useAuthStore } from "./auth/authStore";

// 1. Query Key
export const PROJECTS_QUERY_KEY = ["projects"];

// --- API FUNCTIONS ---

/**
 * GET /api/me/projects
 * Obtiene TODOS los proyectos del usuario
 */
const getMyProjects = async (): Promise<ProjectDto[]> => {
  const { data: response } = await apiClient.get<ApiResponse<ProjectDto[]>>(
    "/me/projects"
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener proyectos");
};

/**
 * GET /api/me/projects/{id}
 * Obtiene un proyecto específico por ID
 */
const getProjectById = async (id: number): Promise<ProjectDto> => {
  const { data: response } = await apiClient.get<ApiResponse<ProjectDto>>(
    `/me/projects/${id}`
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener el proyecto");
};

/**
 * POST /api/me/projects
 * Crea un nuevo proyecto
 */
const createProject = async (
  newData: ProjectCreateRequest
): Promise<ProjectDto> => {
  const { data: response } = await apiClient.post<ApiResponse<ProjectDto>>(
    "/me/projects",
    newData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al crear el proyecto");
};

/**
 * PUT /api/me/projects
 * Actualiza un proyecto (el ID va en el body)
 */
const updateProject = async (
  updatedData: ProjectUpdateRequest
): Promise<ProjectDto> => {
  const { data: response } = await apiClient.put<ApiResponse<ProjectDto>>(
    "/me/projects",
    updatedData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al actualizar el proyecto");
};

/**
 * DELETE /api/me/projects/{id}
 * Elimina un proyecto
 */
const deleteProject = async (id: number): Promise<void> => {
  const { data: response } = await apiClient.delete<ApiResponse<void>>(
    `/me/projects/${id}`
  );
  if (!response.success) {
    throw new Error(response.message || "Error al eliminar el proyecto");
  }
};

/**
 * POST /api/me/projects/{projectId}/skills
 * Asocia una lista de IDs de Skills a un proyecto
 */
const associateSkills = async ({
  projectId,
  skillIds,
}: {
  projectId: number;
  skillIds: number[];
}): Promise<ProjectDto> => {
  const payload: ProjectSkillAssociationRequest = { skillIds };
  const { data: response } = await apiClient.post<ApiResponse<ProjectDto>>(
    `/me/projects/${projectId}/skills`,
    payload
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al asociar skills");
};

// --- REACT QUERY HOOKS ---

/**
 * Hook para obtener la lista de proyectos del usuario.
 */
export const useMyProjects = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: getMyProjects,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

/**
 * Hook para obtener los detalles de un solo proyecto por ID.
 */
export const useProject = (projectId: number) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: [PROJECTS_QUERY_KEY, "detail", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!isAuthenticated && !!projectId, // Solo si está logueado Y hay un ID
  });
};

/**
 * Hook (Mutación) para CREAR un nuevo proyecto.
 */
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      // Refresca la lista de proyectos
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ACTUALIZAR un proyecto.
 */
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
    onSuccess: (updatedProject) => {
      // Refresca la lista de proyectos
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      // También refresca el detalle de ESE proyecto
      queryClient.invalidateQueries({
        queryKey: [PROJECTS_QUERY_KEY, "detail", updatedProject.id],
      });
    },
  });
};

/**
 * Hook (Mutación) para ELIMINAR un proyecto.
 */
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
};

/**
 * Hook (Mutación) para ASOCIAR SKILLS a un proyecto.
 */
export const useAssociateSkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: associateSkills,
    onSuccess: (updatedProject) => {
      // Refresca la lista de proyectos (porque 'skills' puede estar allí)
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      // Refresca el detalle de ESE proyecto
      queryClient.invalidateQueries({
        queryKey: [PROJECTS_QUERY_KEY, "detail", updatedProject.id],
      });
    },
  });
};
