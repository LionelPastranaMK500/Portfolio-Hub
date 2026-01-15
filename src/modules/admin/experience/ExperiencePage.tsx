import { useState } from "react";
import { toast } from "sonner";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  Calendar,
  MapPin,
} from "lucide-react";
import { useExperience } from "../../../hooks/useExperience";
import type {
  ExperienceDto,
  ExperienceCreateRequest,
} from "../../../types/models/experience";
import { ExperienceModal } from "./components/ExperienceModal";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";

export default function ExperiencePage() {
  const {
    experiences,
    isLoading,
    isError,
    createExperience,
    updateExperience,
    deleteExperience,
    isCreating,
    isUpdating,
  } = useExperience();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExperienceDto | null>(null);

  // --- SOLUCIÓN AL ERROR DE TYPESCRIPT ---
  // Agrupamos los estados para pasarlos al modal
  const isFormLoading = isCreating || isUpdating;

  // --- HANDLERS ---
  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ExperienceDto) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar esta experiencia?")) {
      try {
        await deleteExperience(id);
        toast.success("Experiencia eliminada");
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  const handleSubmitForm = async (data: ExperienceCreateRequest) => {
    const promise = editingItem
      ? updateExperience({ ...data, id: editingItem.id })
      : createExperience(data);

    toast.promise(promise, {
      loading: editingItem ? "Actualizando..." : "Creando...",
      success: () => {
        handleClose();
        return editingItem ? "Experiencia actualizada" : "Experiencia creada";
      },
      error: "Error al guardar los cambios",
    });
  };

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center text-cyan-500">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );

  if (isError)
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex gap-3">
        <AlertCircle /> Error al cargar experiencia.
      </div>
    );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-maven text-white flex items-center gap-3">
            <Briefcase className="text-cyan-400" size={32} />
            Experiencia Laboral
          </h1>
          <p className="text-gray-400 mt-1">
            Tu trayectoria profesional y puestos ocupados.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-all hover:scale-105 active:scale-95 font-medium shadow-lg backdrop-blur-md"
        >
          <Plus size={20} /> Nueva Experiencia
        </button>
      </div>

      {/* LISTA */}
      {experiences.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
          <Briefcase
            size={48}
            className="mx-auto text-gray-600 mb-4 opacity-50"
          />
          <h3 className="text-xl font-bold text-gray-300">
            Sin experiencia registrada
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {[...experiences]
            .sort((a, b) => b.id - a.id)
            .map((exp) => (
              <GlassTiltCard
                key={exp.id}
                className="p-0 border-white/10 bg-black/40 group relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-cyan-500 via-blue-600 to-purple-600 opacity-70 group-hover:opacity-100 transition-opacity" />

                <div className="p-6 pl-8 flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-0.5 tracking-tight">
                      {exp.role}
                    </h3>
                    <h4 className="text-lg text-cyan-400 font-medium mb-4">
                      {exp.company}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-5">
                      <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        <Calendar size={12} className="text-cyan-500" />
                        <span>{exp.startDate}</span>
                        <span className="opacity-30">—</span>
                        <span
                          className={
                            exp.current ? "text-emerald-400 font-bold" : ""
                          }
                        >
                          {exp.current ? "Actualidad" : exp.endDate}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                          <MapPin size={12} className="text-cyan-500" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>

                    {exp.description && (
                      <p className="text-sm text-gray-400 max-w-4xl leading-relaxed whitespace-pre-wrap border-l border-white/10 pl-4">
                        {exp.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <button
                      onClick={() => handleOpenEdit(exp)}
                      className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-cyan-400 transition-colors border border-white/5"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="p-2.5 bg-red-500/5 hover:bg-red-500/10 rounded-xl text-gray-400 hover:text-red-400 transition-colors border border-white/5"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </GlassTiltCard>
            ))}
        </div>
      )}

      <ExperienceModal
        isOpen={isModalOpen}
        initialData={editingItem}
        isLoading={isFormLoading}
        onSubmit={handleSubmitForm}
        onClose={handleClose}
      />
    </div>
  );
}
