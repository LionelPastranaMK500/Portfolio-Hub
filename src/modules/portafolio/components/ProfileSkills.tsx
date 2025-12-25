import { Layers, Cpu } from "lucide-react";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";
import type { ProfileSkillsProps } from "../../../types/ui/ProfileSkillsProps";

const SkillPill = ({ name }: { name: string }) => (
  <span className="px-3 py-1 text-xs font-mono text-cyan-100 bg-cyan-900/20 border border-cyan-500/30 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all cursor-default hover:-translate-y-1">
    {name}
  </span>
);

export const ProfileSkills = ({ categories }: ProfileSkillsProps) => {
  // Si no hay skills, no renderizamos nada para mantener limpieza
  if (!categories || categories.length === 0) return null;

  return (
    <GlassTiltCard className="p-8 border-white/10 bg-black/20">
      <div className="flex items-center gap-3 mb-6 text-white/50">
        <Layers size={20} />
        <h3 className="uppercase tracking-widest text-sm font-bold">
          Arsenal Tecnológico
        </h3>
      </div>

      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat.id} className="relative">
            {/* Línea decorativa izquierda */}
            <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/10 to-transparent rounded-full" />

            <h4 className="flex items-center gap-2 text-white/90 text-sm font-bold mb-4 uppercase tracking-wide">
              <Cpu size={14} className="text-cyan-500" />
              {cat.name}
            </h4>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <SkillPill key={skill.id} name={skill.name} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassTiltCard>
  );
};
