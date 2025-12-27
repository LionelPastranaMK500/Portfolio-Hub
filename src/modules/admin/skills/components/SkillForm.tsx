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

  // --- Lógica de Búsqueda Global ---
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: suggestions = [], isLoading: isSearching } =
    useGlobalSkillSearch(searchTerm);

  const currentLevel = watch("level");
  const currentIcon = watch("icon");
  const currentName = watch("name");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentName && currentName !== initialData?.name) {
        setSearchTerm(currentName);
      } else {
        setSearchTerm("");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [currentName, initialData]);

  // Reset del formulario al editar
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

  // Al seleccionar una sugerencia, solo copiamos los datos al form.
  // No enviamos IDs ocultos ni nada raro, porque el DTO del backend no lo pide.
  const handleSelectSuggestion = (skill: GlobalSkillDto) => {
    setValue("name", skill.name);
    if (skill.iconUrl) {
      setValue("icon", skill.iconUrl);
    }
    setShowSuggestions(false);
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
          <Zap className="text-yellow-400" />
          {initialData ? "Editar Habilidad" : "Nueva Habilidad"}
        </h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-white">
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
            {/* Visualizador de Icono: Muestra lo que hay en el form (por URL o carga) */}
            <IconUploader
              currentUrl={currentIcon || initialData?.icon || undefined}
              isLoading={!!isUploadingIcon}
              onFileSelect={(f) => onUploadIcon && onUploadIcon(f)}
            />
          </div>

          <div className="flex-1 space-y-3 relative">
            {/* INPUT NOMBRE + AUTOCOMPLETE */}
            <div className="relative group">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Nombre
              </label>

              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-500 pointer-events-none">
                  {isSearching ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Search size={16} />
                  )}
                </div>

                <input
                  {...register("name")}
                  onFocus={() =>
                    searchTerm.length >= 2 && setShowSuggestions(true)
                  }
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  className={inputClass(!!errors.name)}
                  placeholder="Ej: React, Java"
                />
              </div>

              {/* DROPDOWN DE SUGERENCIAS */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute z-50 w-full mt-1 bg-gray-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-48 overflow-y-auto"
                  >
                    <div className="px-3 py-2 text-[10px] text-gray-500 uppercase tracking-wider font-bold bg-gray-900/50 sticky top-0 backdrop-blur-sm">
                      Sugerencias Globales
                    </div>
                    {suggestions.map((skill) => (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => handleSelectSuggestion(skill)}
                        className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-center gap-3 transition-colors border-b border-white/5 last:border-0"
                      >
                        {skill.iconUrl ? (
                          <img
                            src={skill.iconUrl}
                            alt=""
                            className="w-5 h-5 object-contain"
                          />
                        ) : (
                          <Globe size={16} className="text-gray-500" />
                        )}
                        <span className="text-sm text-gray-200">
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

            {/* ORDEN */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                <span className="flex gap-1 items-center">
                  <Hash size={10} /> Orden
                </span>
              </label>
              <input
                type="number"
                {...register("sortOrder", { valueAsNumber: true })}
                className={`w-full p-3 rounded-xl bg-black/40 border text-white focus:ring-1 outline-none transition-all placeholder-gray-600 ${
                  errors.sortOrder
                    ? "border-red-500/50"
                    : "border-white/10 focus:border-cyan-500/50"
                }`}
              />
            </div>
          </div>
        </div>

        {/* SLIDER NIVEL */}
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
        </div>

        {/* BOTONES */}
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
