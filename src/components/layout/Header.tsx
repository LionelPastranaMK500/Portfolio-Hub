import { Link, useLocation } from "react-router-dom";
import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { motion, AnimatePresence } from "framer-motion"; // Importamos AnimatePresence

import { Sun, Moon, LayoutGrid, LogIn, Code2, UserPlus } from "lucide-react";

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  const renderAuthButton = () => {
    // ... (El código de los botones se mantiene igual que la versión Platinum) ...
    // Para no repetir todo el bloque, solo pongo la lógica de renderAuthButton resumida aquí
    // COPIA TU LÓGICA DE BOTONES PLATINUM AQUÍ SI LA TIENES, O ÚSALOS DIRECTO
    if (isAuthenticated) {
      return (
        <Link to="/dashboard/profile">
          <motion.div
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm text-gray-200 border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          >
            <LayoutGrid
              size={18}
              className="text-gray-400 group-hover:text-white transition-colors duration-300"
            />
            <span className="group-hover:text-white transition-colors duration-300">
              Mi Panel
            </span>
          </motion.div>
        </Link>
      );
    }

    if (location.pathname === "/login") {
      return (
        <Link to="/register">
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm text-white border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/40"
          >
            <UserPlus size={16} className="text-gray-200" />
            <span>Crear Cuenta</span>
          </motion.div>
        </Link>
      );
    }

    return (
      <Link to="/login">
        <motion.div
          whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-2 rounded-full font-medium text-sm text-gray-300 border border-white/10 bg-transparent hover:bg-white/5 hover:text-white transition-all"
        >
          <LogIn size={16} />
          <span>Acceder</span>
        </motion.div>
      </Link>
    );
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 border-b border-white/5 backdrop-blur-md bg-white/[0.02]"
    >
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      {/* Logo */}
      <Link to="/" className="relative z-10 flex items-center gap-3 group">
        <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
          <Code2 className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
        </div>
        <div className="flex flex-col">
          <span className="font-maven font-bold text-lg text-gray-200 tracking-wide group-hover:text-white transition-colors duration-300 drop-shadow-sm">
            Portfolio Hub
          </span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest hidden md:block group-hover:text-gray-300 transition-colors">
            Studios TKOH!
          </span>
        </div>
      </Link>

      {/* Acciones */}
      <nav className="relative z-10 flex items-center gap-4">
        {/* --- TOGGLE THEME ANIMADO --- */}
        <button
          onClick={toggleTheme}
          className="relative p-2.5 rounded-full bg-transparent hover:bg-white/10 border border-transparent hover:border-white/20 text-gray-400 hover:text-white transition-colors duration-300 overflow-hidden"
          aria-label="Alternar tema"
        >
          {/* Usamos AnimatePresence para animar la salida y entrada */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </motion.div>
          </AnimatePresence>
        </button>

        {renderAuthButton()}
      </nav>
    </motion.header>
  );
}
