// src/pages/dashboard/projects/ProjectListPage.tsx
import { Link } from "react-router-dom";
import {
  useMyProjects,
  useDeleteProject,
} from "../../../services/projectService";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaGithub,
  FaEye,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function ProjectListPage() {
  const { data: projects, isLoading } = useMyProjects();
  const { mutate: deleteProject } = useDeleteProject();

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este proyecto?")) {
      deleteProject(id, {
        onSuccess: () => toast.success("Proyecto eliminado"),
        onError: (e) => toast.error(e.message),
      });
    }
  };

  if (isLoading)
    return (
      <div className="p-10 flex justify-center">
        <FaSpinner className="animate-spin h-8 w-8 text-cyan-500" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-maven text-gray-800 dark:text-white">
            Mis Proyectos
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestiona y organiza tu trabajo.
          </p>
        </div>
        <Link
          to="/dashboard/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all font-semibold shadow-lg hover:shadow-cyan-500/20"
        >
          <FaPlus /> Nuevo Proyecto
        </Link>
      </div>

      {/* Grid de Proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
          >
            {/* Imagen o Placeholder */}
            <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-sm">Sin imagen</span>
                </div>
              )}
              {/* Badge destacado */}
              {project.featured && (
                <span className="absolute top-2 right-2 px-2 py-1 bg-yellow-500/90 text-white text-xs font-bold rounded shadow-sm">
                  ★ Destacado
                </span>
              )}
            </div>

            {/* Contenido */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
                {project.summary}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                {project.repoUrl && <FaGithub title="Repositorio" />}
                {project.liveUrl && <FaEye title="Demo en vivo" />}
              </div>

              {/* Acciones */}
              <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <Link
                  to={`/dashboard/projects/edit/${project.id}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                  <FaEdit /> Editar
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects?.length === 0 && (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500">
            Aún no tienes proyectos. ¡Agrega el primero!
          </p>
        </div>
      )}
    </div>
  );
}
