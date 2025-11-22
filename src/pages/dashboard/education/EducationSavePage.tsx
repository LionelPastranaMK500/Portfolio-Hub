// src/pages/dashboard/education/EducationSavePage.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateEducation,
  useUpdateEducation,
  useMyEducation,
  type EducationCreateRequest,
} from "../../../services/educationService";
import { toast } from "react-toastify";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";

export default function EducationSavePage() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();

  // Buscamos en la caché para editar
  const { data: educationList } = useMyEducation();
  const eduToEdit = educationList?.find((e) => e.id === Number(id));

  const { mutate: createEdu, isPending: isCreating } = useCreateEducation();
  const { mutate: updateEdu, isPending: isUpdating } = useUpdateEducation();
  const isSaving = isCreating || isUpdating;

  // Tipado auxiliar para el formulario (incluimos 'current' aunque no vaya al backend)
  type EducationFormValues = EducationCreateRequest & { current?: boolean };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EducationFormValues>();

  const isCurrent = watch("current");

  useEffect(() => {
    if (isEditing && eduToEdit) {
      reset({
        institution: eduToEdit.institution,
        degree: eduToEdit.degree,
        field: eduToEdit.field || "",
        startDate: eduToEdit.startDate,
        endDate: eduToEdit.endDate || "",
        // Si no tiene fecha fin, asumimos que es actual
        current: !eduToEdit.endDate,
        description: eduToEdit.description || "",
      });
    }
  }, [isEditing, eduToEdit, reset]);

  // Si marcan "Actual", limpiamos la fecha de fin
  useEffect(() => {
    if (isCurrent) {
      setValue("endDate", null);
    }
  }, [isCurrent, setValue]);

  const onSubmit = (data: EducationFormValues) => {
    // Limpiamos el campo 'current' antes de enviar, ya que la API no lo espera en el DTO
    // Y aseguramos que endDate sea null si es actual
    const { current, ...apiData } = data;
    const payload = { ...apiData, endDate: current ? null : data.endDate };

    if (isEditing) {
      updateEdu(
        { id: Number(id), ...payload },
        {
          onSuccess: () => {
            toast.success("Educación actualizada");
            navigate("/dashboard/education");
          },
        }
      );
    } else {
      createEdu(payload, {
        onSuccess: () => {
          toast.success("Educación añadida");
          navigate("/dashboard/education");
        },
      });
    }
  };

  const inputClass =
    "w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-cyan-500 mb-6 transition-colors"
      >
        <FaArrowLeft /> Volver
      </button>

      <h1 className="text-3xl font-bold font-maven mb-8 text-gray-800 dark:text-white">
        {isEditing ? "Editar Educación" : "Añadir Educación"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/50 dark:bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 space-y-6"
      >
        <div>
          <label className={labelClass}>Institución *</label>
          <input
            {...register("institution", { required: "Campo obligatorio" })}
            className={inputClass}
            placeholder="Universidad Nacional..."
          />
          {errors.institution && (
            <span className="text-red-500 text-sm">
              {errors.institution.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Título / Grado *</label>
            <input
              {...register("degree", { required: "Campo obligatorio" })}
              className={inputClass}
              placeholder="Bachiller, Máster..."
            />
            {errors.degree && (
              <span className="text-red-500 text-sm">
                {errors.degree.message}
              </span>
            )}
          </div>
          <div>
            <label className={labelClass}>Campo de Estudio</label>
            <input
              {...register("field")}
              className={inputClass}
              placeholder="Ingeniería de Software..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Fecha Inicio *</label>
            <input
              type="date"
              {...register("startDate", { required: "Obligatorio" })}
              className={inputClass}
            />
            {errors.startDate && (
              <span className="text-red-500 text-sm">
                {errors.startDate.message}
              </span>
            )}
          </div>
          <div>
            <label className={labelClass}>Fecha Fin</label>
            <input
              type="date"
              {...register("endDate")}
              className={inputClass}
              disabled={isCurrent}
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300 font-medium">
            <input
              type="checkbox"
              {...register("current")}
              className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
            />
            Estudio aquí actualmente
          </label>
        </div>

        <div>
          <label className={labelClass}>Descripción</label>
          <textarea
            {...register("description")}
            className={`${inputClass} h-32 resize-none`}
            placeholder="Logros académicos, tesis, actividades..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all disabled:opacity-50"
          >
            {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {isSaving ? "Guardando..." : "Guardar Educación"}
          </button>
        </div>
      </form>
    </div>
  );
}
