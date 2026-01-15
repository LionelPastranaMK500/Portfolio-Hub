import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Save,
  X,
  FolderGit2,
  Calendar,
  Star,
  FileText,
  ArrowUpDown,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { projectSchema } from "../../../../types/schemas/ProjectSchema";
import type { ProjectFormProps } from "../../../../types/ui/ProjectUI";
import type { ProjectCreateRequest } from "../../../../types/models/project";
import { CoverUploader } from "../../../../components/ui/CoverUploader";
import { getDriveDirectLink } from "../../../../utils/driveHelper";
import { cn } from "../../../../utils/cn";

interface ExtendedProjectFormProps extends ProjectFormProps {
  onUploadCover?: (file: File) => void;
  isUploadingCover?: boolean;
}

const formatDate = (date: Date | null | undefined): string | null => {
  if (!date) return null;
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
  return adjustedDate.toISOString().split("T")[0];
};

export const ProjectForm = ({
  initialData,
  isLoading,
  onSubmit,
  onCancel,
  onUploadCover,
  isUploadingCover = false,
}: ExtendedProjectFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      summary: "",
      description: "",
      repoUrl: "",
      liveUrl: "",
      coverImage: "",
      startDate: null as Date | null,
      endDate: null as Date | null,
      featured: false,
      sortOrder: 0,
    },
  });

  const startDate = watch("startDate");
  const isFeatured = watch("featured");

  useEffect(() => {
    if (initialData) {
      const start = initialData.startDate
        ? new Date(initialData.startDate + "T00:00:00")
        : null;
      const end = initialData.endDate
        ? new Date(initialData.endDate + "T00:00:00")
        : null;

      reset({
        title: initialData.title,
        summary: initialData.summary,
        description: initialData.description || "",
        repoUrl: initialData.repoUrl || "",
        liveUrl: initialData.liveUrl || "",
        coverImage: initialData.coverImage || "",
        startDate: start,
        endDate: end,
        featured: initialData.featured,
        sortOrder: initialData.sortOrder,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: any) => {
    const payload: ProjectCreateRequest = {
      title: data.title,
      summary: data.summary,
      description: data.description || null,
      repoUrl: data.repoUrl || null,
      liveUrl: data.liveUrl || null,
      coverImage: initialData?.coverImage || null,
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
      featured: data.featured,
      sortOrder: Number(data.sortOrder),
    };
    onSubmit(payload);
  };

  const inputClass = (hasError: boolean) =>
    `w-full p-3 rounded-xl bg-black/40 border text-white focus:ring-1 outline-none transition-all placeholder-gray-600 ${
      hasError
        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
        : "border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-3xl shadow-2xl relative flex flex-col max-h-[90vh]"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-gray-900 rounded-t-2xl z-20 shrink-0">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FolderGit2 className="text-cyan-400" />
          {initialData ? "Editar Proyecto" : "Nuevo Proyecto"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 overflow-y-auto flex-1">
        <form
          id="project-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          {/* SECCIÓN PORTADA */}
          <div className="mb-6">
            {initialData?.id ? (
              <CoverUploader
                currentUrl={getDriveDirectLink(initialData.coverImage)}
                isLoading={!!isUploadingCover}
                onFileSelect={(file) => onUploadCover && onUploadCover(file)}
              />
            ) : (
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3 text-yellow-200/80 text-sm">
                <AlertTriangle size={18} />
                <span>Guarda el proyecto primero para subir una portada.</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
                Título
              </label>
              <input
                {...register("title")}
                className={inputClass(!!errors.title)}
                placeholder="Ej: Portfolio Hub"
              />
              {errors.title && (
                <span className="text-red-400 text-xs ml-1">
                  {errors.title.message as string}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
                Resumen Corto
              </label>
              <textarea
                {...register("summary")}
                rows={2}
                className={`${inputClass(!!errors.summary)} resize-none`}
                placeholder="Breve descripción..."
              />
              {errors.summary && (
                <span className="text-red-400 text-xs ml-1">
                  {errors.summary.message as string}
                </span>
              )}
            </div>
          </div>

          {/* FECHAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-400 mb-1 ml-1 flex items-center gap-2">
                <Calendar size={14} /> Inicio
              </label>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date: Date | null) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    className={inputClass(!!errors.startDate)}
                    placeholderText="Selecciona fecha"
                    showMonthDropdown
                    showYearDropdown
                    popperPlacement="bottom-start"
                  />
                )}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400 mb-1 ml-1 flex items-center gap-2">
                <Calendar size={14} /> Fin (Opcional)
              </label>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date: Date | null) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    className={inputClass(!!errors.endDate)}
                    placeholderText="En desarrollo..."
                    minDate={startDate || undefined}
                    isClearable
                    showMonthDropdown
                    showYearDropdown
                    popperPlacement="bottom-start"
                  />
                )}
              />
            </div>
          </div>

          {/* DESTACAR PROYECTO */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setValue("featured", !isFeatured)}
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg",
                  isFeatured
                    ? "bg-yellow-500 text-black shadow-yellow-500/20 scale-110"
                    : "bg-white/5 text-gray-500 hover:text-gray-300 border border-white/10"
                )}
              >
                <Star
                  size={24}
                  fill={isFeatured ? "currentColor" : "none"}
                  strokeWidth={2.5}
                />
              </button>
              <div>
                <span className="block text-sm font-bold text-white">
                  Destacar Proyecto
                </span>
                <span className="text-xs text-gray-500 italic">
                  Aparecerá en la sección principal
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-white/10">
              <ArrowUpDown size={16} className="text-cyan-500" />
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Orden:
              </label>
              <input
                type="number"
                {...register("sortOrder", { valueAsNumber: true })}
                className="w-12 bg-transparent text-center text-white font-bold outline-none"
              />
            </div>
          </div>

          {/* LINKS Y DESC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              {...register("repoUrl")}
              className={inputClass(false)}
              placeholder="Repo GitHub"
            />
            <input
              {...register("liveUrl")}
              className={inputClass(false)}
              placeholder="Live URL"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 ml-1 flex items-center gap-2">
              <FileText size={14} /> Detalle Técnico
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className={`${inputClass(!!errors.description)} resize-none`}
              placeholder="Tecnologías, desafíos..."
            />
          </div>
        </form>
      </div>

      <div className="flex justify-end gap-3 p-6 border-t border-white/5 bg-gray-900 rounded-b-2xl z-20 shrink-0">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          Cancelar
        </button>
        <button
          form="project-form"
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg transition-all"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          {isLoading ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </motion.div>
  );
};
