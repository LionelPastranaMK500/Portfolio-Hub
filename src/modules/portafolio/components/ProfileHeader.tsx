import { useState } from "react";
import {
  MapPin,
  Mail,
  FileText,
  Github,
  Linkedin,
  Globe,
  Twitter,
  User,
  Copy,
  Check,
} from "lucide-react";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";
import { cn } from "../../../utils/cn";
import type { ProfileHeaderProps } from "../../../types/ui/ProfileHeaderProps";
import { getDriveDirectLink } from "../../../utils/driveHelper";

const SocialIcon = ({ platform }: { platform: string }) => {
  const p = platform.toLowerCase();
  const size = 20;
  if (p.includes("github")) return <Github size={size} />;
  if (p.includes("linkedin")) return <Linkedin size={size} />;
  if (p.includes("twitter") || p.includes("x")) return <Twitter size={size} />;
  return <Globe size={size} />;
};

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const isCollab = profile.tkohCollab;
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);

  const directAvatarUrl = getDriveDirectLink(profile.avatarUrl);
  const directResumeUrl = getDriveDirectLink(profile.resumeUrl);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassTiltCard
      className={cn(
        "p-8 flex flex-col items-center text-center lg:sticky lg:top-24 transition-all duration-500",
        isCollab
          ? "border-cyan-500/30 bg-cyan-950/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]"
          : "border-white/10 bg-black/40 hover:border-white/20"
      )}
    >
      {/* AVATAR CON EFECTO DE AURA */}
      <div className="relative mb-8 group">
        <div
          className={cn(
            "absolute inset-0 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500",
            isCollab ? "bg-cyan-400" : "bg-white"
          )}
        />

        <div
          className={cn(
            "relative w-36 h-36 rounded-full p-1 flex items-center justify-center overflow-hidden border-2",
            isCollab
              ? "border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              : "border-white/20"
          )}
        >
          {directAvatarUrl && !imgError ? (
            <img
              src={directAvatarUrl}
              alt={profile.fullName}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full rounded-full object-cover bg-gray-900 transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
              <User
                size={60}
                className={isCollab ? "text-cyan-400" : "text-gray-600"}
              />
            </div>
          )}
        </div>

        {isCollab && (
          <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-black text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-tighter shadow-xl ring-4 ring-[#030712]">
            TKOH DEV
          </div>
        )}
      </div>

      <h1 className="text-3xl font-black text-white mb-2 tracking-tighter">
        {profile.fullName}
      </h1>

      <div className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
        <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest">
          {profile.headline}
        </p>
      </div>

      {profile.location && (
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-8 font-medium">
          <MapPin size={14} className="text-cyan-500" />
          <span>{profile.location}</span>
        </div>
      )}

      {/* BLOQUE DE EMAIL COPIABLE */}
      <div className="w-full space-y-4 mb-8">
        <div
          onClick={handleCopyEmail}
          className="group/email relative flex flex-col gap-1 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/40 cursor-pointer transition-all active:scale-95"
        >
          <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] text-left">
            Email de Contacto
          </span>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300 font-medium truncate pr-2 font-mono">
              {profile.contactEmail}
            </span>
            {copied ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <Copy
                size={14}
                className="text-gray-600 group-hover/email:text-cyan-400 transition-colors"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={`mailto:${profile.contactEmail}`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest transition-all"
          >
            <Mail size={16} /> Directo
          </a>
          {profile.resumeUrl && (
            <a
              href={directResumeUrl || profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-cyan-900/20"
            >
              <FileText size={16} /> Curriculum
            </a>
          )}
        </div>
      </div>

      {/* SOCIAL LINKS */}
      <div className="flex gap-5 justify-center">
        {profile.socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-white transition-all hover:scale-125 hover:-translate-y-1"
          >
            <SocialIcon platform={social.platform} />
          </a>
        ))}
      </div>
    </GlassTiltCard>
  );
};
