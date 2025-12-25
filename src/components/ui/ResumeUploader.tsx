import { useRef } from "react";
import { FileText, UploadCloud, Loader2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface ResumeUploaderProps {
  currentUrl: string | null | undefined;
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export const ResumeUploader = ({
  currentUrl,
  onFileSelect,
  isLoading,
}: ResumeUploaderProps) => {
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
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">
        Curriculum Vitae (CV)
      </label>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="application/pdf" // Restringimos a PDF para CV
      />

      <div className="flex items-center gap-4">
        {/* Botón de Subida */}
        <motion.button
          type="button"
          onClick={handleClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-dashed transition-all group
            ${
              isLoading
                ? "border-cyan-500/30 bg-cyan-500/5 cursor-wait"
                : "border-white/10 bg-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/10 cursor-pointer"
            }`}
        >
          {isLoading ? (
            <Loader2 className="animate-spin text-cyan-400" size={24} />
          ) : (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-cyan-500/20 text-gray-400 group-hover:text-cyan-400 transition-colors">
                {currentUrl ? (
                  <RefreshCw size={20} />
                ) : (
                  <UploadCloud size={20} />
                )}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {currentUrl ? "Actualizar CV" : "Subir CV"}
                </p>
                <p className="text-xs text-gray-500">PDF (Máx 5MB)</p>
              </div>
            </div>
          )}
        </motion.button>

        {/* Botón para Ver Actual (Si existe) */}
        {currentUrl && (
          <motion.a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-xl bg-gray-800 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-all flex flex-col items-center justify-center gap-1 min-w-[80px]"
            title="Ver CV actual"
          >
            <FileText size={20} />
            <span className="text-[10px] font-bold uppercase">Ver</span>
          </motion.a>
        )}
      </div>
    </div>
  );
};
