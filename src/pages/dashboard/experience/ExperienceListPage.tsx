// src/pages/dashboard/experience/ExperienceListPage.tsx
import { Link } from "react-router-dom";
import {
  useMyExperience,
  useDeleteExperience,
} from "../../../services/experienceService";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function ExperienceListPage() {
  const { data: experiences, isLoading } = useMyExperience();
  const { mutate: deleteExp } = useDeleteExperience();

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar esta experiencia?")) {
      deleteExp(id, {
        onSuccess: () => toast.success("Experiencia eliminada"),
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
            Experiencia Laboral
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Tu trayectoria profesional.
          </p>
        </div>
        <Link
          to="/dashboard/experience/new"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          <FaPlus /> Nueva Experiencia
        </Link>
      </div>

      <div className="space-y-4">
        {experiences?.map((exp) => (
          <div
            key={exp.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-start gap-4"
          >
            {/* Icono */}
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg shrink-0">
              <FaBriefcase className="h-6 w-6" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {exp.role}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1 mb-3">
                <span className="flex items-center gap-1">
                  <FaBuilding /> {exp.company}
                </span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt /> {exp.location || "Remoto"}
                </span>
                <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-medium">
                  <FaCalendarAlt />
                  {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {exp.description}
              </p>
            </div>

            {/* Acciones */}
            <div className="flex gap-2 shrink-0">
              <Link
                to={`/dashboard/experience/edit/${exp.id}`}
                className="p-2 text-gray-500 hover:text-cyan-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Editar"
              >
                <FaEdit className="h-5 w-5" />
              </Link>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Eliminar"
              >
                <FaTrash className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        {experiences?.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            No has añadido ninguna experiencia aún.
          </div>
        )}
      </div>
    </div>
  );
}
