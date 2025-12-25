import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, X, Globe, Link as LinkIcon, Hash } from "lucide-react";
import { motion } from "framer-motion";

import {
  socialLinkSchema,
  type SocialLinkSchemaType,
} from "../../../../types/schemas/SocialLinkSchema";
import type { SocialLinkFormProps } from "../../../../types/ui/SocialLinkUI";
import type { SocialLinkCreateRequest } from "../../../../types/models/socialLink";

export const SocialLinkForm = ({
  initialData,
  isLoading,
  onSubmit,
  onCancel,
}: SocialLinkFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      platform: "",
      url: "",
      sortOrder: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        platform: initialData.platform,
        url: initialData.url,
        sortOrder: initialData.sortOrder,
      });
    } else {
      reset({
        platform: "",
        url: "",
        sortOrder: 0,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: any) => {
    const formData = data as SocialLinkSchemaType;

    const payload: SocialLinkCreateRequest = {
      platform: formData.platform,
      url: formData.url,
      sortOrder: Number(formData.sortOrder),
    };
    onSubmit(payload);
  };

  // Clases CSS
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
      className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe className="text-cyan-400" />
          {initialData ? "Editar Red Social" : "Nueva Red Social"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        {/* PLATAFORMA */}
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <Globe size={14} /> Plataforma / Nombre
            </span>
          </label>
          <input
            {...register("platform")}
            className={inputClass(!!errors.platform)}
            placeholder="Ej: LinkedIn, GitHub, Twitter"
          />
          {errors.platform && (
            <span className="text-red-400 text-xs ml-1">
              {errors.platform.message as string}
            </span>
          )}
        </div>

        {/* URL */}
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <LinkIcon size={14} /> Enlace (URL)
            </span>
          </label>
          <input
            {...register("url")}
            className={inputClass(!!errors.url)}
            placeholder="https://linkedin.com/in/tu-perfil"
          />
          {errors.url && (
            <span className="text-red-400 text-xs ml-1">
              {errors.url.message as string}
            </span>
          )}
        </div>

        {/* ORDEN */}
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <Hash size={14} /> Orden de visualización
            </span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              {...register("sortOrder", { valueAsNumber: true })}
              className={`w-24 text-center ${inputClass(!!errors.sortOrder)}`}
            />
            <span className="text-xs text-gray-500">
              (Menor número aparece primero)
            </span>
          </div>
          {errors.sortOrder && (
            <span className="text-red-400 text-xs ml-1">
              {errors.sortOrder.message as string}
            </span>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-6">
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
