import { useEffect } from "react";
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
} from "lucide-react";
import { motion } from "framer-motion";
import {
  profileSchema,
  type ProfileSchemaType,
} from "../../../../types/schemas/ProfileSchema";
import type { ProfileFormProps } from "../../../../types/ui/ProfileUI";
import type { ProfileUpdateRequest } from "../../../../types/models/profile";
import { AvatarUploader } from "../../../../components/ui/AvatarUploader";
import { ResumeUploader } from "../../../../components/ui/ResumeUploader"; // <--- 1. IMPORTAR

// 2. EXTENDER PROPS (Avatar + Resume)
interface ExtendedProfileFormProps extends ProfileFormProps {
  onUploadAvatar: (file: File) => void;
  isUploadingAvatar: boolean;
  onUploadResume: (file: File) => void; // Nuevo
  isUploadingResume: boolean; // Nuevo
}

export const ProfileForm = ({
  initialData,
  isSaving,
  onSubmit,
  onUploadAvatar,
  isUploadingAvatar,
  onUploadResume, // Destructuring
  isUploadingResume, // Destructuring
}: ExtendedProfileFormProps) => {
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
            <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20 w-fit mx-auto md:mx-0">
              <Globe size={14} />
              <span className="text-xs font-mono tracking-wide">
                studiostkoh.com/portfolios/{initialData?.slug || "usuario"}
              </span>
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

          {/* 3. SECCIÓN CV (Integración del componente nuevo) */}
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
