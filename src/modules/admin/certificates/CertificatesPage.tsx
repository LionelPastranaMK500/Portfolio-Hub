import { useState } from "react";
import { toast } from "sonner";
import { Award, Plus, Edit2, Trash2, Loader2, AlertCircle } from "lucide-react";
import { useCertificates } from "../../../hooks/useCertificates";
import { useUpload } from "../../../hooks/useUpload";
import type {
  CertificateDto,
  CertificateCreateRequest,
} from "../../../types/models/certificate";
import { CertificateModal } from "./components/CertificateModal";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";

export default function CertificatesPage() {
  const {
    certificates,
    isLoading,
    isError,
    createCertificate,
    updateCertificate,
    deleteCertificate,
    isCreating,
    isUpdating,
  } = useCertificates();

  const { uploadCertificateFile, isUploadingCertificate } = useUpload();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificateDto | null>(null);

  const handleOpenCreate = () => {
    setEditingCert(null);
    setIsModalOpen(true);
  };
  const handleOpenEdit = (cert: CertificateDto) => {
    setEditingCert(cert);
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setEditingCert(null);
  };
  const handleDelete = async (id: number) => {
    if (window.confirm("¿Eliminar este certificado?")) {
      try {
        await deleteCertificate(id);
        toast.success("Eliminado");
      } catch (e) {
        toast.error("Error al eliminar");
      }
    }
  };

  const handleSubmitForm = async (data: CertificateCreateRequest) => {
    const promise = editingCert
      ? updateCertificate({ ...data, id: editingCert.id })
      : createCertificate(data);

    toast.promise(promise, {
      loading: editingCert ? "Actualizando..." : "Creando...",
      success: () => {
        handleClose();
        return editingCert ? "Certificado actualizado" : "Certificado creado";
      },
      error: "Error al guardar",
    });
  };

  // 3. HANDLER DE SUBIDA
  const handleUploadFile = async (file: File) => {
    if (!editingCert) return;

    if (file.size > 5 * 1024 * 1024) {
      // 5MB Limit
      toast.error("El archivo es muy pesado (Máx 5MB)");
      return;
    }

    toast.promise(
      uploadCertificateFile({ certificateId: editingCert.id, file }),
      {
        loading: "Subiendo diploma...",
        success: "¡Diploma subido exitosamente!",
        error: "Error al subir el archivo",
      }
    );
  };

  const isFormLoading = isCreating || isUpdating;

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center text-cyan-500">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  if (isError)
    return (
      <div className="p-6 bg-red-500/10 text-red-400 rounded-xl flex gap-3">
        <AlertCircle /> Error al cargar certificados.
      </div>
    );

  return (
    <div className="space-y-6">
      {/* ... Header igual ... */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-maven text-white flex items-center gap-3">
            <Award className="text-cyan-400" size={32} /> Certificados
          </h1>
          <p className="text-gray-400 mt-1">Gestiona tus logros y diplomas.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-all hover:scale-105 active:scale-95 font-medium shadow-lg backdrop-blur-md"
        >
          <Plus size={20} /> Nuevo Certificado
        </button>
      </div>

      {/* GRID ACTUALIZADO CON IMAGENES */}
      {certificates.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
          <Award size={48} className="mx-auto text-gray-600 mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-gray-300">
            No hay certificados aún
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <GlassTiltCard
              key={cert.id}
              className="border-white/10 bg-black/40 flex flex-col justify-between group h-full relative overflow-hidden"
            >
              {/* IMAGEN DEL CERTIFICADO (NUEVO) */}
              <div className="h-40 bg-gray-800 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                {cert.imageUrl ? (
                  <img
                    src={cert.imageUrl}
                    alt={cert.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <Award size={48} className="text-gray-600 opacity-50" />
                )}
              </div>

              <div className="p-5 relative z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  {/* ... */}
                  <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
                    {cert.name}
                  </h3>

                  <div className="flex gap-1 min-w-fit">
                    <button
                      onClick={() => handleOpenEdit(cert)}
                      className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-400 line-clamp-3 mb-2">
                  {cert.description}
                </p>

                {/* ID / Vinculado */}
                <div className="mt-auto pt-2 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
                  <span>ID: {cert.id}</span>
                  {cert.educationId && (
                    <span className="text-cyan-500/60">Vinculado</span>
                  )}
                </div>
              </div>
            </GlassTiltCard>
          ))}
        </div>
      )}

      {/* MODAL CON PROPS DE SUBIDA */}
      <CertificateModal
        isOpen={isModalOpen}
        initialData={editingCert}
        isLoading={isFormLoading}
        onSubmit={handleSubmitForm}
        onClose={handleClose}
        onUploadFile={handleUploadFile}
        isUploadingFile={isUploadingCertificate}
      />
    </div>
  );
}
