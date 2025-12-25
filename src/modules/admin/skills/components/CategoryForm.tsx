import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, X, Tag, Hash } from "lucide-react";
import { motion } from "framer-motion";

import {
  categorySchema,
  type CategorySchemaType,
} from "../../../../types/schemas/SkillSchemas";
import type { CategoryFormProps } from "../../../../types/ui/SkillUI";
import type { SkillCategoryCreateRequest } from "../../../../types/models/skillCategory";

export const CategoryForm = ({
  initialData,
  isLoading,
  onSubmit,
  onCancel,
}: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", sortOrder: 0 },
  });

  useEffect(() => {
    if (initialData) {
      reset({ name: initialData.name, sortOrder: initialData.sortOrder });
    } else {
      reset({ name: "", sortOrder: 0 });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: any) => {
    const formData = data as CategorySchemaType;
    const payload: SkillCategoryCreateRequest = {
      name: formData.name,
      sortOrder: formData.sortOrder,
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
          <Tag className="text-cyan-400" />{" "}
          {initialData ? "Editar Categoría" : "Nueva Categoría"}
        </h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Nombre
          </label>
          <input
            {...register("name")}
            className={inputClass(!!errors.name)}
            placeholder="Ej: Frontend"
          />
          {errors.name && (
            <span className="text-red-400 text-xs ml-1">
              {errors.name.message as string}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Orden
          </label>
          <div className="flex items-center gap-2">
            <Hash size={16} className="text-gray-500" />
            <input
              type="number"
              {...register("sortOrder", { valueAsNumber: true })}
              className="w-20 p-2 rounded-lg bg-black/40 border border-white/10 text-white focus:border-cyan-500 outline-none text-center"
            />
          </div>
          {errors.sortOrder && (
            <span className="text-red-400 text-xs ml-1">
              {errors.sortOrder.message as string}
            </span>
          )}
        </div>
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
            className="flex items-center gap-2 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}{" "}
            Guardar
          </button>
        </div>
      </form>
    </motion.div>
  );
};
