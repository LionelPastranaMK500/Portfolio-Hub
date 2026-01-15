import { Layers, Cpu } from "lucide-react";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";
import type { ProfileSkillsProps } from "../../../types/ui/ProfileSkillsProps";
import { motion } from "framer-motion";

const SkillPill = ({ name, index }: { name: string; index: number }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    className="px-4 py-2 text-xs font-bold text-cyan-100 bg-cyan-950/30 border border-cyan-500/20 rounded-xl shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-default hover:-translate-y-1"
  >
    {name}
  </motion.span>
);

export const ProfileSkills = ({ categories }: ProfileSkillsProps) => {
  if (!categories || categories.length === 0) return null;

  return (
    <GlassTiltCard className="p-8 border-white/10 bg-black/40 hover:border-white/20 transition-all duration-500">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
          <Layers size={20} className="text-cyan-400" />
        </div>
        <h3 className="uppercase tracking-[0.3em] text-xs font-black text-white/70">
          Arsenal Tecnológico
        </h3>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-5">
            <h4 className="flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest">
              <Cpu size={16} className="text-cyan-500" />
              {cat.name}
            </h4>

            <div className="flex flex-wrap gap-3">
              {cat.skills.map((skill, idx) => (
                <SkillPill key={skill.id} name={skill.name} index={idx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassTiltCard>
  );
};
