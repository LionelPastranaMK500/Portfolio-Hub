import { useQuery } from "@tanstack/react-query";
import { publicPortfolioService } from "../services/publicPortfolio.service";

/**
 * Hook escalable para verificar status de colaborador.
 * ESTRATEGIA DE RESPALDO: Consultamos la lista pública general para verificar el flag
 * ya que el endpoint de detalle está fallando en el mapeo del booleano.
 */
export const useCollaboratorStatus = (slug: string | undefined) => {
  const { data: isCollaborator, isLoading } = useQuery({
    queryKey: ["collaboratorStatus", slug],
    queryFn: async () => {
      if (!slug) return false;

      try {
        // 1. Pedimos la lista de todos los portafolios públicos
        const allPortfolios = await publicPortfolioService.getAllPortfolios();

        // 2. Buscamos el usuario actual en esa lista
        const myPublicProfile = allPortfolios.find((p) => p.slug === slug);

        // 3. Devolvemos su status real (o false si no existe)
        console.log(
          `🔍 Status público para ${slug}:`,
          myPublicProfile?.isTkohCollaborator
        );
        return !!myPublicProfile?.isTkohCollaborator;
      } catch (error) {
        console.error("Error verificando status de colaborador:", error);
        return false;
      }
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // Cacheamos 5 minutos para no saturar
    refetchOnMount: true,
  });

  return {
    isCollaborator: !!isCollaborator,
    isLoading,
  };
};
