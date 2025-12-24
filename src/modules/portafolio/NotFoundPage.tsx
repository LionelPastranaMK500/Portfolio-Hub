import { Link } from "react-router-dom";
import { FaGhost, FaHome } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.2}
        className="mb-8"
      >
        <div className="relative p-10 bg-white/5 border border-white/10 rounded-full shadow-2xl backdrop-blur-sm">
          <FaGhost className="h-32 w-32 text-cyan-300 opacity-80 animate-pulse" />
        </div>
      </Tilt>

      <h1 className="font-maven text-6xl font-bold text-white mb-2">404</h1>
      <h2 className="font-maven text-2xl text-gray-300 mb-6">
        ¡Ups! Página no encontrada
      </h2>
      <p className="text-gray-400 max-w-md mb-8">
        Parece que te has perdido en el espacio. La página que buscas no existe
        o ha sido movida a otra dimensión.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 rounded-lg font-maven font-semibold 
                   bg-gradient-to-r from-cyan-600 to-blue-600 text-white 
                   hover:from-cyan-500 hover:to-blue-500 
                   transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <FaHome />
        Volver al Inicio
      </Link>
    </div>
  );
}
