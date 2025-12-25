import { motion } from "framer-motion";
import { Search, WifiOff } from "lucide-react";
import { PortfolioCard } from "./components/PortfolioCard";
import { Loader } from "../../components/shared/Loader";
import { usePublicPortfolios } from "../../hooks/usePublicPortfolio";
import type { PortfolioPublicDto } from "../../types/models/publicapi";

export const HomePage = () => {
  const { data: portfolios, isLoading, isError } = usePublicPortfolios();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4">
        <WifiOff size={48} className="text-red-500" />
        <h2 className="text-2xl font-bold font-maven">Error de conexión</h2>
        <p className="text-gray-400">
          No pudimos cargar el talento. Verifica tu conexión.
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full px-6 py-20 md:px-12 md:py-24">
      {/* Header Sección */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 max-w-2xl"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter font-maven">
          Talento <span className="text-gray-500">Curado</span>
        </h2>
        <p className="text-gray-400 text-lg">
          Explora los perfiles destacados de Studios TKOH!
        </p>

        {/* Buscador Visual */}
        <div className="mt-8 relative max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre o rol..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:bg-black/50 transition-all font-maven"
          />
        </div>
      </motion.div>

      {/* GRID CONECTADO AL DTO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-20">
        {portfolios && portfolios.length > 0 ? (
          portfolios.map((profile: PortfolioPublicDto, index: number) => (
            <motion.div
              key={profile.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PortfolioCard
                name={profile.fullName}
                role={profile.headline}
                image={profile.avatarUrl}
                slug={profile.slug}
                isCollaborator={profile.isTkohCollaborator}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
            <p className="text-gray-400 text-xl font-maven">
              Aún no hay perfiles públicos visibles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
