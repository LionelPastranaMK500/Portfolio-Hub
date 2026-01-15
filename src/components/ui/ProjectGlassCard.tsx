import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProjectGlassCardProps } from "../../types/ui/ProjectGlassCardProps";
import { SafeImage } from "./SafeImage";

export const ProjectGlassCard = ({
  title,
  summary,
  slug,
  coverImage,
  profileSlug,
}: ProjectGlassCardProps) => {
  return (
    <Link to={`/portfolios/${profileSlug}/projects/${slug}`} className="block">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 h-64 shadow-2xl transition-all"
      >
        {/* IMAGEN DE FONDO CON GESTIÓN SEGURA */}
        <div className="absolute inset-0 w-full h-full">
          <SafeImage
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-700"
          />
        </div>

        {/* GRADIENTE DE SUPERPOSICIÓN (VISTOSIDAD) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-black/40 to-transparent z-10" />

        {/* CONTENIDO TEXTUAL */}
        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
          <motion.h4 className="text-xl font-black text-white mb-2 drop-shadow-md tracking-tighter group-hover:text-cyan-400 transition-colors">
            {title}
          </motion.h4>

          <p className="text-gray-300 text-sm line-clamp-2 mb-4 drop-shadow-sm font-medium leading-relaxed">
            {summary}
          </p>

          <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
            Explorar Proyecto{" "}
            <ExternalLink size={14} className="stroke-[3px]" />
          </div>
        </div>

        {/* EFECTO DE BRILLO AL HACER HOVER */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-tr from-cyan-500 to-purple-500 pointer-events-none" />
      </motion.div>
    </Link>
  );
};
