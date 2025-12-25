import { useState } from "react";
import { useSkillsByCategory } from "../../../../hooks/useSkills";
import { useUpload } from "../../../../hooks/useUpload"; // <--- 1. IMPORTAR
import { toast } from "sonner";
import {
  Edit2,
  Trash2,
  Plus,
  GripVertical,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { GlassTiltCard } from "../../../../components/ui/GlassTiltCard";
import { SkillModal } from "./Modals";
import type {
  SkillDto,
  SkillCreateRequest,
} from "../../../../types/models/skill";
import type { CategoryCardProps } from "../../../../types/ui/CategoryCardProps";

export const CategoryCard = ({
  category,
  onEditCategory,
  onDeleteCategory,
}: CategoryCardProps) => {
  const {
    skills,
    isLoading,
    isError,
    createSkills,
    updateSkills,
    deleteSkills,
    isCreating,
    isUpdating,
  } = useSkillsByCategory(category.id);

  // 2. HOOK DE SUBIDA
  const { uploadSkillIcon, isUploadingSkillIcon } = useUpload();

  const [isSkillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillDto | null>(null);

  // --- HANDLERS SKILLS ---
  const handleOpenAddSkill = () => {
    setEditingSkill(null);
    setSkillModalOpen(true);
  };

  const handleOpenEditSkill = (skill: SkillDto) => {
    setEditingSkill(skill);
    setSkillModalOpen(true);
  };

  const handleSubmitSkill = async (data: SkillCreateRequest) => {
    try {
      if (editingSkill) {
        await updateSkills([{ ...data, id: editingSkill.id }]);
        toast.success("Habilidad actualizada");
      } else {
        await createSkills([data]);
        toast.success("Habilidad agregada");
      }
      setSkillModalOpen(false);
    } catch (e) {
      toast.error("Error al guardar habilidad");
    }
  };

  const handleDeleteSkill = async (skillId: number) => {
    if (window.confirm("¿Eliminar habilidad?")) {
      try {
        await deleteSkills([skillId]);
        toast.success("Habilidad eliminada");
      } catch (e) {
        toast.error("Error al eliminar");
      }
    }
  };

  // 3. HANDLER DE SUBIDA DE ICONO
  const handleUploadIcon = async (file: File) => {
    if (!editingSkill) return;

    if (file.size > 2 * 1024 * 1024) {
      // 2MB Limit para iconos
      toast.error("El icono debe pesar menos de 2MB");
      return;
    }

    toast.promise(uploadSkillIcon({ skillId: editingSkill.id, file }), {
      loading: "Subiendo icono...",
      success: "¡Icono actualizado!",
      error: "Error al subir icono",
    });
  };

  return (
    <div className="h-full">
      <GlassTiltCard className="h-full flex flex-col border-white/10 bg-black/40">
        {/* HEADER CATEGORIA */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 bg-black/30 px-2 py-1 rounded">
              #{category.sortOrder}
            </span>
            <h3 className="text-lg font-bold text-white">{category.name}</h3>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onEditCategory(category)}
              className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDeleteCategory(category.id)}
              className="p-1.5 hover:bg-red-500/10 rounded text-gray-400 hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* LISTA DE SKILLS */}
        <div className="p-4 flex-1 space-y-3 min-h-[200px]">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-cyan-500" />
            </div>
          ) : isError ? (
            <div className="text-red-400 text-sm flex items-center gap-2">
              <AlertCircle size={14} /> Error cargando skills
            </div>
          ) : skills.length === 0 ? (
            <div className="text-center py-8 text-gray-600 text-sm italic">
              Sin habilidades aún
            </div>
          ) : (
            skills.map((skill) => (
              <div
                key={skill.id}
                className="group flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <GripVertical
                    size={14}
                    className="text-gray-600 cursor-move"
                  />
                  {skill.icon && (
                    <img
                      src={skill.icon}
                      alt=""
                      className="w-6 h-6 object-contain" // Icono un poco más grande
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-200 leading-none">
                      {skill.name}
                    </p>
                    {/* Barra de Nivel Mini */}
                    <div className="w-20 h-1 bg-gray-700 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full bg-cyan-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenEditSkill(skill)}
                    className="p-1 hover:bg-black/40 rounded text-gray-400 hover:text-cyan-400"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-1 hover:bg-black/40 rounded text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER: ADD SKILL */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleOpenAddSkill}
            className="w-full py-2 flex items-center justify-center gap-2 text-sm font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-dashed border-white/10 hover:border-white/30"
          >
            <Plus size={16} /> Agregar Habilidad
          </button>
        </div>
      </GlassTiltCard>

      {/* MODAL DE SKILLS */}
      <SkillModal
        isOpen={isSkillModalOpen}
        initialData={editingSkill}
        isLoading={isCreating || isUpdating}
        onSubmit={handleSubmitSkill}
        onClose={() => setSkillModalOpen(false)}
        onUploadIcon={handleUploadIcon}
        isUploadingIcon={isUploadingSkillIcon}
      />
    </div>
  );
};
