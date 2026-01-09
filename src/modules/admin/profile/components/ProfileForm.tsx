import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  MapPin,
  Mail,
  Briefcase,
  Loader2,
  Save,
  Globe,
  Copy,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  profileSchema,
  type ProfileSchemaType,
} from "../../../../types/schemas/ProfileSchema";
import type { ProfileFormProps } from "../../../../types/ui/ProfileUI";
import type { ProfileUpdateRequest } from "../../../../types/models/profile";
import { AvatarUploader } from "../../../../components/ui/AvatarUploader";
import { ResumeUploader } from "../../../../components/ui/ResumeUploader";

interface ExtendedProfileFormProps extends ProfileFormProps {
  onUploadAvatar: (file: File) => void;
  isUploadingAvatar: boolean;
  onUploadResume: (file: File) => void;
  isUploadingResume: boolean;
}

export const ProfileForm = ({
  initialData,
  isSaving,
  onSubmit,
  onUploadAvatar,
  isUploadingAvatar,
  onUploadResume,
  isUploadingResume,
}: ExtendedProfileFormProps) => {
  // Estado para feedback visual del botón copiar
  const [isCopied, setIsCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      headline: "",
      contactEmail: "",
      location: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        fullName: initialData.fullName,
        headline: initialData.headline,
        contactEmail: initialData.contactEmail,
        location: initialData.location || "",
        bio: initialData.bio,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: ProfileSchemaType) => {
    const payload: ProfileUpdateRequest = {
      fullName: data.fullName,
      headline: data.headline,
      contactEmail: data.contactEmail,
      location: data.location || null,
      bio: data.bio,
    };
    onSubmit(payload);
  };

  // Función para copiar la URL pública al portapapeles
  const handleCopyLink = () => {
    if (!initialData?.slug) return;

    // Construye la URL completa dinámicamente usando el origen actual (localhost o dominio)
    const fullUrl = `${window.location.origin}/portfolios/${initialData.slug}`;

    navigator.clipboard.writeText(fullUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Resetear icono a los 2s
    });
  };

  const inputBaseClass =
    "w-full p-3 pl-10 rounded-xl bg-black/40 border text-white focus:ring-1 outline-none transition-all placeholder-gray-600";
  const errorInputClass =
    "border-red-500/50 focus:border-red-500 focus:ring-red-500/20";
  const normalInputClass =
    "border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20";
  const labelClass = "block text-sm font-medium text-gray-400 mb-1 ml-1";

  const getInputClass = (hasError: boolean) =>
    `${inputBaseClass} ${hasError ? errorInputClass : normalInputClass}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* --- SECCIÓN SUPERIOR: IDENTIDAD & AVATAR --- */}
      <div className="relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <AvatarUploader
            currentUrl={initialData?.avatarUrl}
            onFileSelect={onUploadAvatar}
            isLoading={isUploadingAvatar}
          />

          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold text-white font-maven">
              {initialData?.fullName || "Tu Nombre"}
            </h2>

            {/* LINK PÚBLICO CON BOTÓN DE COPIAR */}
            <div className="flex items-center gap-0 mx-auto md:mx-0 w-fit group">
              <div className="flex items-center gap-2 text-cyan-400 bg-cyan-950/30 px-3 py-1.5 rounded-l-full border border-cyan-500/20 border-r-0 h-8">
                <Globe size={14} />
                <span className="text-xs font-mono tracking-wide truncate max-w-[150px] md:max-w-[200px]">
                  studiostkoh.com/portfolios/{initialData?.slug || "usuario"}
                </span>
              </div>

              <button
                onClick={handleCopyLink}
                type="button"
                className="flex items-center justify-center bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 border-l-0 rounded-r-full pl-2 pr-3 h-8 transition-colors cursor-pointer"
                title="Copiar enlace público"
              >
                {isCopied ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy
                    size={14}
                    className="text-cyan-400 group-hover:text-cyan-200"
                  />
                )}
              </button>
            </div>

            <p className="text-gray-500 text-sm max-w-md">
              Esta es tu tarjeta de presentación.
            </p>
          </div>
        </div>
      </div>

      {/* --- FORMULARIO --- */}
      <div className="p-8 rounded-3xl border border-white/10 bg-gray-900/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NOMBRE COMPLETO */}
            <div>
              <label className={labelClass}>Nombre Completo</label>
              <div className="relative">
                <User
                  className="absolute left-3 top-3.5 text-gray-500"
                  size={18}
                />
                <input
                  {...register("fullName")}
                  className={getInputClass(!!errors.fullName)}
                  placeholder="Ej: Elon Musk"
                />
              </div>
              {errors.fullName && (
                <span className="text-red-400 text-xs mt-1 ml-1">
                  • {errors.fullName.message}
                </span>
              )}
            </div>

            {/* TITULAR */}
            <div>
              <label className={labelClass}>Titular Profesional</label>
              <div className="relative">
                <Briefcase
                  className="absolute left-3 top-3.5 text-gray-500"
                  size={18}
                />
                <input
                  {...register("headline")}
                  className={getInputClass(!!errors.headline)}
                  placeholder="Ej: Senior Full Stack Developer"
                />
              </div>
              {errors.headline && (
                <span className="text-red-400 text-xs mt-1 ml-1">
                  • {errors.headline.message}
                </span>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className={labelClass}>Email de Contacto</label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3.5 text-gray-500"
                  size={18}
                />
                <input
                  {...register("contactEmail")}
                  className={getInputClass(!!errors.contactEmail)}
                  placeholder="contacto@ejemplo.com"
                />
              </div>
              {errors.contactEmail && (
                <span className="text-red-400 text-xs mt-1 ml-1">
                  • {errors.contactEmail.message}
                </span>
              )}
            </div>

            {/* UBICACIÓN */}
            <div>
              <label className={labelClass}>Ubicación</label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3.5 text-gray-500"
                  size={18}
                />
                <input
                  {...register("location")}
                  className={getInputClass(!!errors.location)}
                  placeholder="Ej: Lima, Perú"
                />
              </div>
              {errors.location && (
                <span className="text-red-400 text-xs mt-1 ml-1">
                  • {errors.location.message}
                </span>
              )}
            </div>
          </div>

          {/* BIO */}
          <div>
            <label className={labelClass}>Sobre Mí (Biografía)</label>
            <div className="relative">
              <textarea
                {...register("bio")}
                rows={6}
                className={`${getInputClass(!!errors.bio)} pl-3 resize-none`}
                placeholder="Cuéntanos tu historia..."
              />
            </div>
            {errors.bio && (
              <span className="text-red-400 text-xs mt-1 ml-1">
                • {errors.bio.message}
              </span>
            )}
            <div className="text-right text-xs text-gray-600 mt-1">
              Máximo 2000 caracteres
            </div>
          </div>

          {/* SECCIÓN CV */}
          <div className="pt-2 border-t border-white/5">
            <ResumeUploader
              currentUrl={initialData?.resumeUrl}
              isLoading={isUploadingResume}
              onFileSelect={onUploadResume}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-end pt-6 border-t border-white/5">
            {isDirty && (
              <span className="text-sm text-yellow-500/80 mr-4 animate-pulse">
                Tienes cambios sin guardar
              </span>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Save size={20} />
              )}
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
