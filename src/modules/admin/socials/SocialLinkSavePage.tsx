// src/pages/dashboard/socials/SocialLinkSavePage.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateSocialLink,
  useUpdateSocialLink,
  useMySocialLinks,
  type SocialLinkCreateRequest,
} from "../../../services/socialLink.service";
import { toast } from "react-toastify";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";

export default function SocialLinkSavePage() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();

  const { data: links } = useMySocialLinks();
  const linkToEdit = links?.find((l) => l.id === Number(id));

  const { mutate: createLink, isPending: isCreating } = useCreateSocialLink();
  const { mutate: updateLink, isPending: isUpdating } = useUpdateSocialLink();
  const isSaving = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SocialLinkCreateRequest>();

  useEffect(() => {
    if (isEditing && linkToEdit) {
      reset({
        platform: linkToEdit.platform,
        url: linkToEdit.url,
        sortOrder: linkToEdit.sortOrder,
      });
    }
  }, [isEditing, linkToEdit, reset]);

  const onSubmit = (data: SocialLinkCreateRequest) => {
    if (isEditing) {
      updateLink(
        { id: Number(id), ...data },
        {
          onSuccess: () => {
            toast.success("Enlace actualizado");
            navigate("/dashboard/socials");
          },
        }
      );
    } else {
      createLink(data, {
        onSuccess: () => {
          toast.success("Enlace creado");
          navigate("/dashboard/socials");
        },
      });
    }
  };

  const inputClass =
    "w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-cyan-500 mb-6 transition-colors"
      >
        <FaArrowLeft /> Volver
      </button>

      <h1 className="text-3xl font-bold font-maven mb-8 text-gray-800 dark:text-white">
        {isEditing ? "Editar Enlace" : "Nuevo Enlace"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/50 dark:bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 space-y-6"
      >
        <div>
          <label className={labelClass}>Plataforma *</label>
          <input
            {...register("platform", { required: "Obligatorio" })}
            className={inputClass}
            placeholder="Ej: GitHub, LinkedIn, Twitter..."
            list="platforms" // Sugerencias
          />
          <datalist id="platforms">
            <option value="GitHub" />
            <option value="LinkedIn" />
            <option value="Twitter" />
            <option value="Instagram" />
            <option value="YouTube" />
            <option value="Website" />
          </datalist>
          {errors.platform && (
            <span className="text-red-500 text-sm">
              {errors.platform.message}
            </span>
          )}
        </div>

        <div>
          <label className={labelClass}>URL *</label>
          <input
            {...register("url", {
              required: "Obligatorio",
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Debe ser una URL válida (http/https)",
              },
            })}
            className={inputClass}
            placeholder="https://github.com/tu-usuario"
          />
          {errors.url && (
            <span className="text-red-500 text-sm">{errors.url.message}</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className={labelClass}>Orden</label>
          <input
            type="number"
            {...register("sortOrder", { valueAsNumber: true })}
            className={`${inputClass} w-24`}
            defaultValue={0}
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all disabled:opacity-50"
          >
            {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {isSaving ? "Guardando..." : "Guardar Enlace"}
          </button>
        </div>
      </form>
    </div>
  );
}
