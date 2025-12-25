import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const EnterButton = () => {
  return (
    <Link to="/home">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-full border border-white/10 hover:border-white/30 transition-colors"
      >
        {/* Fondo blanco sutil al hover */}
        <div className="absolute inset-0 w-0 bg-white transition-all duration-[400ms] ease-out group-hover:w-full opacity-10" />

        <div className="flex items-center gap-3 relative z-10">
          <span className="text-white text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
            Entrar al Hub
          </span>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Efecto Glow en el borde */}
        <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-white/50 transition-all duration-500 blur-[1px]" />
      </motion.button>
    </Link>
  );
};
