// src/pages/dashboard/certificates/CertificateListPage.tsx
import { Link } from "react-router-dom";
import {
  useMyCertificates,
  useDeleteCertificate,
} from "../../../services/certificateService";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaAward,
  FaSpinner,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function CertificateListPage() {
  const { data: certificates, isLoading } = useMyCertificates();
  const { mutate: deleteCert } = useDeleteCertificate();

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar este certificado?")) {
      deleteCert(id, {
        onSuccess: () => toast.success("Certificado eliminado"),
        onError: (e) => toast.error(e.message),
      });
    }
  };

  if (isLoading)
    return (
      <div className="p-10 text-center">
        <FaSpinner className="animate-spin inline text-cyan-500 h-8 w-8" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-maven text-gray-800 dark:text-white">
            Certificados
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Diplomas, cursos y reconocimientos.
          </p>
        </div>
        <Link
          to="/dashboard/certificates/new"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          <FaPlus /> Nuevo Certificado
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates?.map((cert) => (
          <div
            key={cert.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex gap-4"
          >
            {/* Miniatura o Icono */}
            <div className="w-16 h-16 shrink-0 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 rounded-lg flex items-center justify-center overflow-hidden">
              {cert.imageUrl ? (
                <img
                  src={cert.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaAward className="h-8 w-8" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                {cert.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                {cert.description}
              </p>

              <div className="flex gap-2">
                {cert.imageUrl && (
                  <a
                    href={cert.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg"
                    title="Ver Archivo"
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
                <Link
                  to={`/dashboard/certificates/edit/${cert.id}`}
                  className="p-2 text-gray-500 hover:text-cyan-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}

        {certificates?.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            No tienes certificados registrados.
          </div>
        )}
      </div>
    </div>
  );
}
