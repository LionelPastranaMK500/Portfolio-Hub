import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";
import { useMe } from "../../../hooks/useMe";
import { useUpload } from "../../../hooks/useUpload";
import { ProfileForm } from "./components/ProfileForm";
import type { ProfileUpdateRequest } from "../../../types/models/profile";

export default function ProfilePage() {
  const { myProfile, isLoading, isError, updateProfile, isUpdatingProfile } =
    useMe();

  const { uploadAvatar, isUploadingAvatar, uploadResume, isUploadingResume } =
    useUpload();

  const handleUpdate = async (data: ProfileUpdateRequest) => {
    toast.promise(updateProfile(data), {
      loading: "Actualizando tu perfil...",
      success: "¡Perfil actualizado correctamente!",
      error: "Error al guardar los cambios",
    });
  };

  const handleUploadAvatar = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      toast.error("La imagen es muy pesada. Máximo 2MB.");
      return;
    }
    toast.promise(uploadAvatar(file), {
      loading: "Subiendo nueva foto...",
      success: "¡Foto de perfil actualizada!",
      error: "Error al subir la imagen",
    });
  };

  const handleUploadResume = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("El CV debe ser un archivo PDF.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("El archivo PDF es muy pesado. Máximo 5MB.");
      return;
    }

    toast.promise(uploadResume(file), {
      loading: "Subiendo CV...",
      success: "¡CV actualizado correctamente!",
      error: "Error al subir el documento",
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center flex-col gap-4 text-cyan-500">
        <Loader2 className="animate-spin w-12 h-12" />
        <p className="text-gray-400 text-sm font-medium animate-pulse">
          Cargando perfil...
        </p>
      </div>
    );
  }

  if (isError || !myProfile) {
    return (
      <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200 flex flex-col items-center gap-4 text-center max-w-md mx-auto mt-20">
        <AlertCircle size={48} />
        <div>
          <h3 className="font-bold text-lg">Error al cargar perfil</h3>
          <p className="text-sm opacity-80">
            No pudimos obtener tus datos. Por favor, intenta recargar la página.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm font-medium transition-colors"
        >
          Recargar Página
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-maven text-white mb-2">
          Mi Perfil
        </h1>
        <p className="text-gray-400 text-lg">
          Gestiona tu información personal y cómo te ven los reclutadores.
        </p>
      </div>

      <ProfileForm
        initialData={myProfile}
        isLoading={isLoading}
        isSaving={isUpdatingProfile}
        onSubmit={handleUpdate}
        onUploadAvatar={handleUploadAvatar}
        isUploadingAvatar={isUploadingAvatar}
        onUploadResume={handleUploadResume}
        isUploadingResume={isUploadingResume}
      />
    </div>
  );
}
