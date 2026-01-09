import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, WifiOff } from "lucide-react";

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
  // Usamos tu hook original que sí devuelve el objeto 'profile' correcto
  const { data: profile, isLoading, isError } = usePublicPortfolioBySlug(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/90">
        <Loader />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white gap-6 bg-black">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
          <WifiOff size={64} className="text-red-500 relative z-10" />
        </div>
        <h2 className="text-3xl font-bold font-maven">Perfil no encontrado</h2>
        <Link to="/home">
          <button className="mt-4 px-6 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all">
            Volver al Hub
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-4 py-20 md:px-8 md:py-24 max-w-7xl mx-auto">
      {/* BOTÓN VOLVER */}
      <Link to="/home" className="fixed top-8 left-8 z-50 hidden xl:block">
        <motion.button
          whileHover={{ x: -5 }}
          className="p-3 rounded-full bg-black/40 border border-white/10 text-gray-400 hover:text-white backdrop-blur-md transition-colors"
        >
          <ArrowLeft size={20} />
        </motion.button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* IDENTIDAD (Izquierda Sticky) - Aquí se renderiza el ProfileHeader modificado */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          <ProfileHeader profile={profile} />
        </div>

        {/* CONTENIDO (Derecha Scrollable) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          <ProfileBio bio={profile.bio} />

          {/* ARSENAL TECNOLÓGICO */}
          {/* Mantenemos tus props originales: categories */}
          <ProfileSkills categories={profile.skillCategories} />

          {/* Mantenemos tus props originales: projects + profileSlug */}
          <ProfileProjects
            projects={profile.projects}
            profileSlug={profile.slug}
          />

          {/* Mantenemos tus props originales: experiences, education, certificates */}
          <ProfileTimeline
            experiences={profile.experiences}
            education={profile.education}
            certificates={profile.certificates}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailPage;
