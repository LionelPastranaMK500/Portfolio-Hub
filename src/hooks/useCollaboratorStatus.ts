import { useQuery } from "@tanstack/react-query";
import { publicPortfolioService } from "../services/publicPortfolio.service";

export const useCollaboratorStatus = (slug: string | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ["collaboratorStatus", slug],
    queryFn: async () => {
      if (!slug) return null;
      const result = await publicPortfolioService.getPortfolioBySlug(slug);
      return result;
    },
    enabled: !!slug,
    staleTime: 0,
    refetchOnMount: true,
  });

  // Convertimos a 'any' para evitar errores de TS momentáneos si algo no refrescó,
  // pero buscamos la propiedad correcta 'tkohCollab'
  const raw = data as any;
  const isCollaborator = Boolean(raw?.tkohCollab);

  return {
    isCollaborator,
    isLoading,
  };
};
