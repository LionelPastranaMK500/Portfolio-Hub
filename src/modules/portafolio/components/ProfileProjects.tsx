import { Briefcase } from "lucide-react";
import { ProjectGlassCard } from "../../../components/ui/ProjectGlassCard";
import type { ProfileProjectsProps } from "../../../types/ui/ProfileProjectsProps";

export const ProfileProjects = ({
  projects,
  profileSlug,
}: ProfileProjectsProps) => {
  if (projects.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 px-2 text-white/50">
        <Briefcase size={20} />
        <h3 className="uppercase tracking-widest text-sm font-bold">
          Proyectos Destacados
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectGlassCard
            key={project.slug}
            title={project.title}
            summary={project.summary}
            slug={project.slug}
            coverImage={project.coverImage}
            profileSlug={profileSlug}
          />
        ))}
      </div>
    </div>
  );
};
