import { FolderKanban } from "lucide-react"; // Briefcase eliminado
import { ProjectGlassCard } from "../../../components/ui/ProjectGlassCard";
import type { ProfileProjectsProps } from "../../../types/ui/ProfileProjectsProps";
import { motion } from "framer-motion";

export const ProfileProjects = ({
  projects,
  profileSlug,
}: ProfileProjectsProps) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 px-2">
        <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
          <FolderKanban size={20} className="text-cyan-400" />
        </div>
        <h3 className="uppercase tracking-[0.3em] text-xs font-black text-white/70">
          Proyectos Seleccionados
        </h3>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {" "}
        {/* Gap aumentado a 8 para más aire */}
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectGlassCard
              title={project.title}
              summary={project.summary}
              slug={project.slug}
              coverImage={project.coverImage}
              profileSlug={profileSlug}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
