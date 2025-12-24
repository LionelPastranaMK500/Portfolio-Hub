// src/pages/dashboard/projects/ProjectSavePage.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateProject,
  useUpdateProject,
  useProject,
} from "../../../services/projectService";
import type { ProjectCreateRequest } from "../../../types/models/project";
import { toast } from "react-toastify";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";

export default function ProjectSavePage() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();

  // Hooks de React Query
  const { data: project, isLoading: isLoadingProject } = useProject(Number(id));
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const isSaving = isCreating || isUpdating;

  // Formulario
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectCreateRequest>();

  // Cargar datos si estamos editando
  useEffect(() => {
    if (isEditing && project) {
      reset({
        title: project.title,
        summary: project.summary,
        description: project.description || "",
        repoUrl: project.repoUrl || "",
        liveUrl: project.liveUrl || "",
        coverImage: project.coverImage || "",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        featured: project.featured,
        sortOrder: project.sortOrder,
      });
    }
  }, [isEditing, project, reset]);

  const onSubmit = (data: ProjectCreateRequest) => {
    if (isEditing) {
      updateProject(
        { id: Number(id), ...data },
        {
          onSuccess: () => {
            toast.success("Proyecto actualizado");
            navigate("/dashboard/projects");
          },
        }
      );
    } else {
      createProject(data, {
        onSuccess: () => {
          toast.success("Proyecto creado");
          navigate("/dashboard/projects");
        },
      });
    }
  };

  if (isEditing && isLoadingProject)
    return (
      <div className="p-10 text-center">
        <FaSpinner className="animate-spin inline" /> Cargando...
      </div>
    );

  // Clases de estilo
  const inputClass =
    "w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-cyan-500 mb-6 transition-colors"
      >
        <FaArrowLeft /> Volver
      </button>

      <h1 className="text-3xl font-bold font-maven mb-8 text-gray-800 dark:text-white">
        {isEditing ? "Editar Proyecto" : "Nuevo Proyecto"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white/50 dark:bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700"
      >
        {/* Título y Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Título *</label>
            <input
              {...register("title", { required: "El título es obligatorio" })}
              className={inputClass}
              placeholder="Mi Super App"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <div>
            <label className={labelClass}>Resumen Corto *</label>
            <input
              {...register("summary", {
                required: "El resumen es obligatorio",
              })}
              className={inputClass}
              placeholder="Breve descripción para la tarjeta..."
            />
            {errors.summary && (
              <span className="text-red-500 text-sm">
                {errors.summary.message}
              </span>
            )}
          </div>
        </div>

        {/* Descripción Larga */}
        <div>
          <label className={labelClass}>Descripción Completa</label>
          <textarea
            {...register("description")}
            className={`${inputClass} h-40 resize-none`}
            placeholder="Detalles técnicos, desafíos, soluciones..."
          />
        </div>

        {/* Enlaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>URL del Repositorio (GitHub)</label>
            <input
              {...register("repoUrl")}
              className={inputClass}
              placeholder="https://github.com/usuario/proyecto"
            />
          </div>
          <div>
            <label className={labelClass}>URL Demo (Live)</label>
            <input
              {...register("liveUrl")}
              className={inputClass}
              placeholder="https://mi-proyecto.com"
            />
          </div>
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Fecha Inicio</label>
            <input
              type="date"
              {...register("startDate")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Fecha Fin (Dejar vacío si es actual)
            </label>
            <input
              type="date"
              {...register("endDate")}
              className={inputClass}
            />
          </div>
        </div>

        {/* Configuración */}
        <div className="flex items-center gap-6 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("featured")}
              className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Destacar Proyecto
            </span>
          </label>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Orden:
            </label>
            <input
              type="number"
              {...register("sortOrder", { valueAsNumber: true })}
              className={`${inputClass} w-20 py-1`}
              defaultValue={0}
            />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
          >
            {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {isSaving ? "Guardando..." : "Guardar Proyecto"}
          </button>
        </div>
      </form>
    </div>
  );
}
