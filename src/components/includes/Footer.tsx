// src/components/layout/Footer.tsx
import { FaGithub, FaLinkedin } from "react-icons/fa"; // <-- Corregido: importando desde react-icons

export function Footer() {
  return (
    // Estilo adaptado de tu proyecto curso-tailwind
    <footer className="w-full p-8 bg-white/10 dark:bg-gray-900/80 backdrop-blur-md mt-auto border-t border-white/10 dark:border-gray-700/50 font-maven">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Columna 1: Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-maven text-lg font-bold">Portfolio Hub</span>
          <p className="text-gray-300 dark:text-gray-400 mt-2 text-sm">
            © {new Date().getFullYear()} Creado con Spring Boot & React.
            <br />
            Todos los derechos reservados.
          </p>
        </div>

        {/* Columna 2: Espacio (o puedes añadir enlaces) */}
        <div></div>

        {/* Columna 3: Redes Sociales */}
        <div>
          <h5 className="text-lg font-semibold text-white mb-3">Conecta</h5>
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https" // TODO: Cambia este enlace
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-300 hover:text-cyan-300 transition-all duration-300 hover:scale-125"
            >
              {/* --- Corregido --- */}
              <FaGithub className="h-6 w-6" />
            </a>
            <a
              href="https" // TODO: Cambia este enlace
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-300 hover:text-cyan-300 transition-all duration-300 hover:scale-125"
            >
              {/* --- Corregido --- */}
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
