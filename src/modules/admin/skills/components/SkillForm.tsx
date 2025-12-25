import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, X, Zap, Hash, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

import {
  skillSchema,
  type SkillSchemaType,
} from "../../../../types/schemas/SkillSchemas";
import type { SkillFormProps } from "../../../../types/ui/SkillUI";
import type { SkillCreateRequest } from "../../../../types/models/skill";
import { IconUploader } from "../../../../components/ui/IconUploader";

interface ExtendedSkillFormProps extends SkillFormProps {
  onUploadIcon?: (file: File) => void;
  isUploadingIcon?: boolean;
}

export const SkillForm = ({
  initialData,
  initialSortOrder = 0,
  isLoading,
  onSubmit,
  onCancel,
  onUploadIcon,
  isUploadingIcon,
}: ExtendedSkillFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: "", level: 50, icon: "", sortOrder: 0 },
  });

  const currentLevel = watch("level");

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        level: initialData.level,
        icon: initialData.icon || "",
        sortOrder: initialSortOrder,
      });
    } else {
      reset({ name: "", level: 50, icon: "", sortOrder: 0 });
    }
  }, [initialData, initialSortOrder, reset]);

  const handleFormSubmit = (data: any) => {
    const formData = data as SkillSchemaType;
    const payload: SkillCreateRequest = {
      name: formData.name,
      level: Number(formData.level),
      icon: initialData?.icon || formData.icon || null,
      sortOrder: Number(formData.sortOrder),
    };
    onSubmit(payload);
  };

  const inputClass = (hasError: boolean) =>
    `w-full p-3 rounded-xl bg-black/40 border text-white focus:ring-1 outline-none transition-all placeholder-gray-600 ${
      hasError
        ? "border-red-500/50 focus:border-red-500"
        : "border-white/10 focus:border-cyan-500/50"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Zap className="text-yellow-400" />
          {initialData ? "Editar Habilidad" : "Nueva Habilidad"}
        </h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <div className="flex gap-4 items-start">
          <div className="shrink-0">
            {initialData?.id ? (
              <IconUploader
                currentUrl={initialData.icon}
                isLoading={!!isUploadingIcon}
                onFileSelect={(f) => onUploadIcon && onUploadIcon(f)}
              />
            ) : (
              // Placeholder visual cuando se crea
              <div className="w-20 h-20 rounded-xl bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center text-gray-500 gap-1 text-[10px] text-center p-1">
                <AlertTriangle size={18} />
                <span>Guarda para subir icono</span>
              </div>
            )}
          </div>

          {/* CAMPOS DE TEXTO */}
          <div className="flex-1 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Nombre
              </label>
              <input
                {...register("name")}
                className={inputClass(!!errors.name)}
                placeholder="Ej: React, Java"
              />
              {errors.name && (
                <span className="text-red-400 text-xs ml-1">
                  {errors.name.message as string}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                <span className="flex gap-1 items-center">
                  <Hash size={10} /> Orden
                </span>
              </label>
              <input
                type="number"
                {...register("sortOrder", { valueAsNumber: true })}
                className={inputClass(!!errors.sortOrder)}
              />
            </div>
          </div>
        </div>

        {/* NIVEL (SLIDER) */}
        <div className="pt-2">
          <div className="flex justify-between mb-2">
            <label className="block text-sm font-medium text-gray-400">
              Nivel de Dominio
            </label>
            <span className="text-cyan-400 font-bold text-sm">
              {currentLevel}%
            </span>
          </div>
          <input
            type="range"
            {...register("level", { valueAsNumber: true })}
            min="0"
            max="100"
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          {errors.level && (
            <span className="text-red-400 text-xs ml-1">
              {errors.level.message as string}
            </span>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            Guardar
          </button>
        </div>
      </form>
    </motion.div>
  );
};
