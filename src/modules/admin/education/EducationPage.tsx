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

  // --- HANDLERS ---
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

  const isFormLoading = isCreating || isUpdating;

  // --- RENDER ---
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
      {/* HEADER */}
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

      {/* LISTA */}
      {educationList.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
          <GraduationCap
            size={48}
            className="mx-auto text-gray-600 mb-4 opacity-50"
          />
          <h3 className="text-xl font-bold text-gray-300">Sin registros</h3>
          <p className="text-gray-500 mt-2">
            Añade tu primera experiencia educativa.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {educationList.map((edu) => (
            <GlassTiltCard
              key={edu.id}
              className="p-6 border-white/10 bg-black/40 group relative overflow-hidden"
            >
              {/* Decoración */}
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 opacity-50" />

              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                {/* Info Principal */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                      {edu.degree}
                    </span>
                    {edu.field && (
                      <span className="text-gray-500 text-sm">
                        • {edu.field}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {edu.institution}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <Calendar size={14} />
                    <span>{edu.startDate}</span>
                    <span>—</span>
                    <span
                      className={
                        !edu.endDate ? "text-emerald-400 font-medium" : ""
                      }
                    >
                      {edu.endDate || "Actualidad"}
                    </span>
                  </div>

                  {edu.description && (
                    <p className="text-sm text-gray-400 max-w-3xl">
                      {edu.description}
                    </p>
                  )}
                </div>

                {/* Acciones */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenEdit(edu)}
                    className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </GlassTiltCard>
          ))}
        </div>
      )}

      {/* MODAL */}
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
