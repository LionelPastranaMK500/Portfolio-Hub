import { Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react"; // Calendar eliminado
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";
import type { ProfileTimelineProps } from "../../../types/ui/ProfileTimelineProps";

export const ProfileTimeline = ({
  experiences,
  education,
  certificates,
}: ProfileTimelineProps) => {
  const hasExp = experiences.length > 0;
  const hasEdu = education.length > 0;
  const hasCerts = certificates.length > 0;

  if (!hasExp && !hasEdu && !hasCerts) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* SECCIÓN EXPERIENCIA */}
      {hasExp && (
        <GlassTiltCard className="p-8 border-white/10 bg-black/40 h-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Briefcase size={20} className="text-cyan-400" />
            </div>
            <h3 className="uppercase tracking-[0.2em] text-xs font-black text-white/70">
              Trayectoria
            </h3>
          </div>

          <div className="space-y-10 border-l-2 border-white/5 ml-3 relative">
            {experiences.map((exp) => (
              <div key={exp.id} className="pl-8 relative group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#030712] border-2 border-cyan-500 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300" />

                <span className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest">
                  {exp.startDate} — {exp.current ? "Presente" : exp.endDate}
                </span>
                <h4 className="text-white font-black text-lg mt-1 tracking-tight">
                  {exp.role}
                </h4>
                <p className="text-cyan-400/80 text-sm font-bold mb-3 uppercase tracking-tighter">
                  {exp.company}
                </p>
                {exp.description && (
                  <p className="text-gray-400 text-sm leading-relaxed border-l border-white/5 pl-4">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </GlassTiltCard>
      )}

      {/* SECCIÓN DERECHA: EDUCACIÓN Y LOGROS */}
      <div className="space-y-8">
        {hasEdu && (
          <GlassTiltCard className="p-8 border-white/10 bg-black/40">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <GraduationCap size={20} className="text-purple-400" />
              </div>
              <h3 className="uppercase tracking-[0.2em] text-xs font-black text-white/70">
                Formación
              </h3>
            </div>
            <div className="space-y-8">
              {education.map((edu) => (
                <div key={edu.id} className="group">
                  <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-gray-400 text-sm italic">
                    {edu.institution}
                  </p>
                  <span className="text-[10px] text-gray-600 font-mono mt-2 block">
                    {edu.startDate} - {edu.endDate || "Actualidad"}
                  </span>
                </div>
              ))}
            </div>
          </GlassTiltCard>
        )}

        {hasCerts && (
          <GlassTiltCard className="p-8 border-white/10 bg-black/40">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <Award size={20} className="text-yellow-400" />
              </div>
              <h3 className="uppercase tracking-[0.2em] text-xs font-black text-white/70">
                Logros
              </h3>
            </div>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-transparent hover:border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Award
                      size={16}
                      className="text-yellow-500/50 group-hover:text-yellow-400"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {cert.name}
                    </span>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </GlassTiltCard>
        )}
      </div>
    </div>
  );
};
