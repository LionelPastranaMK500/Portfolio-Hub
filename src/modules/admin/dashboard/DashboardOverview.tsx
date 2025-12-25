import { useAuthStore } from "../../../store/authStore";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";
import { FolderOpen, Eye, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardOverview = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-8">
      {/* 1. HERO SECTION DE BIENVENIDA */}
      <div className="relative p-8 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-md">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Star size={120} className="text-white" />
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-maven">
            ¡Bienvenido de vuelta, {user?.fullName?.split(" ")[0] || "Lead"}! 🚀
          </h1>
          <p className="text-gray-300 max-w-xl text-lg">
            Tu portafolio está activo. Aquí tienes un resumen rápido de tu
            actividad y acceso directo a tus herramientas.
          </p>

          <div className="mt-6 flex gap-4">
            <Link to="/dashboard/projects">
              <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                Gestionar Proyectos <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. STATS CARDS (Placeholders por ahora) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <GlassTiltCard className="p-6 border-white/10 bg-black/40 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">
                Proyectos
              </p>
              <h3 className="text-3xl font-bold text-white mt-1">0</h3>
            </div>
            <div className="p-2 bg-white/5 rounded-lg text-cyan-400">
              <FolderOpen size={24} />
            </div>
          </div>
        </GlassTiltCard>

        {/* Card 2 */}
        <GlassTiltCard className="p-6 border-white/10 bg-black/40 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">
                Visitas Totales
              </p>
              <h3 className="text-3xl font-bold text-white mt-1">0</h3>
            </div>
            <div className="p-2 bg-white/5 rounded-lg text-emerald-400">
              <Eye size={24} />
            </div>
          </div>
        </GlassTiltCard>

        {/* Card 3 */}
        <GlassTiltCard className="p-6 border-white/10 bg-black/40 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">
                Nivel de Perfil
              </p>
              <h3 className="text-3xl font-bold text-white mt-1">Junior</h3>
            </div>
            <div className="p-2 bg-white/5 rounded-lg text-purple-400">
              <Star size={24} />
            </div>
          </div>
        </GlassTiltCard>
      </div>
    </div>
  );
};

export default DashboardOverview;
