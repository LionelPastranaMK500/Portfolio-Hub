import { motion } from "framer-motion";

export const TkohLogo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2,
      }}
      className="relative z-10 flex justify-center"
    >
      {/* NOTA: La ruta "/logo.svg" busca automáticamente en la carpeta 'public'.
        No necesitas importar nada.
      */}
      <img
        src="../../../../public/Logo_STKH.png"
        alt="Studios TKOH Logo"
        className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
      />

      {/* Resplandor ambiental detrás del logo */}
      <div className="absolute inset-0 bg-indigo-500/20 blur-3xl -z-10 rounded-full scale-110" />
    </motion.div>
  );
};
