import apiClient from "../config/api";
import type { ApiResponse } from "../types/api/ApiResponse";
import type {
  PortfolioPublicDto,
  PortfolioDetailDto,
  ContactRequest,
} from "../types/models/publicapi";
import type { ProjectDto } from "../types/models/project";

/**
 * ESPEJO DE: PublicPortfolioController.java
 * Backend: src/main/java/studios/tkoh/portfolio/controller/PublicPortfolioController.java
 * Ruta Base: /api/portfolios
 */
const BASE_URL = "/portfolios";

export const publicPortfolioService = {
  /**
   * @GetMapping
   * Obtiene la lista de todos los portafolios públicos (Tarjeta/Resumen).
   */
  getAllPortfolios: async (): Promise<PortfolioPublicDto[]> => {
    const response = await apiClient.get<ApiResponse<PortfolioPublicDto[]>>(
      BASE_URL
    );
    return response.data.data;
  },

  /**
   * @GetMapping("/{slug}")
   * Obtiene el detalle completo de un portafolio específico por su slug.
   */
  getPortfolioBySlug: async (slug: string): Promise<PortfolioDetailDto> => {
    const response = await apiClient.get<ApiResponse<PortfolioDetailDto>>(
      `${BASE_URL}/${slug}`
    );
    return response.data.data;
  },

  /**
   * @GetMapping("/{profileSlug}/projects/{projectSlug}")
   * Obtiene el detalle completo de un proyecto específico dentro de un portafolio público.
   */
  getProjectDetails: async (
    profileSlug: string,
    projectSlug: string
  ): Promise<ProjectDto> => {
    const response = await apiClient.get<ApiResponse<ProjectDto>>(
      `${BASE_URL}/${profileSlug}/projects/${projectSlug}`
    );
    return response.data.data;
  },

  /**
   * @PostMapping("/{slug}/contact")
   * Envía un mensaje de contacto al dueño del portafolio.
   */
  handleContactForm: async (
    slug: string,
    contactRequest: ContactRequest
  ): Promise<void> => {
    await apiClient.post<ApiResponse<void>>(
      `${BASE_URL}/${slug}/contact`,
      contactRequest
    );
  },
};
