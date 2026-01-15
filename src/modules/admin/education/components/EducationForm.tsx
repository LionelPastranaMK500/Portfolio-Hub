import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Save,
  X,
  GraduationCap,
  Calendar,
  Building,
} from "lucide-react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  educationSchema,
  type EducationSchemaType,
} from "../../../../types/schemas/EducationSchema";
import type { EducationFormProps } from "../../../../types/ui/EducationUI";
import type { EducationCreateRequest } from "../../../../types/models/education";

const formatDate = (date: Date | null | undefined): string | null => {
  if (!date) return null;
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
  return adjustedDate.toISOString().split("T")[0];
};

export const EducationForm = ({
  initialData,
  isLoading,
  onSubmit,
  onCancel,
}: EducationFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<EducationSchemaType>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      field: "",
      startDate: new Date(),
      endDate: null,
      description: "",
    },
  });

  const startDate = watch("startDate");

  useEffect(() => {
    if (initialData) {
      const start = new Date(initialData.startDate + "T00:00:00");
      const end = initialData.endDate
        ? new Date(initialData.endDate + "T00:00:00")
        : null;

      reset({
        institution: initialData.institution,
        degree: initialData.degree,
        field: initialData.field || "",
        startDate: start,
        endDate: end,
        description: initialData.description || "",
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: EducationSchemaType) => {
    const payload: EducationCreateRequest = {
      institution: data.institution,
      degree: data.degree,
      field: data.field || null,
      startDate: formatDate(data.startDate) || "",
      endDate: formatDate(data.endDate),
      description: data.description || null,
    };
    onSubmit(payload);
  };

  const inputClass = (hasError: boolean) =>
    `w-full p-3 rounded-xl bg-black/40 border text-white focus:ring-1 outline-none transition-all placeholder-gray-600 ${
      hasError
        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
        : "border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20"
    }`;

  const labelClass =
    "block text-sm font-medium text-gray-400 mb-1 ml-1 flex items-center gap-2";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl relative flex flex-col max-h-[90vh]"
    >
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-gray-900 rounded-t-2xl z-20 shrink-0">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <GraduationCap className="text-cyan-400" />
          {initialData ? "Editar Formación" : "Nueva Formación"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 overflow-y-auto flex-1">
        <form
          id="edu-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                <Building size={14} /> Institución
              </label>
              <input
                {...register("institution")}
                className={inputClass(!!errors.institution)}
                placeholder="Ej: SENATI"
              />
              {errors.institution && (
                <span className="text-red-400 text-[10px] ml-1">
                  • {errors.institution.message}
                </span>
              )}
            </div>
            <div>
              <label className={labelClass}>
                <GraduationCap size={14} /> Título / Grado
              </label>
              <input
                {...register("degree")}
                className={inputClass(!!errors.degree)}
                placeholder="Ej: Profesional Técnico"
              />
              {errors.degree && (
                <span className="text-red-400 text-[10px] ml-1">
                  • {errors.degree.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className={labelClass}>Campo de Estudio (Opcional)</label>
            <input
              {...register("field")}
              className={inputClass(!!errors.field)}
              placeholder="Ej: Ingeniería de Software"
            />
          </div>

          {/* FECHAS - DESPLIEGUE HACIA ARRIBA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                <Calendar size={14} /> Fecha Inicio
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
                    placeholderText="Inicio"
                    showMonthDropdown
                    showYearDropdown
                    popperPlacement="top-start" // CALENDARIO HACIA ARRIBA
                    popperClassName="z-[9999]"
                  />
                )}
              />
            </div>
            <div>
              <label className={labelClass}>
                <Calendar size={14} /> Fecha Fin
              </label>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date: Date | null) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={startDate || undefined} // COHERENCIA
                    className={inputClass(!!errors.endDate)}
                    placeholderText="Fin (Opcional)"
                    showMonthDropdown
                    showYearDropdown
                    isClearable
                    popperPlacement="top-start" // CALENDARIO HACIA ARRIBA
                    popperClassName="z-[9999]"
                  />
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
              Descripción / Logros
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className={`${inputClass(!!errors.description)} resize-none`}
              placeholder="Menciones, promedios, proyectos clave..."
            />
          </div>
        </form>
      </div>

      <div className="flex justify-end gap-3 p-6 border-t border-white/5 bg-gray-900 rounded-b-2xl z-20 shrink-0">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg"
        >
          Cancelar
        </button>
        <button
          form="edu-form"
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg shadow-lg"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          Guardar
        </button>
      </div>
    </motion.div>
  );
};
