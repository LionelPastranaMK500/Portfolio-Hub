// src/pages/dashboard/certificates/CertificateSavePage.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateCertificate,
  useUpdateCertificate,
  useMyCertificates,
  type CertificateCreateRequest,
} from "../../../services/certificateService";
import { useMyEducation } from "../../../services/educationService"; // Para el select
import { toast } from "react-toastify";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";

export default function CertificateSavePage() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();

  const { data: certificates } = useMyCertificates();
  const { data: educationList } = useMyEducation();

  const certToEdit = certificates?.find((c) => c.id === Number(id));

  const { mutate: createCert, isPending: isCreating } = useCreateCertificate();
  const { mutate: updateCert, isPending: isUpdating } = useUpdateCertificate();
  const isSaving = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CertificateCreateRequest>();

  useEffect(() => {
    if (isEditing && certToEdit) {
      reset({
        name: certToEdit.name,
        description: certToEdit.description || "",
        educationId: certToEdit.educationId,
      });
    }
  }, [isEditing, certToEdit, reset]);

  const onSubmit = (data: CertificateCreateRequest) => {
    // Convertir educationId a número si viene del select (a veces viene como string)
    const payload = {
      ...data,
      educationId: data.educationId ? Number(data.educationId) : null,
    };

    if (isEditing) {
      updateCert(
        { id: Number(id), ...payload },
        {
          onSuccess: () => {
            toast.success("Certificado actualizado");
            navigate("/dashboard/certificates");
          },
        }
      );
    } else {
      createCert(payload, {
        onSuccess: () => {
          toast.success("Certificado creado");
          navigate("/dashboard/certificates");
        },
      });
    }
  };

  const inputClass =
    "w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all";
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
        {isEditing ? "Editar Certificado" : "Nuevo Certificado"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/50 dark:bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 space-y-6"
      >
        {/* Nombre */}
        <div>
          <label className={labelClass}>Nombre del Certificado *</label>
          <input
            {...register("name", { required: "El nombre es obligatorio" })}
            className={inputClass}
            placeholder="AWS Certified Solutions Architect..."
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Relación con Educación (Opcional) */}
        <div>
          <label className={labelClass}>Asociar a Educación (Opcional)</label>
          <select {...register("educationId")} className={inputClass}>
            <option value="">-- Sin asociación --</option>
            {educationList?.map((edu) => (
              <option key={edu.id} value={edu.id}>
                {edu.degree} en {edu.institution}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Si este certificado pertenece a un grado académico.
          </p>
        </div>

        {/* Descripción */}
        <div>
          <label className={labelClass}>Descripción / Emisor</label>
          <textarea
            {...register("description")}
            className={`${inputClass} h-32 resize-none`}
            placeholder="Emitido por Amazon Web Services en 2023..."
          />
        </div>

        {/* Botón Guardar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all disabled:opacity-50"
          >
            {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {isSaving ? "Guardando..." : "Guardar Certificado"}
          </button>
        </div>
      </form>
    </div>
  );
}
