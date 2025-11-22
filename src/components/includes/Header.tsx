// src/components/includes/Header.tsx
import { Link, useLocation } from "react-router-dom"; // 1. Importamos useLocation
import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../services/auth/authStore";

import { IoMoon, IoSunny } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { FaCode, FaUserPlus } from "react-icons/fa"; // 2. Añadimos icono para registro

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation(); // 3. Obtenemos la ruta actual

  // 4. Lógica para decidir qué botón mostrar
  const renderAuthButton = () => {
    // A. Si está logueado -> Ir al Dashboard
    if (isAuthenticated) {
      return (
        <Link
          to="/dashboard/profile"
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-maven font-semibold bg-white/20 hover:bg-white/30 transition-all duration-300 ease-in-out hover:scale-105"
        >
          <MdDashboard className="h-5 w-5" />
          <span>Mi Panel</span>
        </Link>
      );
    }

    // B. Si estamos en la página de LOGIN -> Mostrar botón de REGISTRO
    if (location.pathname === "/login") {
      return (
        <Link
          to="/register"
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-maven font-semibold bg-green-600 hover:bg-green-500 transition-all duration-300 ease-in-out hover:scale-105"
        >
          <FaUserPlus className="h-5 w-5" />
          <span>Crear Cuenta</span>
        </Link>
      );
    }

    // C. Si estamos en REGISTRO u otra página -> Mostrar botón de LOGIN
    // (Ocultamos el botón si estamos en /register para no ser redundantes,
    // o mostramos Login para alternar. Aquí alternamos).
    return (
      <Link
        to="/login"
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-maven font-semibold bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 ease-in-out hover:scale-105"
      >
        <FiLogIn className="h-5 w-5" />
        <span>Login</span>
      </Link>
    );
  };

  return (
    <header className="flex justify-between items-center p-4 md:p-6 bg-white/10 backdrop-blur-md sticky top-0 z-20 dark:bg-gray-900/80 transition-colors duration-300">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 group transition-all duration-300 ease-in-out hover:scale-105"
      >
        <FaCode className="h-10 w-10 p-2 bg-white/10 rounded-full text-cyan-300 group-hover:text-green-300 transition-colors" />
        <span className="font-maven text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-green-300">
          Portfolio Hub
        </span>
      </Link>

      {/* Acciones */}
      <nav className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/20 dark:bg-gray-800 hover:bg-white/30 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:scale-110 active:scale-90"
          aria-label="Alternar modo oscuro"
        >
          {theme === "light" ? (
            <IoMoon className="h-5 w-5" />
          ) : (
            <IoSunny className="h-5 w-5" />
          )}
        </button>

        {/* Renderizamos el botón dinámico */}
        {renderAuthButton()}
      </nav>
    </header>
  );
}
