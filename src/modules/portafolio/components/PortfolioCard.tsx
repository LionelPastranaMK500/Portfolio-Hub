import { useState } from "react";
import { ArrowUpRight, Code2, BadgeCheck, User } from "lucide-react";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";
import { Link } from "react-router-dom";
import { cn } from "../../../utils/cn";
import type { PortfolioCardProps } from "../../../types/ui/PortfolioCardProps";
import { getDriveDirectLink } from "../../../utils/driveHelper";

export const PortfolioCard = ({
  name,
  role,
  image,
  slug,
  isCollaborator,
}: PortfolioCardProps) => {
  const [imgError, setImgError] = useState(false);

  // 2. PROCESAR LA URL
  const directUrl = getDriveDirectLink(image || undefined);

  return (
    <Link to={`/portfolios/${slug}`} className="block h-full">
      <GlassTiltCard
        className={cn(
          "h-full flex flex-col justify-between p-8 group transition-all duration-500",
          isCollaborator
            ? "border-cyan-500/20 bg-cyan-900/10 hover:border-cyan-400/50 hover:bg-cyan-900/20"
            : "border-white/10 bg-black/20 hover:border-white/30 hover:bg-black/40"
        )}
      >
        <div className="flex justify-between items-start">
          <div className="relative">
            <div
              className={cn(
                "w-20 h-20 rounded-full p-[2px] overflow-hidden flex items-center justify-center",
                isCollaborator
                  ? "bg-gradient-to-br from-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  : "bg-gradient-to-br from-white/50 to-transparent"
              )}
            >
              {/* 3. USAR directUrl */}
              {directUrl && !imgError ? (
                <img
                  src={directUrl}
                  alt={name}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
                  <User
                    className={cn(
                      "w-10 h-10 transition-colors duration-500",
                      isCollaborator
                        ? "text-cyan-400/80"
                        : "text-gray-500 group-hover:text-gray-300"
                    )}
                  />
                </div>
              )}
            </div>
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full animate-pulse" />
          </div>

          <div
            className={cn(
              "p-3 rounded-full border transition-all duration-300 group-hover:scale-110",
              isCollaborator
                ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black"
                : "bg-white/5 border-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white"
            )}
          >
            <ArrowUpRight size={20} />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all truncate">
            {name}
          </h3>

          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest">
            {isCollaborator ? (
              <>
                <BadgeCheck size={16} className="text-cyan-400" />
                <span className="text-cyan-100 font-semibold drop-shadow-sm">
                  TKOH Collab
                </span>
              </>
            ) : (
              <>
                <Code2 size={14} className="text-gray-500" />
                <span className="text-gray-400 truncate max-w-[200px]">
                  {role}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-gray-400">Ver perfil completo</span>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent mx-4" />
        </div>
      </GlassTiltCard>
    </Link>
  );
};
