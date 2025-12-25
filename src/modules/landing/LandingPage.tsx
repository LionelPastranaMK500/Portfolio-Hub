import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  Code2,
  Rocket,
  Scale, // Legal
  Palette, // Diseño
  Stethoscope, // Salud
  Gavel, // Derecho (Agregado para completar simetría)
  Briefcase, // Negocios
  Music, // Música
} from "lucide-react";
import { GlassTiltCard } from "../../components/ui/GlassTiltCard";
import { Bubble3D } from "../../components/ui/Bubble3D";
import { EnterButton } from "./components/EnterButton";
import { TkohLogo } from "./components/TkohLogo";

export const LandingPage = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="relative flex flex-col items-center justify-center flex-grow w-full px-4 py-12 md:py-20 min-h-screen overflow-hidden">
      {/* --- ZONA DE BURBUJAS LATERALES ---
       */}
      <div className="absolute inset-0 pointer-events-none hidden xl:block">
        {/* === COLUMNA IZQUIERDA === */}
        {/* 1. Diseño (Arriba) */}
        <div className="absolute top-[20%] left-[2%] pointer-events-auto opacity-70 hover:opacity-100 transition-opacity">
          <Bubble3D icon={<Palette />} label="Diseño" delay={0} size="md" />
        </div>

        {/* 2. Legal (Centro) */}
        <div className="absolute top-[50%] left-[2%] -translate-y-1/2 pointer-events-auto opacity-60 hover:opacity-100 transition-opacity">
          <Bubble3D icon={<Scale />} label="Legal" delay={2} size="sm" />
        </div>

        {/* 3. Salud (Abajo) */}
        <div className="absolute bottom-[20%] left-[2%] pointer-events-auto opacity-70 hover:opacity-100 transition-opacity">
          <Bubble3D
            icon={<Stethoscope />}
            label="Salud"
            delay={1.5}
            size="md"
          />
        </div>

        {/* === COLUMNA DERECHA === */}
        {/* 4. Derecho/Justicia (Arriba) */}
        <div className="absolute top-[20%] right-[2%] pointer-events-auto opacity-70 hover:opacity-100 transition-opacity">
          <Bubble3D icon={<Gavel />} label="Justicia" delay={1} size="md" />
        </div>

        {/* 5. Negocios (Centro) */}
        <div className="absolute top-[50%] right-[2%] -translate-y-1/2 pointer-events-auto opacity-60 hover:opacity-100 transition-opacity">
          <Bubble3D icon={<Briefcase />} label="Negocios" delay={3} size="sm" />
        </div>

        {/* 6. Música/Arte (Abajo) */}
        <div className="absolute bottom-[20%] right-[2%] pointer-events-auto opacity-70 hover:opacity-100 transition-opacity">
          <Bubble3D icon={<Music />} label="Arte" delay={2.5} size="md" />
        </div>
      </div>

      {/* --- CONTENIDO PRINCIPAL (TU TARJETA ORIGINAL) ---
       */}
      <div className="w-full max-w-4xl mx-auto z-10">
        <GlassTiltCard className="flex flex-col items-center text-center py-16 px-6 md:px-12 border-white/20 bg-black/40">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-8"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="relative group">
              <TkohLogo />
              <div className="absolute inset-0 bg-white/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* Texto */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 drop-shadow-sm">
                STUDIOS TKOH!
              </h1>
              <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-300 font-light tracking-wide">
                Donde el código se encuentra con la creatividad.
                <br />
                <span className="text-white/60 text-sm font-mono mt-2 block">
                  // Forging Digital Futures
                </span>
              </p>
            </motion.div>

            {/* Iconos del Core */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 justify-center py-4 border-t border-white/10 w-full max-w-md"
            >
              <FeatureIcon icon={<Code2 />} label="Clean Code" />
              <FeatureIcon icon={<Rocket />} label="Performance" />
              <FeatureIcon icon={<Sparkles />} label="UX/UI" />
            </motion.div>

            {/* Botón */}
            <motion.div variants={itemVariants} className="pt-4">
              <EnterButton />
            </motion.div>
          </motion.div>
        </GlassTiltCard>
      </div>
    </section>
  );
};

// Componente auxiliar FeatureIcon (Igual que antes)
const FeatureIcon = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group">
    <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
      {icon}
    </div>
    <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70 group-hover:opacity-100">
      {label}
    </span>
  </div>
);
