// src/pages/dashboard/ProfilePage.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useMyProfile,
  useUpdateProfile,
  type ProfileUpdateRequest,
} from "../../services/profileService";
import { toast } from "react-toastify";
import { FaSave, FaSpinner, FaUserCircle } from "react-icons/fa";

export default function ProfilePage() {
  // 1. Obtener datos actuales
  const { data: profile, isLoading: isLoadingData } = useMyProfile();

  // 2. Preparar mutación para guardar
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();

  // 3. Configurar formulario
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileUpdateRequest>();

  // Cargar datos en el formulario cuando lleguen de la API
  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName,
        headline: profile.headline,
        bio: profile.bio,
        contactEmail: profile.contactEmail,
        location: profile.location || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileUpdateRequest) => {
    updateProfile(data, {
      onSuccess: () => toast.success("¡Perfil actualizado con éxito!"),
      onError: (err) => toast.error(`Error: ${err.message}`),
    });
  };

  if (isLoadingData) {
    return (
      <div className="p-10 text-center">
        <FaSpinner className="animate-spin mx-auto h-8 w-8 text-cyan-500" />
      </div>
    );
  }

  const inputClass =
    "w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-maven mb-2 text-gray-800 dark:text-white">
        Mi Perfil
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Gestiona tu información personal y profesional.
      </p>

      <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        {/* --- Sección de Avatar (Visual por ahora) --- */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <FaUserCircle className="h-16 w-16 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Foto de Perfil
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              Sube una imagen cuadrada, max 2MB.
            </p>
            <button
              type="button"
              disabled
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-lg cursor-not-allowed"
            >
              Cambiar Foto (Próximamente)
            </button>
          </div>
        </div>

        {/* --- Formulario de Datos --- */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre Completo */}
            <div>
              <label className={labelClass}>Nombre Completo</label>
              <input
                {...register("fullName", {
                  required: "El nombre es obligatorio",
                })}
                className={inputClass}
                placeholder="Juan Pérez"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            {/* Headline */}
            <div>
              <label className={labelClass}>Titular Profesional</label>
              <input
                {...register("headline", {
                  required: "El titular es obligatorio",
                })}
                className={inputClass}
                placeholder="Desarrollador Full Stack Senior"
              />
              {errors.headline && (
                <span className="text-red-500 text-sm">
                  {errors.headline.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email de Contacto */}
            <div>
              <label className={labelClass}>Email de Contacto Público</label>
              <input
                {...register("contactEmail", {
                  required: "El email es obligatorio",
                })}
                className={inputClass}
                type="email"
              />
              {errors.contactEmail && (
                <span className="text-red-500 text-sm">
                  {errors.contactEmail.message}
                </span>
              )}
            </div>

            {/* Ubicación */}
            <div>
              <label className={labelClass}>Ubicación</label>
              <input
                {...register("location")}
                className={inputClass}
                placeholder="Lima, Perú"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className={labelClass}>Biografía</label>
            <textarea
              {...register("bio", {
                required: "La biografía no puede estar vacía",
              })}
              className={`${inputClass} h-32 resize-none`}
              placeholder="Cuéntanos sobre ti..."
            />
            {errors.bio && (
              <span className="text-red-500 text-sm">{errors.bio.message}</span>
            )}
          </div>

          {/* Botón Guardar */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
            >
              {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
