// src/components/layout/Sidebar.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../services/auth/authStore";

// --- NUEVOS ICONOS DE REACT-ICONS ---
import {
  FaUser,
  FaSuitcase,
  FaGraduationCap,
  FaLink,
  FaAward,
} from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi2";
import { IoSparkles } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
// ---

export function Sidebar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
     ${
       isActive
         ? "bg-white/20 text-cyan-300"
         : "text-gray-300 hover:text-white hover:bg-white/10"
     }`;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sticky top-16 z-30 hidden h-[calc(100vh-64px)] w-full shrink-0 overflow-y-auto border-r border-white/10 bg-gray-900/10 backdrop-blur-md md:block">
      <div className="h-full py-6 pl-8 pr-6 lg:py-8">
        <nav className="flex flex-col gap-1 font-maven">
          <span className="mb-2 text-xs font-semibold uppercase text-gray-400">
            Editar Portafolio
          </span>

          <NavLink to="/dashboard/profile" className={navLinkClass}>
            <FaUser className="h-4 w-4" />
            Mi Perfil
          </NavLink>
          <NavLink to="/dashboard/experience" className={navLinkClass}>
            <FaSuitcase className="h-4 w-4" />
            Experiencia
          </NavLink>
          <NavLink to="/dashboard/education" className={navLinkClass}>
            <FaGraduationCap className="h-4 w-4" />
            Educación
          </NavLink>
          <NavLink to="/dashboard/projects" className={navLinkClass}>
            <HiDocumentText className="h-4 w-4" />
            Proyectos
          </NavLink>
          <NavLink to="/dashboard/skills" className={navLinkClass}>
            <IoSparkles className="h-4 w-4" />
            Habilidades
          </NavLink>
          <NavLink to="/dashboard/socials" className={navLinkClass}>
            <FaLink className="h-4 w-4" />
            Redes Sociales
          </NavLink>
          <NavLink to="/dashboard/certificates" className={navLinkClass}>
            <FaAward className="h-4 w-4" />
            Certificados
          </NavLink>

          <span className="mt-4 mb-2 text-xs font-semibold uppercase text-gray-400">
            Cuenta
          </span>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-all duration-200 hover:text-red-400 hover:bg-white/10"
          >
            <FiLogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </aside>
  );
}
