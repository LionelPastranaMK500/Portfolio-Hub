import { useState } from "react";
import { getDriveDirectLink } from "../../utils/driveHelper";
import { ImageOff, Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

interface SafeImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

export const SafeImage = ({ src, alt, className }: SafeImageProps) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const directUrl = getDriveDirectLink(src);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-900/50 flex items-center justify-center",
        className
      )}
    >
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
          <Loader2 className="animate-spin text-cyan-500/50" size={24} />
        </div>
      )}

      {directUrl && !error ? (
        <img
          src={directUrl}
          alt={alt}
          referrerPolicy="no-referrer"
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            loading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      ) : (
        <div className="flex flex-col items-center gap-2 text-gray-700">
          <ImageOff size={32} />
          <span className="text-[10px] font-black uppercase tracking-tighter">
            No Image Found
          </span>
        </div>
      )}
    </div>
  );
};
