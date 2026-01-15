import { useState } from "react";
import { toast } from "sonner";
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { useEducation } from "../../../hooks/useEducation";
import type {
  EducationDto,
  EducationCreateRequest,
} from "../../../types/models/education";
import { EducationModal } from "./components/EducationModal";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";

export default function EducationPage() {
  const {
    educationList,
    isLoading,
    isError,
    createEducation,
    updateEducation,
    deleteEducation,
    isCreating,
    isUpdating,
  } = useEducation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EducationDto | null>(null);

  const isFormLoading = isCreating || isUpdating;

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: EducationDto) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      try {
        await deleteEducation(id);
        toast.success("Educación eliminada");
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  const handleSubmitForm = async (data: EducationCreateRequest) => {
    const promise = editingItem
      ? updateEducation({ ...data, id: editingItem.id })
      : createEducation(data);

    toast.promise(promise, {
      loading: editingItem ? "Actualizando..." : "Creando...",
      success: () => {
        handleClose();
        return editingItem ? "Registro actualizado" : "Registro creado";
      },
      error: "Error al guardar",
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
        <AlertCircle /> Error al cargar datos.
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-maven text-white flex items-center gap-3">
            <GraduationCap className="text-cyan-400" size={32} />
            Educación
          </h1>
          <p className="text-gray-400 mt-1">
            Tu historial académico y formativo.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-all hover:scale-105 active:scale-95 font-medium shadow-lg backdrop-blur-md"
        >
          <Plus size={20} /> Nueva Formación
        </button>
      </div>

      {educationList.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
          <GraduationCap
            size={48}
            className="mx-auto text-gray-600 mb-4 opacity-50"
          />
          <h3 className="text-xl font-bold text-gray-300">Sin registros</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {[...educationList]
            .sort((a, b) => b.id - a.id)
            .map((edu) => (
              <GlassTiltCard
                key={edu.id}
                className="p-0 border-white/10 bg-black/40 group relative overflow-hidden"
              >
                {/* RAYA LATERAL GRADIENTE */}
                <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-cyan-500 via-blue-600 to-purple-600 opacity-70 group-hover:opacity-100 transition-opacity" />

                {/* CONTENIDO CON PADDING MEJORADO (pl-8) */}
                <div className="p-6 pl-8 flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-widest">
                        {edu.degree}
                      </span>
                      {edu.field && (
                        <span className="text-gray-500 text-xs font-medium uppercase tracking-tighter italic">
                          {edu.field}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {edu.institution}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        <Calendar size={12} className="text-cyan-500" />
                        <span>{edu.startDate}</span>
                        <span className="opacity-30">—</span>
                        <span
                          className={
                            !edu.endDate ? "text-emerald-400 font-bold" : ""
                          }
                        >
                          {edu.endDate || "Actualidad"}
                        </span>
                      </div>
                    </div>

                    {edu.description && (
                      <p className="text-sm text-gray-400 max-w-4xl leading-relaxed whitespace-pre-wrap border-l border-white/10 pl-4">
                        {edu.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <button
                      onClick={() => handleOpenEdit(edu)}
                      className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-cyan-400 transition-colors border border-white/5"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(edu.id)}
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

      <EducationModal
        isOpen={isModalOpen}
        initialData={editingItem}
        isLoading={isFormLoading}
        onSubmit={handleSubmitForm}
        onClose={handleClose}
      />
    </div>
  );
}
