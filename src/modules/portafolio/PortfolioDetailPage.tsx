import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, WifiOff, LayoutGrid } from "lucide-react";

// HOOKS
import { usePublicPortfolioBySlug } from "../../hooks/usePublicPortfolio";
import { Loader } from "../../components/shared/Loader";

// SUB-COMPONENTES MODULARES
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileBio } from "./components/ProfileBio";
import { ProfileSkills } from "./components/ProfileSkills";
import { ProfileProjects } from "./components/ProfileProjects";
import { ProfileTimeline } from "./components/ProfileTimeline";

export const PortfolioDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: profile, isLoading, isError } = usePublicPortfolioBySlug(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#030712] gap-4">
        <Loader />
        <p className="text-cyan-500/50 text-sm font-bold uppercase tracking-[0.3em] animate-pulse">
          Cargando Universo
        </p>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white gap-6 bg-[#030712]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
          <WifiOff size={80} className="text-red-500 relative z-10" />
        </motion.div>
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black font-maven tracking-tighter">
            PERFIL NO ENCONTRADO
          </h2>
          <p className="text-gray-500">
            El portafolio que buscas no existe o ha sido movido.
          </p>
        </div>
        <Link to="/home">
          <button className="group mt-4 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all flex items-center gap-2">
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Volver al Hub
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-cyan-500/30">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 min-h-screen w-full px-4 py-12 md:px-8 md:py-20 max-w-7xl mx-auto">
        {/* TOP NAV BAR */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/home">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white backdrop-blur-md transition-all shadow-lg"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">
                Regresar
              </span>
            </motion.button>
          </Link>

          <div className="flex items-center gap-2 text-gray-500">
            <LayoutGrid size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Portfolio Hub v2
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* PERFIL (Izquierda Sticky) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24 space-y-6"
          >
            <ProfileHeader profile={profile} />
          </motion.div>

          {/* CONTENIDO PRINCIPAL */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 xl:col-span-9 space-y-12" // Mayor separación entre secciones
          >
            <ProfileBio bio={profile.bio} />

            <section id="skills" className="scroll-mt-24">
              <ProfileSkills categories={profile.skillCategories} />
            </section>

            <section id="projects" className="scroll-mt-24">
              <ProfileProjects
                projects={profile.projects}
                profileSlug={profile.slug}
              />
            </section>

            <section id="timeline" className="scroll-mt-24">
              <ProfileTimeline
                experiences={profile.experiences}
                education={profile.education}
                certificates={profile.certificates}
              />
            </section>

            {/* FOOTER PÚBLICO CENTRADO */}
            <footer className="pt-20 pb-10 border-t border-white/5 flex flex-col items-center justify-center">
              <p className="text-gray-600 text-xs font-medium uppercase tracking-[0.3em] text-center">
                Desarrollado con{" "}
                <span className="text-cyan-500 font-bold">Portfolio Hub</span>{" "}
                &copy; 2026
              </p>
              <div className="mt-4 flex gap-4 opacity-20">
                <div className="w-1 h-1 rounded-full bg-white" />
                <div className="w-1 h-1 rounded-full bg-white" />
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>
            </footer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailPage;
