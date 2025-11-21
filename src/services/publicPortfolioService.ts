// src/services/publicPortfolioService.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  PortfolioPublicDto,
  PortfolioDetailDto,
} from "../types/portfolio";
import type { ProjectDto } from "../types/project";

// --- Query Keys ---
export const PUBLIC_PORTFOLIOS_KEY = ["publicPortfolios"];
export const PUBLIC_PORTFOLIO_DETAIL_KEY = "publicPortfolioDetail";
export const PUBLIC_PROJECT_DETAIL_KEY = "publicProjectDetail";

// --- API Functions ---

/**
 * GET /api/portfolios
 * Obtiene la lista de todos los perfiles públicos
 */
const getPublicPortfolios = async (): Promise<PortfolioPublicDto[]> => {
  const { data: response } = await apiClient.get<
    ApiResponse<PortfolioPublicDto[]>
  >("/portfolios");
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener portafolios");
};

/**
 * GET /api/portfolios/{slug}
 * Obtiene el detalle de un portafolio por su slug
 */
const getPortfolioBySlug = async (
  slug: string
): Promise<PortfolioDetailDto> => {
  const { data: response } = await apiClient.get<
    ApiResponse<PortfolioDetailDto>
  >(`/portfolios/${slug}`);
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener portafolio");
};

/**
 * GET /api/portfolios/{profileSlug}/projects/{projectSlug}
 * Obtiene el detalle de un proyecto público
 */
const getPublicProjectBySlugs = async ({
  profileSlug,
  projectSlug,
}: {
  profileSlug: string;
  projectSlug: string;
}): Promise<ProjectDto> => {
  const { data: response } = await apiClient.get<ApiResponse<ProjectDto>>(
    `/portfolios/${profileSlug}/projects/${projectSlug}`
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener proyecto");
};

// --- React Query Hooks ---

/**
 * Hook para obtener la lista pública de portafolios
 */
export const usePublicPortfolios = () => {
  return useQuery({
    queryKey: PUBLIC_PORTFOLIOS_KEY,
    queryFn: getPublicPortfolios,
    staleTime: 1000 * 60 * 5, // 5 minutos de caché
  });
};

/**
 * Hook para obtener el detalle de UN portafolio por slug
 */
export const usePortfolioDetail = (slug: string) => {
  return useQuery({
    queryKey: [PUBLIC_PORTFOLIO_DETAIL_KEY, slug],
    queryFn: () => getPortfolioBySlug(slug),
    enabled: !!slug, // Solo se ejecuta si el slug existe
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para obtener el detalle de UN proyecto público
 */
export const usePublicProjectDetail = (
  profileSlug: string,
  projectSlug: string
) => {
  return useQuery({
    queryKey: [PUBLIC_PROJECT_DETAIL_KEY, profileSlug, projectSlug],
    queryFn: () => getPublicProjectBySlugs({ profileSlug, projectSlug }),
    enabled: !!profileSlug && !!projectSlug,
    staleTime: 1000 * 60 * 5,
  });
};
