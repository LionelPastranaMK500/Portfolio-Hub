import { Briefcase, GraduationCap, Award, Calendar } from "lucide-react";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";
import { cn } from "../../../utils/cn";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* COLUMNA IZQUIERDA: EXPERIENCIA */}
      {hasExp && (
        <div className={cn(!hasEdu && !hasCerts ? "md:col-span-2" : "")}>
          <GlassTiltCard className="p-6 border-white/10 bg-black/20 h-full">
            <div className="flex items-center gap-3 mb-6 text-white/50">
              <Briefcase size={20} />
              <h3 className="uppercase tracking-widest text-sm font-bold">
                Experiencia
              </h3>
            </div>

            <div className="space-y-8 border-l border-white/10 pl-6 ml-2 relative">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Punto de tiempo */}
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-cyan-500 group-hover:bg-cyan-500 transition-colors" />

                  {/* CORRECCIÓN: Usamos 'role' (del DTO) en vez de 'position' */}
                  <h4 className="text-white font-bold text-lg leading-tight">
                    {exp.role}
                  </h4>
                  <p className="text-cyan-200/80 font-medium mb-1">
                    {exp.company}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider font-mono mb-2">
                    <Calendar size={10} />
                    <span>
                      {exp.startDate} —{" "}
                      {exp.current ? (
                        <span className="text-green-400">Presente</span>
                      ) : (
                        exp.endDate
                      )}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-white/5 pl-3 mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </GlassTiltCard>
        </div>
      )}

      {/* COLUMNA DERECHA: EDUCACIÓN Y CERTIFICADOS */}
      {(hasEdu || hasCerts) && (
        <div className="space-y-6">
          {/* EDUCACIÓN */}
          {hasEdu && (
            <GlassTiltCard className="p-6 border-white/10 bg-black/20">
              <div className="flex items-center gap-3 mb-6 text-white/50">
                <GraduationCap size={20} />
                <h3 className="uppercase tracking-widest text-sm font-bold">
                  Educación
                </h3>
              </div>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="relative pl-4 border-l-2 border-white/5 hover:border-white/20 transition-colors"
                  >
                    <h4 className="text-white font-semibold">{edu.degree}</h4>
                    <p className="text-gray-400 text-sm italic">
                      {edu.institution}
                    </p>
                    <span className="text-xs text-gray-600 font-mono block mt-1">
                      {edu.startDate} - {edu.endDate || "Actualidad"}
                    </span>
                  </div>
                ))}
              </div>
            </GlassTiltCard>
          )}

          {/* CERTIFICADOS */}
          {hasCerts && (
            <GlassTiltCard className="p-6 border-white/10 bg-black/20">
              <div className="flex items-center gap-3 mb-6 text-white/50">
                <Award size={20} />
                <h3 className="uppercase tracking-widest text-sm font-bold">
                  Certificaciones
                </h3>
              </div>
              <ul className="space-y-4">
                {certificates.map((cert) => (
                  <li key={cert.id} className="flex gap-3 group items-start">
                    <div className="mt-1">
                      <Award
                        size={16}
                        className="text-yellow-500/70 group-hover:text-yellow-400 transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                        {cert.name}
                      </p>

                      {cert.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {cert.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </GlassTiltCard>
          )}
        </div>
      )}
    </div>
  );
};
