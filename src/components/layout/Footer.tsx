import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export function Footer() {
  return (
    // Fondo casi transparente (bg-white/[0.02]) + Blur medio
    <footer className="w-full relative z-50 border-t border-white/5 backdrop-blur-md bg-white/[0.02]">
      {/* Ruido de condensación */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* 1. Marca */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h3 className="font-maven text-xl font-bold text-white tracking-wider drop-shadow-sm">
            Portfolio Hub
          </h3>
          <p className="text-gray-400 text-sm font-light">
            © {new Date().getFullYear()} Studios TKOH!
            <br />
            Forging Digital Futures.
          </p>
        </div>

        {/* 2. Separador sutil */}
        <div className="hidden md:flex justify-center">
          {/* Línea vertical de luz tenue */}
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>

        {/* 3. Redes Sociales */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            Social
          </span>
          <div className="flex space-x-4">
            <SocialLink
              href="https://github.com/lionelpastranamk500"
              icon={<FaGithub size={20} />}
              label="GitHub"
            />
            <SocialLink
              href="https://www.linkedin.com/in/lionel-pastrana"
              icon={<FaLinkedin size={20} />}
              label="LinkedIn"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ y: -3, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    // Botones sociales transparentes
    className="p-3 rounded-xl bg-transparent border border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
  >
    {icon}
  </motion.a>
);
