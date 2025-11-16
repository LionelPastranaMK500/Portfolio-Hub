// src/components/layout/Header.tsx
import { Link } from "react-router-dom";
import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../services/auth/authStore";

// --- NUEVOS ICONOS DE REACT-ICONS ---
import { IoMoon, IoSunny } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { FaCode } from "react-icons/fa";
// ---

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className="flex justify-between items-center p-4 md:p-6 bg-white/10 backdrop-blur-md sticky top-0 z-20 dark:bg-gray-900/80 transition-colors duration-300">
      {/* 1. Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 group transition-all duration-300 ease-in-out hover:scale-105"
      >
        {/* Usamos FaCode */}
        <FaCode className="h-10 w-10 p-2 bg-white/10 rounded-full text-cyan-300 group-hover:text-green-300 transition-colors" />
        <span className="font-maven text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-green-300">
          Portfolio Hub
        </span>
      </Link>

      {/* 2. Acciones (Tema y Autenticación) */}
      <nav className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/20 dark:bg-gray-800 hover:bg-white/30 dark:hover:bg-gray-700
                     transition-all duration-300 ease-in-out 
                     hover:scale-110 active:scale-90"
          aria-label="Alternar modo oscuro"
        >
          {/* Usamos IoMoon y IoSunny */}
          {theme === "light" ? (
            <IoMoon className="h-5 w-5" />
          ) : (
            <IoSunny className="h-5 w-5" />
          )}
        </button>

        {isAuthenticated ? (
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-maven font-semibold bg-white/20 hover:bg-white/30 transition-all duration-300 ease-in-out hover:scale-105"
          >
            {/* Usamos MdDashboard */}
            <MdDashboard className="h-5 w-5" />
            <span>Mi Panel</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-maven font-semibold bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 ease-in-out hover:scale-105"
          >
            {/* Usamos FiLogIn */}
            <FiLogIn className="h-5 w-5" />
            <span>Login</span>
          </Link>
        )}
      </nav>
    </header>
  );
}
