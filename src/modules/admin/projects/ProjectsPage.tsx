import { useState } from "react";
import { toast } from "sonner";
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  Github,
  Globe,
  Star,
  Calendar,
} from "lucide-react";
import { useProjects } from "../../../hooks/useProjects";
import { useUpload } from "../../../hooks/useUpload";
import type {
  ProjectDto,
  ProjectCreateRequest,
} from "../../../types/models/project";
import { ProjectModal } from "./components/ProjectModal";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";
// IMPORTANTE: Importar el helper
import { getDriveDirectLink } from "../../../utils/driveHelper";

export default function ProjectsPage() {
  const {
    projects,
    isLoading,
    isError,
    createProject,
    updateProject,
    deleteProject,
    isCreating,
    isUpdating,
  } = useProjects();

  const { uploadProjectCover, isUploadingProjectCover } = useUpload();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProjectDto | null>(null);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ProjectDto) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Eliminar este proyecto permanentemente?")) {
      try {
        await deleteProject(id);
        toast.success("Proyecto eliminado");
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  const handleSubmitForm = async (data: ProjectCreateRequest) => {
    const promise = editingItem
      ? updateProject({ ...data, id: editingItem.id })
      : createProject(data);

    toast.promise(promise, {
      loading: editingItem ? "Actualizando..." : "Creando...",
      success: () => {
        handleClose();
        return editingItem ? "Proyecto actualizado" : "Proyecto creado";
      },
      error: "Error al guardar",
    });
  };

  const handleUploadCover = async (file: File) => {
    if (!editingItem) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen es muy pesada (Máx 5MB)");
      return;
    }

    toast.promise(uploadProjectCover({ projectId: editingItem.id, file }), {
      loading: "Subiendo portada...",
      success: "¡Portada actualizada!",
      error: "Error al subir la imagen",
    });
  };

  const isFormLoading = isCreating || isUpdating;

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center text-cyan-500">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  if (isError)
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex gap-3">
        <AlertCircle /> Error al cargar proyectos.
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-maven text-white flex items-center gap-3">
            <FolderGit2 className="text-cyan-400" size={32} />
            Proyectos
          </h1>
          <p className="text-gray-400 mt-1">
            Muestra tu mejor trabajo al mundo.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-all hover:scale-105 active:scale-95 font-medium shadow-lg backdrop-blur-md"
        >
          <Plus size={20} /> Nuevo Proyecto
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
          <FolderGit2
            size={48}
            className="mx-auto text-gray-600 mb-4 opacity-50"
          />
          <h3 className="text-xl font-bold text-gray-300">Sin proyectos aún</h3>
          <p className="text-gray-500 mt-2">
            Agrega tu primer proyecto destacado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <GlassTiltCard
              key={proj.id}
              className="border-white/10 bg-black/40 group flex flex-col h-full overflow-hidden"
            >
              <div className="h-40 bg-gray-800 relative overflow-hidden">
                {proj.coverImage ? (
                  <img
                    // APLICANDO EL HELPER AQUÍ
                    src={getDriveDirectLink(proj.coverImage)}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
                    <FolderGit2 className="text-gray-600" size={48} />
                  </div>
                )}

                {proj.featured && (
                  <div className="absolute top-3 right-3 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-bold shadow-lg backdrop-blur-md">
                    <Star size={10} fill="currentColor" /> Featured
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="text-xl font-bold text-white line-clamp-1"
                    title={proj.title}
                  >
                    {proj.title}
                  </h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleOpenEdit(proj)}
                      className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                  {proj.summary}
                </p>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>{proj.startDate || "N/A"}</span>
                  </div>
                  <div className="flex gap-3">
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <Globe size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </GlassTiltCard>
          ))}
        </div>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        initialData={editingItem}
        isLoading={isFormLoading}
        onSubmit={handleSubmitForm}
        onClose={handleClose}
        onUploadCover={handleUploadCover}
        isUploadingCover={isUploadingProjectCover}
      />
    </div>
  );
}
