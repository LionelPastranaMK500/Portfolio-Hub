import { useRef } from "react";
import { Camera, Loader2, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
// 1. IMPORTAR LA UTILIDAD
import { getDriveDirectLink } from "../../utils/driveHelper";

interface AvatarUploaderProps {
  currentUrl: string | null | undefined;
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  size?: "sm" | "lg";
}

export const AvatarUploader = ({
  currentUrl,
  onFileSelect,
  isLoading,
  size = "lg",
}: AvatarUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. PROCESAR LA URL AQUÍ
  const directUrl = getDriveDirectLink(currentUrl);

  const handleClick = () => {
    if (!isLoading) fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      e.target.value = "";
    }
  };

  const dims = size === "lg" ? "w-32 h-32" : "w-20 h-20";
  const iconSize = size === "lg" ? 48 : 24;

  return (
    <div className="relative group cursor-pointer" onClick={handleClick}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/jpg, image/webp"
      />

      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`${dims} rounded-full border-4 border-white/10 bg-gray-800 flex items-center justify-center overflow-hidden shadow-2xl relative`}
      >
        {isLoading ? (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
            <Loader2 className="animate-spin text-cyan-400" size={iconSize} />
          </div>
        ) : null}

        {/* 3. USAR directUrl EN LUGAR DE currentUrl */}
        {directUrl ? (
          <img
            src={directUrl}
            alt="Avatar"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? "opacity-50" : "opacity-100 group-hover:opacity-70"
            }`}
            onError={(e) => {
              console.error("Error cargando avatar:", directUrl);
              // Solo ocultamos si falla, para ver el icono de subida por detrás
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex flex-col items-center text-gray-500 group-hover:text-cyan-400 transition-colors">
            <UploadCloud size={iconSize} />
          </div>
        )}

        {!isLoading && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Camera className="text-white mb-1" size={20} />
            <span className="text-[10px] text-white font-bold uppercase tracking-wider">
              Cambiar
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
