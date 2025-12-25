import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProjectGlassCardProps } from "../../types/ui/ProjectGlassCardProps";

export const ProjectGlassCard = ({
  title,
  summary,
  slug,
  coverImage,
  profileSlug,
}: ProjectGlassCardProps) => {
  return (
    <Link to={`/portfolios/${profileSlug}/projects/${slug}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 h-64 shadow-lg transition-all"
      >
        {/* IMAGEN DE FONDO O GRADIENTE LOCAL */}
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-80" />
        )}

        {/* TEXTURAS Y BRILLOS */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6 flex flex-col justify-end">
          <h4 className="text-xl font-bold text-white mb-2 drop-shadow-md">
            {title}
          </h4>
          <p className="text-gray-300 text-sm line-clamp-2 mb-4 drop-shadow-sm">
            {summary}
          </p>

          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Ver Detalles <ExternalLink size={12} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
