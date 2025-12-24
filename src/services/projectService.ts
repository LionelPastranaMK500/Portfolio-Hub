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

export const getMyProjects = async (): Promise<ProjectDto[]> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.get<ApiResponse<ProjectDto[]>>(
    "/api/me/projects"
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener proyectos");
};

export const getProjectById = async (id: number): Promise<ProjectDto> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.get<ApiResponse<ProjectDto>>(
    `/api/me/projects/${id}`
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener el proyecto");
};

export const createProject = async (
  newData: ProjectCreateRequest
): Promise<ProjectDto> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.post<ApiResponse<ProjectDto>>(
    "/api/me/projects",
    newData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al crear el proyecto");
};

export const updateProject = async (
  updatedData: ProjectUpdateRequest
): Promise<ProjectDto> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.put<ApiResponse<ProjectDto>>(
    "/api/me/projects",
    updatedData
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al actualizar el proyecto");
};

export const deleteProject = async (id: number): Promise<void> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.delete<ApiResponse<void>>(
    `/api/me/projects/${id}`
  );
  if (!response.success) {
    throw new Error(response.message || "Error al eliminar el proyecto");
  }
};

export const associateSkills = async ({
  projectId,
  skillIds,
}: {
  projectId: number;
  skillIds: number[];
}): Promise<ProjectDto> => {
  const payload: ProjectSkillAssociationRequest = { skillIds };
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.post<ApiResponse<ProjectDto>>(
    `/api/me/projects/${projectId}/skills`,
    payload
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al asociar skills");
};

// --- REACT QUERY HOOKS (Sin cambios) ---

export const useMyProjects = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: getMyProjects,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProject = (projectId: number) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: [PROJECTS_QUERY_KEY, "detail", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!isAuthenticated && !!projectId,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: [PROJECTS_QUERY_KEY, "detail", updatedProject.id],
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
};

export const useAssociateSkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: associateSkills,
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: [PROJECTS_QUERY_KEY, "detail", updatedProject.id],
      });
    },
  });
};
