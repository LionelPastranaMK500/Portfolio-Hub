import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Save,
  X,
  FolderGit2,
  Link as LinkIcon,
  Calendar,
  Star,
  FileText,
  Hash,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { projectSchema } from "../../../../types/schemas/ProjectSchema";
import type { ProjectFormProps } from "../../../../types/ui/ProjectUI";
import type { ProjectCreateRequest } from "../../../../types/models/project";
import { CoverUploader } from "../../../../components/ui/CoverUploader";

// Extendemos props
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
  onUploadCover, // Nuevo
  isUploadingCover = false, // Nuevo
}: ExtendedProjectFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
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
    } else {
      reset({
        title: "",
        summary: "",
        description: "",
        repoUrl: "",
        liveUrl: "",
        coverImage: "",
        startDate: new Date(),
        endDate: null,
        featured: false,
        sortOrder: 0,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: any) => {
    // Casting seguro manual
    const payload: ProjectCreateRequest = {
      title: data.title,
      summary: data.summary,
      description: data.description || null,
      repoUrl: data.repoUrl || null,
      liveUrl: data.liveUrl || null,
      coverImage: initialData?.coverImage || null, // Mantenemos la imagen que ya tiene si no se toca
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

  const labelClass = "block text-sm font-medium text-gray-400 mb-1 ml-1";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4 sticky top-0 bg-gray-900 z-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FolderGit2 className="text-cyan-400" />
          {initialData ? "Editar Proyecto" : "Nuevo Proyecto"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* --- SECCIÓN PORTADA (Upload) --- */}
        <div className="mb-6">
          {initialData?.id ? (
            // MODO EDICIÓN: Mostramos el Uploader
            <CoverUploader
              currentUrl={initialData.coverImage}
              isLoading={!!isUploadingCover}
              onFileSelect={(file) => onUploadCover && onUploadCover(file)}
            />
          ) : (
            // MODO CREACIÓN: Aviso
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3 text-yellow-200/80 text-sm">
              <AlertTriangle size={18} />
              <span>
                Guarda el proyecto primero para poder subir una imagen de
                portada.
              </span>
            </div>
          )}
        </div>

        {/* --- DATOS PRINCIPALES --- */}
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Título</label>
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
            <label className={labelClass}>Resumen Corto</label>
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

        {/* --- LINKS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>
              <span className="flex items-center gap-2">
                <FolderGit2 size={14} /> Repositorio
              </span>
            </label>
            <input
              {...register("repoUrl")}
              className={inputClass(!!errors.repoUrl)}
              placeholder="https://github.com/..."
            />
          </div>
          <div>
            <label className={labelClass}>
              <span className="flex items-center gap-2">
                <LinkIcon size={14} /> Live URL
              </span>
            </label>
            <input
              {...register("liveUrl")}
              className={inputClass(!!errors.liveUrl)}
              placeholder="https://mi-app.com"
            />
          </div>
        </div>

        {/* --- FECHAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>
              <span className="flex items-center gap-2">
                <Calendar size={14} /> Inicio
              </span>
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
                />
              )}
            />
          </div>
          <div>
            <label className={labelClass}>Fin</label>
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
                  showMonthDropdown
                  showYearDropdown
                  isClearable
                />
              )}
            />
          </div>
        </div>

        {/* --- CONFIG --- */}
        <div className="flex gap-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register("featured")}
              className="hidden peer"
            />
            <div className="w-5 h-5 rounded border border-gray-500 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 flex items-center justify-center transition-all">
              <Star
                size={12}
                className="text-black opacity-0 peer-checked:opacity-100"
                fill="black"
              />
            </div>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
              Destacado
            </span>
          </label>

          <div className="flex items-center gap-2">
            <Hash size={16} className="text-gray-500" />
            <label className="text-sm text-gray-400">Orden:</label>
            <input
              type="number"
              {...register("sortOrder", { valueAsNumber: true })}
              className="w-16 p-1 rounded bg-black/40 border border-white/10 text-center text-white focus:border-cyan-500 outline-none"
            />
          </div>
        </div>

        {/* --- DESC LARGA --- */}
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <FileText size={14} /> Detalle
            </span>
          </label>
          <textarea
            {...register("description")}
            rows={5}
            className={`${inputClass(!!errors.description)} resize-none`}
            placeholder="Detalles técnicos..."
          />
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/5 sticky bottom-0 bg-gray-900 z-10">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg shadow-cyan-900/20 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
