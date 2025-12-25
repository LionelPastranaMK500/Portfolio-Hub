import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  LayoutDashboard,
  GraduationCap,
  FolderOpen,
  Sparkles,
  Share2,
  Award,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

import { TkohLogo } from "../../modules/landing/components/TkohLogo";

export function Sidebar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { theme, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group overflow-hidden",
      isActive
        ? "text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
    );

  return (
    <aside className="hidden md:flex flex-col w-72 h-screen shrink-0 border-r border-white/10 bg-black/40 backdrop-blur-xl fixed left-0 top-0 z-40">
      {/* 1. BRANDING */}
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <div className="scale-75 origin-left">
          <TkohLogo />
        </div>
        <span className="font-maven font-bold text-gray-200 tracking-wide mt-1">
          Studio
        </span>
      </div>

      {/* 2. NAVEGACIÓN */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
        <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
          Tu Portafolio
        </div>

        <nav className="space-y-2">
          {/* INICIO */}
          <NavLink to="/dashboard" end className={getNavLinkClass}>
            <LayoutDashboard size={18} /> Inicio
          </NavLink>

          {/* PERFIL */}
          <NavLink to="/dashboard/profile" className={getNavLinkClass}>
            <User size={18} /> Editar Perfil
          </NavLink>

          {/* PROYECTOS */}
          <NavLink to="/dashboard/projects" className={getNavLinkClass}>
            <FolderOpen size={18} /> Proyectos
          </NavLink>

          {/* SKILLS */}
          <NavLink to="/dashboard/skills" className={getNavLinkClass}>
            <Sparkles size={18} /> Habilidades
          </NavLink>

          {/* EXPERIENCIA */}
          <NavLink to="/dashboard/experience" className={getNavLinkClass}>
            <Briefcase size={18} /> Experiencia
          </NavLink>

          {/* EDUCACIÓN */}
          <NavLink to="/dashboard/education" className={getNavLinkClass}>
            <GraduationCap size={18} /> Educación
          </NavLink>

          {/* CERTIFICADOS */}
          <NavLink to="/dashboard/certificates" className={getNavLinkClass}>
            <Award size={18} /> Certificados
          </NavLink>

          {/* SOCIAL (Corregido: '/social' en singular) */}
          <NavLink to="/dashboard/social" className={getNavLinkClass}>
            <Share2 size={18} /> Redes Sociales
          </NavLink>
        </nav>
      </div>

      {/* 3. FOOTER (TEMA + LOGOUT) */}
      <div className="p-4 border-t border-white/5 bg-black/20 space-y-2">
        <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
          Configuración
        </div>

        {/* BOTÓN CAMBIO DE TEMA */}
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-400 hover:text-white hover:bg-white/5 border border-transparent transition-all duration-300"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -10, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 10, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </motion.div>
            </AnimatePresence>
          </div>
          <span>{theme === "light" ? "Modo Oscuro" : "Modo Claro"}</span>
        </button>

        {/* BOTÓN LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all duration-300 group"
        >
          <LogOut
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
