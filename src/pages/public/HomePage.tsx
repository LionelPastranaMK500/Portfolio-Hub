// src/pages/public/HomePage.tsx
import { Link } from "react-router-dom";
import { usePublicPortfolios } from "../../services/publicPortfolioService";
import type { PortfolioPublicDto } from "../../types/portfolio";
import { FaSpinner, FaExclamationTriangle, FaUser } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import { SEO } from "../../components/common/SEO";

/**
 * Componente Tarjeta para mostrar un resumen del portafolio.
 * Reutiliza los estilos de 'backdrop-blur' del resto de la app.
 */
function PortfolioCard({ portfolio }: { portfolio: PortfolioPublicDto }) {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={true}
      glareMaxOpacity={0.05}
      glareBorderRadius="1rem"
    >
      <Link
        // Esta es la ruta pública que definimos en la API
        to={`/portfolios/${portfolio.slug}`}
        className="block p-6 rounded-2xl bg-white/10 border border-gray-700/50 backdrop-blur-lg shadow-xl
                   transition-all duration-300 ease-in-out
                   hover:scale-105 hover:border-cyan-400/50 hover:shadow-cyan-500/10"
      >
        {/* --- Avatar --- */}
        <div
          className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden 
                     bg-gray-700/50 border-2 border-cyan-400 
                     flex items-center justify-center shadow-inner"
        >
          {portfolio.avatarUrl ? (
            <img
              src={portfolio.avatarUrl}
              alt={portfolio.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            // Icono placeholder si no hay avatar
            <FaUser className="w-12 h-12 text-gray-400" />
          )}
        </div>

        {/* --- Información --- */}
        <div className="text-center">
          <h3 className="text-xl font-bold font-maven text-white truncate">
            {portfolio.fullName}
          </h3>
          <p className="text-sm text-gray-300 font-maven h-10 line-clamp-2">
            {portfolio.headline}
          </p>
        </div>
      </Link>
    </Tilt>
  );
}

/**
 * Página Principal (Landing Page)
 * Muestra el grid de portafolios públicos.
 */
export default function HomePage() {
  // 1. Llama al hook de React Query para obtener los datos
  const { data: portfolios, isLoading, isError, error } = usePublicPortfolios();

  // 2. Estado de Carga
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <FaSpinner className="h-12 w-12 text-cyan-300 animate-spin" />
      </div>
    );
  }

  // 3. Estado de Error
  if (isError) {
    return (
      <div className="flex justify-center items-center h-96">
        <div
          className="flex flex-col items-center justify-center 
                       text-red-300 bg-red-500/20 
                       max-w-lg mx-auto p-6 rounded-lg border border-red-400"
        >
          <FaExclamationTriangle className="h-12 w-12 mb-4" />
          <h2 className="text-xl font-bold mb-2">
            Error al cargar portafolios
          </h2>
          <p className="text-center">
            {(error as Error)?.message || "Ocurrió un error inesperado."}
          </p>
        </div>
      </div>
    );
  }

  // 4. Estado Exitoso (Success)
  return (
    <>
      <SEO
        title="Inicio"
        description="Explora los mejores portafolios de desarrolladores en Portfolio Hub."
      />
      <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
        {/* --- Título de la Sección --- */}
        <h1
          className="text-4xl md:text-5xl font-bold text-center mb-4 font-maven text-white"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
        >
          Explora los Portafolios
        </h1>
        <p className="text-xl text-center text-cyan-200 mb-16 font-maven">
          Descubre el talento y los proyectos de nuestra comunidad.
        </p>

        {/* --- Grid de Portafolios --- */}
        {portfolios && portfolios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {portfolios.map((portfolio) => (
              <PortfolioCard key={portfolio.slug} portfolio={portfolio} />
            ))}
          </div>
        ) : (
          // Mensaje si la API no devuelve portafolios
          <p className="text-center text-gray-300 text-lg">
            Aún no hay portafolios públicos disponibles. ¡Vuelve pronto!
          </p>
        )}
      </section>
    </>
  );
}
