import { useRef } from "react";
import { Camera, Loader2, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

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
      {/* AQUÍ ESTABA EL ERROR: Faltaba el onChange */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/jpg, image/webp"
      />

      {/* Contenedor de la Imagen */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`${dims} rounded-full border-4 border-white/10 bg-gray-800 flex items-center justify-center overflow-hidden shadow-2xl relative`}
      >
        {isLoading ? (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
            <Loader2 className="animate-spin text-cyan-400" size={iconSize} />
          </div>
        ) : null}

        {currentUrl ? (
          <img
            src={currentUrl}
            alt="Avatar"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? "opacity-50" : "opacity-100 group-hover:opacity-70"
            }`}
          />
        ) : (
          <div className="flex flex-col items-center text-gray-500 group-hover:text-cyan-400 transition-colors">
            <UploadCloud size={iconSize} />
          </div>
        )}

        {/* Overlay "Cambiar" al hacer Hover */}
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
