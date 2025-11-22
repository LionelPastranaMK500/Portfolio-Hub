// src/pages/public/ProjectDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { usePublicProjectDetail } from "../../services/publicPortfolioService";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaArrowLeft,
  FaSpinner,
  FaExclamationTriangle,
  FaCode,
} from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import { SEO } from "../../components/common/SEO";

export default function ProjectDetailPage() {
  const { profileSlug, projectSlug } = useParams<{
    profileSlug: string;
    projectSlug: string;
  }>();

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = usePublicProjectDetail(profileSlug!, projectSlug!);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="h-16 w-16 text-cyan-300 animate-spin" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <div className="max-w-lg w-full bg-red-500/20 border border-red-400 text-red-200 p-8 rounded-xl text-center backdrop-blur-md">
          <FaExclamationTriangle className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-2 font-maven">
            Proyecto no encontrado
          </h2>
          <p className="mb-6">
            {(error as Error)?.message ||
              "No pudimos cargar los detalles del proyecto."}
          </p>
          <Link
            to={`/portfolios/${profileSlug}`}
            className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors font-semibold"
          >
            <FaArrowLeft /> Volver al Portafolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title={project.title} description={project.summary} type="article" />
      <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
        {/* --- Botón Volver --- */}
        <Link
          to={`/portfolios/${profileSlug}`}
          className="inline-flex items-center gap-2 text-cyan-300 hover:text-white mb-8 transition-colors font-maven font-medium"
        >
          <FaArrowLeft /> Volver al perfil
        </Link>

        {/* --- Encabezado del Proyecto --- */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-maven mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* --- Imagen de Portada (Con efecto Tilt) --- */}
        {project.coverImage && (
          <Tilt
            tiltMaxAngleX={2}
            tiltMaxAngleY={2}
            glareEnable={true}
            glareMaxOpacity={0.1}
            className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50"
          >
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-auto max-h-[500px] object-cover object-center"
            />
          </Tilt>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* --- Columna Izquierda: Contenido Principal --- */}
          <div className="lg:col-span-2 space-y-10">
            {/* Descripción Completa */}
            <section>
              <h2 className="text-2xl font-bold text-white font-maven mb-4 border-b border-gray-700 pb-2">
                Sobre el Proyecto
              </h2>
              <div className="text-gray-300 leading-loose whitespace-pre-wrap text-lg">
                {project.description || "Sin descripción detallada disponible."}
              </div>
            </section>
          </div>

          {/* --- Columna Derecha: Metadatos y Enlaces --- */}
          <div className="space-y-8">
            {/* Panel de Detalles */}
            <div className="bg-white/5 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white font-maven mb-6">
                Información
              </h3>

              {/* Fechas */}
              <div className="flex items-center gap-3 text-gray-300 mb-4">
                <FaCalendarAlt className="text-cyan-400" />
                <span>
                  {project.startDate
                    ? new Date(project.startDate).getFullYear()
                    : "N/A"}
                  {" - "}
                  {project.endDate
                    ? new Date(project.endDate).getFullYear()
                    : "Presente"}
                </span>
              </div>

              {/* Enlaces de Acción */}
              <div className="flex flex-col gap-3 mt-8">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold transition-all transform hover:scale-105"
                  >
                    <FaExternalLinkAlt /> Ver Demo en Vivo
                  </a>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-all border border-gray-600"
                  >
                    <FaGithub /> Ver Código
                  </a>
                )}
              </div>
            </div>

            {/* Tecnologías (Skills) */}
            {project.skills && project.skills.length > 0 && (
              <div className="bg-white/5 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white font-maven mb-4 flex items-center gap-2">
                  <FaCode className="text-purple-400" /> Tecnologías
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm border border-purple-500/30"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
