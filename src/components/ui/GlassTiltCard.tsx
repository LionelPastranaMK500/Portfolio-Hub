import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import type { GlassTiltCardProps } from "../../types/ui/GlassTiltCardProps";

export const GlassTiltCard = ({ children, className }: GlassTiltCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{
        y: -12,
        scale: 1.02,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6)",
      }}
      className={cn(
        // BASE
        "relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl shadow-2xl transition-colors duration-300",
        "hover:border-white/50 hover:bg-black/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]",
        className
      )}
    >
      {/* 1. Textura de ruido */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* 2. Resplandor superior (Spotlight) */}
      <div className="pointer-events-none absolute -top-[50%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-white/5 blur-[80px] rounded-full" />

      {/* 3. Contenido */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
