// src/pages/dashboard/experience/ExperienceSavePage.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateExperience,
  useUpdateExperience,
  useMyExperience,
  type ExperienceCreateRequest,
} from "../../../services/experienceService";
import { toast } from "react-toastify";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";

export default function ExperienceSavePage() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();

  // En lugar de hacer una llamada a la API para UNO solo (que no creamos en el servicio),
  // buscamos en la lista cacheada (más eficiente para listas pequeñas).
  const { data: experiences } = useMyExperience();
  const experienceToEdit = experiences?.find((e) => e.id === Number(id));

  const { mutate: createExp, isPending: isCreating } = useCreateExperience();
  const { mutate: updateExp, isPending: isUpdating } = useUpdateExperience();
  const isSaving = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ExperienceCreateRequest>();

  // Vigilar el checkbox "current" para deshabilitar fecha fin
  const isCurrent = watch("current");

  useEffect(() => {
    if (isEditing && experienceToEdit) {
      reset({
        company: experienceToEdit.company,
        role: experienceToEdit.role,
        location: experienceToEdit.location || "",
        startDate: experienceToEdit.startDate,
        endDate: experienceToEdit.endDate || "",
        current: experienceToEdit.current,
        description: experienceToEdit.description || "",
      });
    }
  }, [isEditing, experienceToEdit, reset]);

  // Si marcan "Actual", limpiamos la fecha de fin
  useEffect(() => {
    if (isCurrent) {
      setValue("endDate", null);
    }
  }, [isCurrent, setValue]);

  const onSubmit = (data: ExperienceCreateRequest) => {
    // Pequeña limpieza: si es current, endDate debe ser null (la API lo espera así o vacío)
    const payload = { ...data, endDate: data.current ? null : data.endDate };

    if (isEditing) {
      updateExp(
        { id: Number(id), ...payload },
        {
          onSuccess: () => {
            toast.success("Experiencia actualizada");
            navigate("/dashboard/experience");
          },
        }
      );
    } else {
      createExp(payload, {
        onSuccess: () => {
          toast.success("Experiencia añadida");
          navigate("/dashboard/experience");
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
        {isEditing ? "Editar Experiencia" : "Nueva Experiencia"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/50 dark:bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Empresa *</label>
            <input
              {...register("company", { required: "Campo obligatorio" })}
              className={inputClass}
              placeholder="Google, Amazon..."
            />
            {errors.company && (
              <span className="text-red-500 text-sm">
                {errors.company.message}
              </span>
            )}
          </div>
          <div>
            <label className={labelClass}>Cargo / Rol *</label>
            <input
              {...register("role", { required: "Campo obligatorio" })}
              className={inputClass}
              placeholder="Senior Developer..."
            />
            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className={labelClass}>Ubicación</label>
          <input
            {...register("location")}
            className={inputClass}
            placeholder="Madrid, España (o Remoto)"
          />
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
            Trabajo actualmente aquí
          </label>
        </div>

        <div>
          <label className={labelClass}>Descripción</label>
          <textarea
            {...register("description")}
            className={`${inputClass} h-32 resize-none`}
            placeholder="Responsabilidades, logros..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all disabled:opacity-50"
          >
            {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {isSaving ? "Guardando..." : "Guardar Experiencia"}
          </button>
        </div>
      </form>
    </div>
  );
}
