import { useRef } from "react";
import { Camera, Loader2, UploadCloud } from "lucide-react";

interface CoverUploaderProps {
  currentUrl: string | null | undefined;
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export const CoverUploader = ({
  currentUrl,
  onFileSelect,
  isLoading,
}: CoverUploaderProps) => {
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

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-gray-400 ml-1">
        Imagen de Portada
      </label>

      <div
        onClick={handleClick}
        className="relative w-full h-48 rounded-xl border-2 border-dashed border-white/10 bg-black/20 hover:bg-black/30 hover:border-cyan-500/50 cursor-pointer overflow-hidden transition-all group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/jpg, image/webp"
        />

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <Loader2 className="animate-spin text-cyan-400" size={32} />
          </div>
        ) : null}

        {currentUrl ? (
          <>
            <img
              src={currentUrl}
              alt="Cover"
              className={`w-full h-full object-cover transition-opacity ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
            />
            {/* Overlay al hacer hover */}
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white mb-2" size={24} />
              <span className="text-xs text-white font-bold uppercase tracking-wider">
                Cambiar Portada
              </span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 group-hover:text-cyan-400 transition-colors">
            <div className="p-4 rounded-full bg-white/5 mb-2">
              <UploadCloud size={24} />
            </div>
            <span className="text-sm font-medium">Click para subir imagen</span>
            <span className="text-xs opacity-50 mt-1">
              Recomendado 1280x720 (JPG, PNG)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
