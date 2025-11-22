// src/pages/dashboard/skills/SkillManagerPage.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaLayerGroup,
  FaCode,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import {
  useSkillCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCreateSkill,
  useUpdateSkill,
  useDeleteSkill,
  type SkillCategoryDto,
  type SkillDto,
  type SkillCategoryCreateRequest,
  type SkillCreateRequest,
} from "../../../services/skillService";

// --- COMPONENTE MODAL SIMPLE ---
const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default function SkillManagerPage() {
  const { data: categories, isLoading } = useSkillCategories();

  // Mutations
  const createCat = useCreateCategory();
  const updateCat = useUpdateCategory();
  const deleteCat = useDeleteCategory();
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  // Estados para Modales
  const [isCatModalOpen, setCatModalOpen] = useState(false);
  const [isSkillModalOpen, setSkillModalOpen] = useState(false);

  // Estado de Edición (null = creando, objeto = editando)
  const [editingCategory, setEditingCategory] =
    useState<SkillCategoryDto | null>(null);
  const [editingSkill, setEditingSkill] = useState<SkillDto | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  ); // Para saber a quién añadir el skill

  // Formularios
  const {
    register: regCat,
    handleSubmit: subCat,
    reset: resetCat,
  } = useForm<SkillCategoryCreateRequest>();
  const {
    register: regSkill,
    handleSubmit: subSkill,
    reset: resetSkill,
  } = useForm<SkillCreateRequest>();

  // --- HANDLERS CATEGORÍA ---
  const openNewCat = () => {
    setEditingCategory(null);
    resetCat({ name: "", sortOrder: 0 });
    setCatModalOpen(true);
  };
  const openEditCat = (cat: SkillCategoryDto) => {
    setEditingCategory(cat);
    resetCat({ name: cat.name, sortOrder: cat.sortOrder });
    setCatModalOpen(true);
  };

  const onCatSubmit = (data: SkillCategoryCreateRequest) => {
    if (editingCategory) {
      updateCat.mutate(
        { id: editingCategory.id, ...data },
        {
          onSuccess: () => {
            toast.success("Categoría actualizada");
            setCatModalOpen(false);
          },
        }
      );
    } else {
      createCat.mutate(data, {
        onSuccess: () => {
          toast.success("Categoría creada");
          setCatModalOpen(false);
        },
      });
    }
  };

  const handleDeleteCat = (id: number) => {
    if (window.confirm("¿Borrar categoría y TODAS sus habilidades?")) {
      deleteCat.mutate(id, {
        onSuccess: () => toast.success("Categoría eliminada"),
      });
    }
  };

  // --- HANDLERS SKILL ---
  const openNewSkill = (catId: number) => {
    setSelectedCategoryId(catId);
    setEditingSkill(null);
    resetSkill({ name: "", level: 50, icon: "", sortOrder: 0 });
    setSkillModalOpen(true);
  };
  const openEditSkill = (catId: number, skill: SkillDto) => {
    setSelectedCategoryId(catId);
    setEditingSkill(skill);
    resetSkill({
      name: skill.name,
      level: skill.level,
      icon: skill.icon || "",
      sortOrder: 0,
    });
    setSkillModalOpen(true);
  };

  const onSkillSubmit = (data: SkillCreateRequest) => {
    if (!selectedCategoryId) return;

    if (editingSkill) {
      updateSkill.mutate(
        {
          categoryId: selectedCategoryId,
          data: { id: editingSkill.id, ...data } as any,
        },
        {
          onSuccess: () => {
            toast.success("Skill actualizado");
            setSkillModalOpen(false);
          },
        }
      );
    } else {
      createSkill.mutate(
        { categoryId: selectedCategoryId, data },
        {
          onSuccess: () => {
            toast.success("Skill añadido");
            setSkillModalOpen(false);
          },
        }
      );
    }
  };

  const handleDeleteSkill = (catId: number, skillId: number) => {
    if (window.confirm("¿Borrar habilidad?")) {
      deleteSkill.mutate(
        { categoryId: catId, skillId },
        { onSuccess: () => toast.success("Skill eliminado") }
      );
    }
  };

  if (isLoading)
    return (
      <div className="p-10 text-center">
        <FaSpinner className="animate-spin inline text-cyan-500 h-8 w-8" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-maven text-gray-800 dark:text-white">
            Habilidades
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Organiza tus skills por categorías.
          </p>
        </div>
        <button
          onClick={openNewCat}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold shadow-lg transition-all"
        >
          <FaPlus /> Nueva Categoría
        </button>
      </div>

      {/* --- LISTA DE CATEGORÍAS --- */}
      <div className="space-y-8">
        {categories?.map((cat) => (
          <div
            key={cat.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
          >
            {/* Header Categoría */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <FaLayerGroup className="text-cyan-500" /> {cat.name}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditCat(cat)}
                  className="p-2 text-gray-500 hover:text-cyan-500 transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCat(cat.id)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* Body: Lista de Skills */}
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700 hover:border-cyan-500/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {/* Placeholder de Icono o Imagen */}
                      <div className="w-8 h-8 rounded bg-white dark:bg-gray-600 flex items-center justify-center text-xs text-gray-400 overflow-hidden">
                        {skill.icon ? (
                          <img
                            src={skill.icon}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaCode />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                          {skill.name}
                        </p>
                        <p className="text-xs text-gray-500">{skill.level}%</p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditSkill(cat.id, skill)}
                        className="p-1 text-gray-400 hover:text-cyan-500"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(cat.id, skill.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Botón Añadir Skill */}
                <button
                  onClick={() => openNewSkill(cat.id)}
                  className="flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-400 hover:text-cyan-500 hover:border-cyan-500/50 transition-all text-sm font-medium h-[60px]"
                >
                  <FaPlus /> Añadir Skill
                </button>
              </div>
            </div>
          </div>
        ))}

        {categories?.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No hay categorías. ¡Crea la primera!
          </div>
        )}
      </div>

      {/* --- MODAL CATEGORÍA --- */}
      <Modal
        isOpen={isCatModalOpen}
        onClose={() => setCatModalOpen(false)}
        title={editingCategory ? "Editar Categoría" : "Nueva Categoría"}
      >
        <form onSubmit={subCat(onCatSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Nombre
            </label>
            <input
              {...regCat("name", { required: true })}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Ej: Frontend, Backend"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Orden
            </label>
            <input
              type="number"
              {...regCat("sortOrder")}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-500 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal>

      {/* --- MODAL SKILL --- */}
      <Modal
        isOpen={isSkillModalOpen}
        onClose={() => setSkillModalOpen(false)}
        title={editingSkill ? "Editar Habilidad" : "Nueva Habilidad"}
      >
        <form onSubmit={subSkill(onSkillSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Nombre
            </label>
            <input
              {...regSkill("name", { required: true })}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Ej: React, Java"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Nivel (0-100)
              </label>
              <input
                type="number"
                {...regSkill("level", { min: 0, max: 100 })}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Orden
              </label>
              <input
                type="number"
                {...regSkill("sortOrder")}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          {/* Nota: La subida de icono real la haremos después, por ahora es texto para la URL */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              URL Icono (Opcional)
            </label>
            <input
              {...regSkill("icon")}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Más adelante podrás subir archivos reales.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-500 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
