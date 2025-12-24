import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../config/api";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  PortfolioPublicDto,
  PortfolioDetailDto,
} from "../types/portfolio";
import type { ProjectDto } from "../types/project";
import type { ContactRequest } from "../types/Contact";

export const PUBLIC_PORTFOLIOS_KEY = ["publicPortfolios"];
export const PUBLIC_PORTFOLIO_DETAIL_KEY = "publicPortfolioDetail";
export const PUBLIC_PROJECT_DETAIL_KEY = "publicProjectDetail";

// --- API Functions ---

const getPublicPortfolios = async (): Promise<PortfolioPublicDto[]> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.get<
    ApiResponse<PortfolioPublicDto[]>
  >("/api/portfolios");
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener portafolios");
};

const getPortfolioBySlug = async (
  slug: string
): Promise<PortfolioDetailDto> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.get<
    ApiResponse<PortfolioDetailDto>
  >(`/api/portfolios/${slug}`);
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener portafolio");
};

const getPublicProjectBySlugs = async ({
  profileSlug,
  projectSlug,
}: {
  profileSlug: string;
  projectSlug: string;
}): Promise<ProjectDto> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.get<ApiResponse<ProjectDto>>(
    `/api/portfolios/${profileSlug}/projects/${projectSlug}`
  );
  if (response.success) return response.data;
  throw new Error(response.message || "Error al obtener proyecto");
};

export const sendContactMessage = async ({
  slug,
  data,
}: {
  slug: string;
  data: ContactRequest;
}): Promise<void> => {
  // CORRECCIÓN: /api added
  const { data: response } = await apiClient.post<ApiResponse<void>>(
    `/api/portfolios/${slug}/contact`,
    data
  );
  if (!response.success) {
    throw new Error(response.message || "Error al enviar el mensaje");
  }
};

// --- HOOKS (Sin cambios) ---

export const usePublicPortfolios = () => {
  return useQuery({
    queryKey: PUBLIC_PORTFOLIOS_KEY,
    queryFn: getPublicPortfolios,
    staleTime: 1000 * 60 * 5,
  });
};

export const usePortfolioDetail = (slug: string) => {
  return useQuery({
    queryKey: [PUBLIC_PORTFOLIO_DETAIL_KEY, slug],
    queryFn: () => getPortfolioBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};

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

export const useSendContactMessage = () => {
  return useMutation({
    mutationFn: sendContactMessage,
  });
};
