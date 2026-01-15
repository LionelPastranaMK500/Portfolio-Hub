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
import { getDriveDirectLink } from "../../../../utils/driveHelper";

interface ExtendedCertificateFormProps extends CertificateFormProps {
  onUploadFile?: (file: File) => void;
  isUploadingFile?: boolean;
}

export const CertificateForm = ({
  initialData,
  isLoading,
  onSubmit,
  onCancel,
  onUploadFile,
  isUploadingFile,
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

  const inputClass = (hasError: boolean) =>
    `w-full p-3 rounded-xl bg-black/40 border text-white focus:ring-1 outline-none transition-all placeholder-gray-600 ${
      hasError
        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
        : "border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl relative flex flex-col max-h-[90vh]"
    >
      {/* HEADER FIJO */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-gray-900 rounded-t-2xl z-20">
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

      {/* CONTENIDO CON SCROLL PROPIO */}
      <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
        <form
          id="certificate-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <div className="mb-2">
            {initialData?.id ? (
              <CertificateUploader
                currentUrl={getDriveDirectLink(initialData.imageUrl)}
                isLoading={!!isUploadingFile}
                onFileSelect={(file) => onUploadFile && onUploadFile(file)}
              />
            ) : (
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3 text-yellow-200/80 text-sm">
                <AlertTriangle size={18} className="shrink-0" />
                <span>
                  Guarda el certificado primero para subir el diploma.
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
              Nombre del Certificado
            </label>
            <input
              {...register("name")}
              className={inputClass(!!errors.name)}
              placeholder="Ej: AWS Certified Cloud Practitioner"
            />
            {errors.name && (
              <span className="text-red-400 text-xs mt-1 ml-1">
                • {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
              Entidad Emisora / Descripción
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className={`${inputClass(!!errors.description)} resize-none`}
              placeholder="Ej: Amazon Web Services (AWS)..."
            />
            {errors.description && (
              <span className="text-red-400 text-xs mt-1 ml-1">
                • {errors.description.message}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* FOOTER FIJO */}
      <div className="flex justify-end gap-3 p-6 border-t border-white/5 bg-gray-900 rounded-b-2xl z-20">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          Cancelar
        </button>

        <button
          form="certificate-form"
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
    </motion.div>
  );
};
