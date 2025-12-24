import { useQuery, useMutation } from "@tanstack/react-query";
import { publicPortfolioService } from "../services/publicPortfolio.service";
import type { ContactRequest } from "../types/models/publicapi";

/**
 * 1. Hook para listar todos los portafolios (Para el Home / Landing Page)
 */
export const usePublicPortfolios = () => {
  return useQuery({
    queryKey: ["public", "portfolios"],
    queryFn: publicPortfolioService.getAllPortfolios,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * 2. Hook para ver un portafolio completo por Slug (Para la vista de Perfil Público)
 */
export const usePublicPortfolioBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["public", "portfolio", slug],
    queryFn: () => publicPortfolioService.getPortfolioBySlug(slug!),
    enabled: !!slug,
    retry: 1,
  });
};

/**
 * 3. Hook para ver el detalle de un proyecto específico (Para la vista de Proyecto)
 */
export const usePublicProjectDetail = (
  profileSlug: string | undefined,
  projectSlug: string | undefined
) => {
  return useQuery({
    queryKey: ["public", "project", profileSlug, projectSlug],
    queryFn: () =>
      publicPortfolioService.getProjectDetails(profileSlug!, projectSlug!),
    enabled: !!profileSlug && !!projectSlug,
  });
};

/**
 * 4. Hook para el formulario de contacto
 */
export const useContactForm = () => {
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: ContactRequest }) =>
      publicPortfolioService.handleContactForm(slug, data),

    onSuccess: () => {
      console.log("Mensaje enviado correctamente");
    },
    onError: (error) => {
      console.error("Error al enviar mensaje:", error);
    },
  });
};
