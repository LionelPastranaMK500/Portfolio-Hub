import { useState } from "react";
import { toast } from "sonner";
import { User, ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { useAdmin } from "../../../hooks/useAdmin";
import type { ProfileDto } from "../../../types/models/profile";

interface UserRowProps {
  profile: ProfileDto;
  // Asumimos que ProfileDto tiene un campo 'isCollaborator' o similar.
  // Si no viene en el DTO, el backend debería enviarlo para saber el estado actual.
  isCollaboratorInitialState?: boolean;
}

export const UserRow = ({
  profile,
  isCollaboratorInitialState = false,
}: UserRowProps) => {
  const { toggleCollaboratorAsync, isToggling } = useAdmin();
  const [isCollaborator, setIsCollaborator] = useState(
    isCollaboratorInitialState
  );

  const handleToggle = async () => {
    try {
      // Llamamos al servicio
      await toggleCollaboratorAsync(profile.id);

      // Actualizamos estado local visualmente
      setIsCollaborator(!isCollaborator);

      toast.success(
        `Estado de colaborador actualizado para ${profile.fullName}`
      );
    } catch (error) {
      toast.error("Error al cambiar permisos");
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 border border-white/5 rounded-xl hover:border-white/10 transition-all mb-3">
      {/* Info del Usuario */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden border border-white/10">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <User size={20} />
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">{profile.fullName}</h4>
          <p className="text-xs text-gray-500">
            {profile.headline || "Sin titular"}
          </p>
        </div>
      </div>

      {/* Botón de Toggle (Admin Action) */}
      <button
        onClick={handleToggle}
        disabled={isToggling}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border
          ${
            isCollaborator
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
              : "bg-gray-800 text-gray-400 border-white/5 hover:bg-gray-700"
          }
        `}
      >
        {isToggling ? (
          <Loader2 className="animate-spin" size={14} />
        ) : isCollaborator ? (
          <ShieldCheck size={14} />
        ) : (
          <ShieldAlert size={14} />
        )}
        {isCollaborator ? "Es Colaborador" : "Usuario Normal"}
      </button>
    </div>
  );
};
