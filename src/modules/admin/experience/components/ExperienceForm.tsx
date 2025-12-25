import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Save,
  X,
  Briefcase,
  MapPin,
  Calendar,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  experienceSchema,
  type ExperienceSchemaType,
} from "../../../../types/schemas/ExperienceSchema";
import type { ExperienceFormProps } from "../../../../types/ui/ExperienceUI";
import type { ExperienceCreateRequest } from "../../../../types/models/experience";

const formatDate = (date: Date | null | undefined): string | null => {
  if (!date) return null;
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
  return adjustedDate.toISOString().split("T")[0];
};

export const ExperienceForm = ({
  initialData,
  isLoading,
  onSubmit,
  onCancel,
}: ExperienceFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ExperienceSchemaType>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      role: "",
      location: "",
      startDate: new Date(),
      endDate: null,
      current: false,
      description: "",
    },
  });

  const isCurrentJob = watch("current");

  useEffect(() => {
    if (isCurrentJob) {
      setValue("endDate", null);
    }
  }, [isCurrentJob, setValue]);

  useEffect(() => {
    if (initialData) {
      const start = new Date(initialData.startDate + "T00:00:00");
      const end = initialData.endDate
        ? new Date(initialData.endDate + "T00:00:00")
        : null;

      reset({
        company: initialData.company,
        role: initialData.role,
        location: initialData.location || "",
        startDate: start,
        endDate: end,
        current: initialData.current,
        description: initialData.description || "",
      });
    } else {
      reset({
        company: "",
        role: "",
        location: "",
        startDate: new Date(),
        endDate: null,
        current: false,
        description: "",
      });
    }
  }, [initialData, reset]);

  // AQUÍ ES DONDE GARANTIZAMOS EL CONTRATO CON EL BACKEND
  const handleFormSubmit = (data: ExperienceSchemaType) => {
    const payload: ExperienceCreateRequest = {
      company: data.company,
      role: data.role,
      location: data.location || null,
      // Transformación Date -> String
      startDate: formatDate(data.startDate) || "",
      endDate: data.current ? null : formatDate(data.endDate),
      current: data.current,
      description: data.description || null,
    };
    onSubmit(payload);
  };

  const inputBaseClass =
    "w-full p-3 rounded-xl bg-black/40 border text-white focus:ring-1 outline-none transition-all placeholder-gray-600";
  const errorInputClass =
    "border-red-500/50 focus:border-red-500 focus:ring-red-500/20";
  const normalInputClass =
    "border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20";

  const getInputClass = (hasError: boolean) =>
    `${inputBaseClass} ${hasError ? errorInputClass : normalInputClass}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative"
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Briefcase className="text-cyan-400" />
          {initialData ? "Editar Experiencia" : "Nueva Experiencia"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        {/* EMPRESA Y ROL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
              <span className="flex items-center gap-2">
                <Building2 size={14} /> Empresa
              </span>
            </label>
            <input
              {...register("company")}
              className={getInputClass(!!errors.company)}
              placeholder="Ej: Google Inc."
            />
            {errors.company && (
              <span className="text-red-400 text-xs mt-1 ml-1">
                • {errors.company.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
              <span className="flex items-center gap-2">
                <Briefcase size={14} /> Cargo / Rol
              </span>
            </label>
            <input
              {...register("role")}
              className={getInputClass(!!errors.role)}
              placeholder="Ej: Senior Frontend Dev"
            />
            {errors.role && (
              <span className="text-red-400 text-xs mt-1 ml-1">
                • {errors.role.message}
              </span>
            )}
          </div>
        </div>

        {/* UBICACIÓN */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
            <span className="flex items-center gap-2">
              <MapPin size={14} /> Ubicación (Opcional)
            </span>
          </label>
          <input
            {...register("location")}
            className={getInputClass(!!errors.location)}
            placeholder="Ej: Remoto, San Francisco, etc."
          />
        </div>

        {/* --- FECHAS CON DATEPICKER --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {/* Fecha Inicio */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
              <span className="flex items-center gap-2">
                <Calendar size={14} /> Fecha Inicio
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
                  className={getInputClass(!!errors.startDate)}
                  placeholderText="Selecciona fecha"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              )}
            />
            {errors.startDate && (
              <span className="text-red-400 text-xs mt-1 ml-1">
                • {errors.startDate.message}
              </span>
            )}
          </div>

          {/* Fecha Fin */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-400 ml-1">
                Fecha Fin
              </label>
              <label className="flex items-center gap-2 text-xs text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors">
                <input
                  type="checkbox"
                  {...register("current")}
                  className="accent-cyan-500 w-3 h-3 rounded"
                />
                Trabajo aquí actualmente
              </label>
            </div>

            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  // CORRECCIÓN 2: Tipado explícito aquí
                  onChange={(date: Date | null) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  disabled={isCurrentJob}
                  className={`${getInputClass(
                    !!errors.endDate
                  )} disabled:opacity-30 disabled:cursor-not-allowed`}
                  placeholderText={
                    isCurrentJob ? "Actualidad" : "Selecciona fecha"
                  }
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  isClearable={!isCurrentJob}
                />
              )}
            />

            {errors.endDate && !isCurrentJob && (
              <span className="text-red-400 text-xs mt-1 ml-1">
                • {errors.endDate.message}
              </span>
            )}
          </div>
        </div>

        {/* DESCRIPCIÓN */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
            Responsabilidades / Logros
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className={`${getInputClass(!!errors.description)} resize-none`}
            placeholder="Describe tus funciones principales..."
          />
          {errors.description && (
            <span className="text-red-400 text-xs mt-1 ml-1">
              • {errors.description.message}
            </span>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
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
