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

// Utilidad de conversión (Misma que en Experience)
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

  // Carga de datos iniciales
  useEffect(() => {
    if (initialData) {
      // Transformación String (Back) -> Date (Front)
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
    } else {
      reset({
        institution: "",
        degree: "",
        field: "",
        startDate: new Date(),
        endDate: null,
        description: "",
      });
    }
  }, [initialData, reset]);

  // ADAPTADOR: Front (Date) -> Back (String)
  const handleFormSubmit = (data: EducationSchemaType) => {
    const payload: EducationCreateRequest = {
      institution: data.institution,
      degree: data.degree,
      field: data.field || null,
      startDate: formatDate(data.startDate) || "", // Obligatorio
      endDate: formatDate(data.endDate), // Opcional (null)
      description: data.description || null,
    };
    onSubmit(payload);
  };

  // Clases CSS
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
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <GraduationCap className="text-cyan-400" />
          {initialData ? "Editar Formación" : "Nueva Formación"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        {/* FILA 1: INSTITUCIÓN y GRADO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
              <span className="flex items-center gap-2">
                <Building size={14} /> Institución
              </span>
            </label>
            <input
              {...register("institution")}
              className={getInputClass(!!errors.institution)}
              placeholder="Ej: Universidad Nacional"
            />
            {errors.institution && (
              <span className="text-red-400 text-xs mt-1 ml-1">
                • {errors.institution.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
              <span className="flex items-center gap-2">
                <GraduationCap size={14} /> Título / Grado
              </span>
            </label>
            <input
              {...register("degree")}
              className={getInputClass(!!errors.degree)}
              placeholder="Ej: Ingeniería de Sistemas"
            />
            {errors.degree && (
              <span className="text-red-400 text-xs mt-1 ml-1">
                • {errors.degree.message}
              </span>
            )}
          </div>
        </div>

        {/* FILA 2: CAMPO DE ESTUDIO y FECHAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Campo (Field) */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
              Campo de Estudio (Opcional)
            </label>
            <input
              {...register("field")}
              className={getInputClass(!!errors.field)}
              placeholder="Ej: Software"
            />
          </div>

          {/* Fecha Inicio */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
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
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
              Fin (Vacío si actual)
            </label>
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date: Date | null) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  className={getInputClass(!!errors.endDate)}
                  placeholderText="Selecciona fecha"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  isClearable // Permite limpiar la fecha
                />
              )}
            />
            {errors.endDate && (
              <span className="text-red-400 text-xs mt-1 ml-1">
                • {errors.endDate.message}
              </span>
            )}
          </div>
        </div>

        {/* DESCRIPCIÓN */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
            Descripción / Logros
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className={`${getInputClass(!!errors.description)} resize-none`}
            placeholder="Detalles relevantes, honores, etc..."
          />
          {errors.description && (
            <span className="text-red-400 text-xs mt-1 ml-1">
              • {errors.description.message}
            </span>
          )}
        </div>

        {/* FOOTER ACTIONS */}
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
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg shadow-cyan-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
