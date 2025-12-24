// src/pages/dashboard/education/EducationListPage.tsx
import { Link } from "react-router-dom";
import {
  useMyEducation,
  useDeleteEducation,
} from "../../../services/educationService";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaGraduationCap,
  FaCalendarAlt,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function EducationListPage() {
  const { data: educationList, isLoading } = useMyEducation();
  const { mutate: deleteEdu } = useDeleteEducation();

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar esta formación académica?")) {
      deleteEdu(id, {
        onSuccess: () => toast.success("Educación eliminada"),
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
            Educación
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Tu historial académico y certificaciones.
          </p>
        </div>
        <Link
          to="/dashboard/education/new"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          <FaPlus /> Añadir Educación
        </Link>
      </div>

      <div className="space-y-4">
        {educationList?.map((edu) => (
          <div
            key={edu.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-start gap-4"
          >
            {/* Icono */}
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg shrink-0">
              <FaGraduationCap className="h-6 w-6" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {edu.institution}
              </h3>
              <div className="text-lg font-medium text-cyan-600 dark:text-cyan-400 mb-1">
                {edu.degree} {edu.field ? `en ${edu.field}` : ""}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span className="flex items-center gap-1 font-medium">
                  <FaCalendarAlt />
                  {edu.startDate} - {edu.endDate ? edu.endDate : "Presente"}
                </span>
              </div>

              {edu.description && (
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap text-sm">
                  {edu.description}
                </p>
              )}
            </div>

            {/* Acciones */}
            <div className="flex gap-2 shrink-0">
              <Link
                to={`/dashboard/education/edit/${edu.id}`}
                className="p-2 text-gray-500 hover:text-cyan-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Editar"
              >
                <FaEdit className="h-5 w-5" />
              </Link>
              <button
                onClick={() => handleDelete(edu.id)}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Eliminar"
              >
                <FaTrash className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        {educationList?.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            No has añadido ninguna educación aún.
          </div>
        )}
      </div>
    </div>
  );
}
