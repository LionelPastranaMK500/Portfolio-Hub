import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, X, Zap, Hash, Search, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  skillSchema,
  type SkillSchemaType,
} from "../../../../types/schemas/SkillSchemas";
import type { SkillFormProps } from "../../../../types/ui/SkillUI";
import type {
  SkillCreateRequest,
  GlobalSkillDto,
} from "../../../../types/models/skill";
import { IconUploader } from "../../../../components/ui/IconUploader";
import { useGlobalSkillSearch } from "../../../../hooks/useSkills";
import { getDriveDirectLink } from "../../../../utils/driveHelper";

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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: "", level: 50, icon: "", sortOrder: 0 },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Observamos el nombre en tiempo real
  const currentName = watch("name");
  const currentLevel = watch("level");
  const currentIcon = watch("icon");

  // Hook de búsqueda (react-query)
  const { data: suggestions = [], isLoading: isSearching } =
    useGlobalSkillSearch(searchTerm);

  // EFECTO DE AUTOCOMPLETADO EN TIEMPO REAL
  useEffect(() => {
    // Si el usuario escribe, actualizamos el término de búsqueda
    // y abrimos el panel de sugerencias automáticamente
    if (
      currentName &&
      currentName.length >= 2 &&
      currentName !== initialData?.name
    ) {
      setSearchTerm(currentName);
      setShowSuggestions(true);
    } else {
      setSearchTerm("");
      setShowSuggestions(false);
    }
  }, [currentName, initialData]);

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

  const handleSelectSuggestion = (skill: GlobalSkillDto) => {
    // Usamos el valor exacto de la sugerencia
    setValue("name", skill.name, { shouldValidate: true });
    if (skill.iconUrl) {
      setValue("icon", skill.iconUrl);
    }
    // Cerramos explícitamente las sugerencias al elegir una
    setShowSuggestions(false);
    setSearchTerm("");
  };

  const handleFormSubmit = (data: any) => {
    const formData = data as SkillSchemaType;
    const payload: SkillCreateRequest = {
      name: formData.name.trim().toUpperCase(),
      level: Number(formData.level),
      icon: formData.icon || initialData?.icon || null,
      sortOrder: Number(formData.sortOrder),
    };
    onSubmit(payload);
  };

  const inputClass = (hasError: boolean) =>
    `w-full p-3 pl-10 rounded-xl bg-black/40 border text-white focus:ring-1 outline-none transition-all placeholder-gray-600 ${
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
          <Zap className="text-yellow-400" size={20} />
          {initialData ? "Editar Habilidad" : "Nueva Habilidad"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-5"
        autoComplete="off"
      >
        <div className="flex gap-4 items-start">
          <div className="shrink-0">
            <IconUploader
              currentUrl={getDriveDirectLink(currentIcon || initialData?.icon)}
              isLoading={!!isUploadingIcon}
              onFileSelect={(f) => onUploadIcon && onUploadIcon(f)}
            />
          </div>

          <div className="flex-1 space-y-3 relative">
            <div className="relative">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Nombre de Habilidad
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3.5 text-gray-500">
                  {isSearching ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Search size={16} />
                  )}
                </div>
                <input
                  {...register("name")}
                  className={inputClass(!!errors.name)}
                  placeholder="Ej: React, Java..."
                  // Ya no necesitamos onFocus complejo, el useEffect maneja la lógica
                />
              </div>

              {/* LISTA DE SUGERENCIAS FLOTANTE */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute z-[100] w-full mt-2 bg-gray-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-48 overflow-y-auto"
                  >
                    <div className="px-3 py-2 text-[10px] text-cyan-400 uppercase tracking-widest font-bold bg-black/40 sticky top-0 backdrop-blur-md">
                      Habilidades Sugeridas
                    </div>
                    {suggestions.map((skill) => (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => handleSelectSuggestion(skill)}
                        className="w-full text-left px-4 py-3 hover:bg-cyan-500/10 flex items-center gap-3 transition-colors border-b border-white/5 last:border-0 group/item"
                      >
                        {skill.iconUrl ? (
                          <img
                            src={getDriveDirectLink(skill.iconUrl)}
                            alt=""
                            className="w-5 h-5 object-contain opacity-70 group-hover/item:opacity-100"
                          />
                        ) : (
                          <Globe size={16} className="text-gray-500" />
                        )}
                        <span className="text-sm text-gray-200 group-hover/item:text-white font-medium">
                          {skill.name}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {errors.name && (
                <span className="text-red-400 text-xs ml-1">
                  {errors.name.message as string}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center gap-1">
                <Hash size={12} /> Prioridad (Orden)
              </label>
              <input
                type="number"
                {...register("sortOrder", { valueAsNumber: true })}
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 bg-white/5 p-4 rounded-xl border border-white/5">
          <div className="flex justify-between mb-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Nivel de Dominio
            </label>
            <span className="text-cyan-400 font-black">{currentLevel}%</span>
          </div>
          <input
            type="range"
            {...register("level", { valueAsNumber: true })}
            min="0"
            max="100"
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-cyan-900/20 disabled:opacity-50"
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
