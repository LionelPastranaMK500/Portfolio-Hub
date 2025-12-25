import { FileText } from "lucide-react";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";

export const ProfileBio = ({ bio }: { bio: string }) => {
  return (
    <GlassTiltCard className="p-8 border-white/10 bg-black/20">
      <div className="flex items-center gap-3 mb-4 text-white/50">
        <FileText size={20} />
        <h3 className="uppercase tracking-widest text-sm font-bold">
          Sobre Mí
        </h3>
      </div>
      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
        {bio || "Este usuario prefiere mantener el misterio..."}
      </p>
    </GlassTiltCard>
  );
};
