import { useState } from "react"; // <--- 1. Importar useState
import {
  MapPin,
  Mail,
  FileText,
  Github,
  Linkedin,
  Globe,
  Twitter,
  User,
} from "lucide-react";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";
import { cn } from "../../../utils/cn";
import type { ProfileHeaderProps } from "../../../types/ui/ProfileHeaderProps";
// 2. Importar la utilidad (Asegúrate de que la ruta sea correcta según tu estructura)
import { getDriveDirectLink } from "../../../utils/driveHelper";

const SocialIcon = ({ platform }: { platform: string }) => {
  const p = platform.toLowerCase();
  if (p.includes("github")) return <Github size={18} />;
  if (p.includes("linkedin")) return <Linkedin size={18} />;
  if (p.includes("twitter") || p.includes("x")) return <Twitter size={18} />;
  return <Globe size={18} />;
};

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const isCollab = profile.isTkohCollaborator;

  // 3. Estado para fallback de error
  const [imgError, setImgError] = useState(false);

  // 4. Transformar la URL aquí mismo
  const directAvatarUrl = getDriveDirectLink(profile.avatarUrl);
  const directResumeUrl = getDriveDirectLink(profile.resumeUrl);

  return (
    <GlassTiltCard
      className={cn(
        "p-6 flex flex-col items-center text-center sticky top-24",
        isCollab
          ? "border-cyan-500/20 bg-cyan-950/10"
          : "border-white/10 bg-black/30"
      )}
    >
      {/* AVATAR SEGURO */}
      <div className="relative mb-6">
        <div
          className={cn(
            "w-32 h-32 rounded-full p-1 flex items-center justify-center overflow-hidden",
            isCollab
              ? "bg-gradient-to-br from-cyan-400 to-transparent shadow-[0_0_30px_rgba(34,211,238,0.4)]"
              : "bg-gradient-to-br from-white/40 to-transparent"
          )}
        >
          {/* 5. Usar URL directa + Referrer Policy */}
          {directAvatarUrl && !imgError ? (
            <img
              src={directAvatarUrl}
              alt={profile.fullName}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full rounded-full object-cover bg-black"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
              <User
                size={48}
                className={isCollab ? "text-cyan-400" : "text-gray-500"}
              />
            </div>
          )}
        </div>
        {isCollab && (
          <div className="absolute -bottom-2 -right-2 bg-black border border-cyan-500 text-cyan-400 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest shadow-lg">
            TKOH DEV
          </div>
        )}
      </div>

      <h1 className="text-2xl font-bold text-white mb-2">{profile.fullName}</h1>
      <p className="text-cyan-200/80 font-mono text-sm mb-4">
        {profile.headline}
      </p>

      {profile.location && (
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
          <MapPin size={14} />
          <span>{profile.location}</span>
        </div>
      )}

      {/* ACCIONES */}
      <div className="grid grid-cols-2 gap-3 w-full mb-6">
        <a
          href={`mailto:${profile.contactEmail}`}
          className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition-all"
        >
          <Mail size={16} /> Email
        </a>
        {profile.resumeUrl && (
          <a
            href={directResumeUrl || profile.resumeUrl} // Usamos el link directo también para el CV
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm transition-all"
          >
            <FileText size={16} /> CV
          </a>
        )}
      </div>

      <div className="flex gap-4 justify-center">
        {profile.socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-white transition-colors hover:scale-110 transform duration-200"
          >
            <SocialIcon platform={social.platform} />
          </a>
        ))}
      </div>
    </GlassTiltCard>
  );
};
