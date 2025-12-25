import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, X, Award, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import {
  certificateSchema,
  type CertificateSchemaType,
} from "../../../../types/schemas/CertificateSchema";
import type { CertificateFormProps } from "../../../../types/ui/CertificateFormProps";
import type { CertificateCreateRequest } from "../../../../types/models/certificate";
import { CertificateUploader } from "../../../../components/ui/CertificateUploader";

interface ExtendedCertificateFormProps extends CertificateFormProps {
  onUploadFile?: (file: File) => void;
  isUploadingFile?: boolean;
}

export const CertificateForm = ({
  initialData,
  isLoading,
  onSubmit,
  onCancel,
  onUploadFile, // Nuevo
  isUploadingFile, // Nuevo
}: ExtendedCertificateFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CertificateSchemaType>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      name: "",
      description: "",
      educationId: null,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description || "",
        educationId: initialData.educationId,
      });
    } else {
      reset({ name: "", description: "", educationId: null });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: CertificateSchemaType) => {
    const payload: CertificateCreateRequest = {
      name: data.name,
      description: data.description ?? null,
      educationId: data.educationId ?? null,
    };
    onSubmit(payload);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
    >
      {/* HEADER DEL FORM */}
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4 sticky top-0 bg-gray-900 z-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="text-cyan-400" />
          {initialData ? "Editar Certificado" : "Nuevo Certificado"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* --- SECCIÓN UPLOAD (SOLO EDICIÓN) --- */}
        <div className="mb-6">
          {initialData?.id ? (
            <CertificateUploader
              currentUrl={initialData.imageUrl} // Usamos imageUrl del DTO
              isLoading={!!isUploadingFile}
              onFileSelect={(file) => onUploadFile && onUploadFile(file)}
            />
          ) : (
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3 text-yellow-200/80 text-sm">
              <AlertTriangle size={18} className="shrink-0" />
              <span>
                Guarda el certificado primero para poder subir la imagen del
                diploma.
              </span>
            </div>
          )}
        </div>

        {/* CAMPO: NOMBRE */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
            Nombre del Certificado
          </label>
          <input
            {...register("name")}
            className={`w-full p-3 rounded-xl bg-black/40 border text-white focus:ring-1 outline-none transition-all placeholder-gray-600
              ${
                errors.name
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20"
              }`}
            placeholder="Ej: AWS Certified Cloud Practitioner"
          />
          {errors.name && (
            <span className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
              • {errors.name.message}
            </span>
          )}
        </div>

        {/* CAMPO: DESCRIPCIÓN */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
            Entidad Emisora / Descripción
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className={`w-full p-3 rounded-xl bg-black/40 border text-white focus:ring-1 outline-none transition-all placeholder-gray-600 resize-none
              ${
                errors.description
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20"
              }`}
            placeholder="Ej: Amazon Web Services (AWS)..."
          />
          {errors.description && (
            <span className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
              • {errors.description.message}
            </span>
          )}
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-6 sticky bottom-0 bg-gray-900 z-10">
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
