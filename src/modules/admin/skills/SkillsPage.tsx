import { useState } from "react";
import { toast } from "sonner";
import { Layers, Plus, Loader2, AlertCircle } from "lucide-react";
import { useSkillCategories } from "../../../hooks/useSkills";
import { CategoryCard } from "./components/CategoryCard";
import { CategoryModal } from "./components/Modals";
import type {
  SkillCategoryDto,
  SkillCategoryCreateRequest,
} from "../../../types/models/skillCategory";

export default function SkillsPage() {
  const {
    categories,
    isLoading,
    isError,
    createCategories,
    updateCategories,
    deleteCategories,
    isCreating,
    isUpdating,
  } = useSkillCategories();

  const [isCatModalOpen, setCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<SkillCategoryDto | null>(null);

  // --- HANDLERS CATEGORY ---
  const handleOpenCreateCat = () => {
    setEditingCat(null);
    setCatModalOpen(true);
  };
  const handleOpenEditCat = (cat: SkillCategoryDto) => {
    setEditingCat(cat);
    setCatModalOpen(true);
  };

  const handleSubmitCat = async (data: SkillCategoryCreateRequest) => {
    try {
      if (editingCat) {
        await updateCategories([{ ...data, id: editingCat.id }]);
        toast.success("Categoría actualizada");
      } else {
        await createCategories([data]);
        toast.success("Categoría creada");
      }
      setCatModalOpen(false);
    } catch (e) {
      toast.error("Error al guardar categoría");
    }
  };

  const handleDeleteCat = async (id: number) => {
    if (window.confirm("¿Eliminar categoría y todas sus habilidades?")) {
      try {
        // Batch Delete (Array IDs)
        const request = { ids: [id] };
        await deleteCategories(request);
        toast.success("Categoría eliminada");
      } catch (e) {
        toast.error("Error al eliminar");
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center text-cyan-500">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  if (isError)
    return (
      <div className="p-6 bg-red-500/10 text-red-400 flex gap-3 rounded-xl">
        <AlertCircle /> Error cargando categorías.
      </div>
    );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-maven text-white flex items-center gap-3">
            <Layers className="text-cyan-400" size={32} /> Habilidades Técnicas
          </h1>
          <p className="text-gray-400 mt-1">
            Organiza tu stack tecnológico por categorías.
          </p>
        </div>
        <button
          onClick={handleOpenCreateCat}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-all shadow-lg font-medium"
        >
          <Plus size={20} /> Nueva Categoría
        </button>
      </div>

      {/* GRID DE CATEGORIAS */}
      {categories.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
          <Layers size={48} className="mx-auto text-gray-600 mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-gray-300">Sin categorías</h3>
          <p className="text-gray-500 mt-2">
            Crea una categoría (ej: "Frontend") para empezar a añadir skills.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onEditCategory={handleOpenEditCat}
                onDeleteCategory={handleDeleteCat}
              />
            ))}
        </div>
      )}

      {/* MODAL CATEGORIA */}
      <CategoryModal
        isOpen={isCatModalOpen}
        initialData={editingCat}
        isLoading={isCreating || isUpdating}
        onSubmit={handleSubmitCat}
        onClose={() => setCatModalOpen(false)}
      />
    </div>
  );
}
