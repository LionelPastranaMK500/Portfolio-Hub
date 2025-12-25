import { Users, Shield } from "lucide-react";
import { UserRow } from "./components/UserRow";
// import { useAllProfiles } from ... (Necesitarías un hook que traiga TODOS los usuarios)

export default function AdminUsersPage() {
  // MOCK DATA (Simulando la lista de usuarios que vendría de otro servicio)
  const mockProfiles = [
    {
      id: 1,
      fullName: "Usuario Ejemplo",
      headline: "Dev",
      avatarUrl: null,
      slug: "user-1",
      bio: "",
      contactEmail: "",
      location: "",
      resumeUrl: "",
    },
    {
      id: 2,
      fullName: "Otro Usuario",
      headline: "Designer",
      avatarUrl: null,
      slug: "user-2",
      bio: "",
      contactEmail: "",
      location: "",
      resumeUrl: "",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Header Admin */}
      <div className="mb-8 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200">
        <Shield size={24} />
        <div>
          <h1 className="text-xl font-bold">Panel de Administración</h1>
          <p className="text-sm opacity-80">
            Gestión de permisos y colaboradores del sistema.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 text-white">
        <Users className="text-cyan-400" />
        <h2 className="text-2xl font-bold font-maven">Usuarios Registrados</h2>
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {mockProfiles.map((profile) => (
          <UserRow
            key={profile.id}
            profile={profile}
            isCollaboratorInitialState={false}
          />
        ))}
      </div>
    </div>
  );
}
