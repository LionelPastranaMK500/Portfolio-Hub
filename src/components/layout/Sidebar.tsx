import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";
import { useUIStore } from "../../store/uiStore";
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
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import { TkohLogo } from "../../modules/landing/components/TkohLogo";

export function Sidebar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { theme, toggleTheme } = useThemeStore();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useUIStore();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* BOTÓN BURBUJA FLOTANTE (Móvil - Posicionada Arriba) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-[70] w-12 h-12 bg-cyan-500/20 backdrop-blur-lg text-cyan-400 rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)] flex items-center justify-center active:scale-90 transition-transform"
      >
        <AnimatePresence mode="wait">
          {isSidebarOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Menu size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* SIDEBAR ASIDE */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? 288 : 80,
          x:
            typeof window !== "undefined" &&
            window.innerWidth < 768 &&
            !isSidebarOpen
              ? -300
              : 0,
        }}
        className={cn(
          "flex flex-col h-screen shrink-0 border-r border-white/10 bg-black/60 backdrop-blur-2xl fixed left-0 top-0 z-50 transition-colors duration-300",
          "max-md:w-[280px]"
        )}
      >
        {/* BOTÓN COLAPSADOR (Desktop) */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex absolute -right-3 top-12 z-50 w-6 h-6 bg-cyan-500 text-black rounded-full items-center justify-center border-2 border-black hover:scale-110 transition-transform shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={14} />
          ) : (
            <ChevronRight size={14} />
          )}
        </button>

        {/* 1. BRANDING */}
        <div className="p-6 border-b border-white/5 flex items-center justify-center min-h-[90px]">
          <motion.div
            animate={{ scale: isSidebarOpen ? 1.1 : 0.8 }}
            className="origin-center transition-transform hover:scale-110"
          >
            <TkohLogo />
          </motion.div>
        </div>

        {/* 2. NAVEGACIÓN */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 sidebar-scrollbar overflow-x-hidden">
          {isSidebarOpen && (
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 whitespace-nowrap">
              Tu Portafolio
            </div>
          )}

          <nav className="space-y-2">
            <NavItem
              to="/dashboard"
              icon={<LayoutDashboard size={18} />}
              label="Inicio"
              isOpen={isSidebarOpen}
              onClick={closeSidebar}
              end
            />
            <NavItem
              to="/dashboard/profile"
              icon={<User size={18} />}
              label="Perfil"
              isOpen={isSidebarOpen}
              onClick={closeSidebar}
            />
            <NavItem
              to="/dashboard/projects"
              icon={<FolderOpen size={18} />}
              label="Proyectos"
              isOpen={isSidebarOpen}
              onClick={closeSidebar}
            />
            <NavItem
              to="/dashboard/skills"
              icon={<Sparkles size={18} />}
              label="Habilidades"
              isOpen={isSidebarOpen}
              onClick={closeSidebar}
            />
            <NavItem
              to="/dashboard/experience"
              icon={<Briefcase size={18} />}
              label="Experiencia"
              isOpen={isSidebarOpen}
              onClick={closeSidebar}
            />
            <NavItem
              to="/dashboard/education"
              icon={<GraduationCap size={18} />}
              label="Educación"
              isOpen={isSidebarOpen}
              onClick={closeSidebar}
            />
            <NavItem
              to="/dashboard/certificates"
              icon={<Award size={18} />}
              label="Certificados"
              isOpen={isSidebarOpen}
              onClick={closeSidebar}
            />
            <NavItem
              to="/dashboard/social"
              icon={<Share2 size={18} />}
              label="Social"
              isOpen={isSidebarOpen}
              onClick={closeSidebar}
            />
          </nav>
        </div>

        {/* 3. FOOTER */}
        <div className="p-4 border-t border-white/5 bg-black/20 space-y-2">
          <button
            onClick={toggleTheme}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300",
              !isSidebarOpen && "justify-center px-0"
            )}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            {isSidebarOpen && (
              <span>{theme === "light" ? "Modo Oscuro" : "Modo Claro"}</span>
            )}
          </button>

          <button
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group",
              !isSidebarOpen && "justify-center px-0"
            )}
          >
            <LogOut size={18} />
            {isSidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </motion.aside>

      {/* Overlay para móvil */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({ to, icon, label, isOpen, onClick, end = false }: any) {
  const handleClick = () => {
    if (window.innerWidth < 768) onClick();
  };

  return (
    <NavLink
      to={to}
      end={end}
      onClick={handleClick}
      className={({ isActive }) =>
        cn(
          "relative flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group overflow-hidden",
          isActive
            ? "text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent",
          !isOpen && "justify-center px-0"
        )
      }
    >
      <div className="shrink-0">{icon}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </NavLink>
  );
}
