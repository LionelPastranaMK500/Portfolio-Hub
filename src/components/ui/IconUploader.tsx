import { useRef } from "react";
import { Camera, Loader2, Image as ImageIcon } from "lucide-react";
import { getDriveDirectLink } from "../../utils/driveHelper";

interface IconUploaderProps {
  currentUrl: string | null | undefined;
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export const IconUploader = ({
  currentUrl,
  onFileSelect,
  isLoading,
}: IconUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Procesamos la URL para que sea compatible con Google Drive
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

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
        Icono
      </span>
      <div
        onClick={handleClick}
        className="relative w-20 h-20 rounded-xl border-2 border-dashed border-white/10 bg-black/20 hover:bg-black/30 hover:border-cyan-500/50 cursor-pointer overflow-hidden transition-all group flex items-center justify-center"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/svg+xml, image/jpeg, image/webp"
        />

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <Loader2 className="animate-spin text-cyan-400" size={20} />
          </div>
        ) : null}

        {directUrl ? (
          <>
            <img
              src={directUrl}
              alt="Icon"
              referrerPolicy="no-referrer"
              className={`w-12 h-12 object-contain transition-opacity ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={16} />
            </div>
          </>
        ) : (
          <ImageIcon
            className="text-gray-600 group-hover:text-cyan-400 transition-colors"
            size={24}
          />
        )}
      </div>
    </div>
  );
};
