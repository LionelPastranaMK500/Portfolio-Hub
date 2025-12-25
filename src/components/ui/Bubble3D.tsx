import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import React from "react";

interface Bubble3DProps {
  icon: React.ReactNode;
  label?: string; // Opcional: Texto al hacer hover (ej: "Abogado")
  className?: string;
  delay?: number; // Para que no floten todas al mismo tiempo
  size?: "sm" | "md" | "lg";
}

export const Bubble3D = ({
  icon,
  label,
  className,
  delay = 0,
  size = "md",
}: Bubble3DProps) => {
  // Tamaños predefinidos
  const sizeClasses = {
    sm: "w-12 h-12 p-2",
    md: "w-16 h-16 p-3",
    lg: "w-24 h-24 p-5",
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 40,
  };

  return (
    <motion.div
      // 1. ANIMACIÓN DE FLOTACIÓN (Floating)
      // Se mueve arriba y abajo infinitamente como si estuviera en gravedad cero
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay, // Desfase para que se vea orgánico
      }}
      className="relative group flex flex-col items-center justify-center"
    >
      <motion.div
        // 2. INTERACCIÓN AL HOVER
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          // FORMA BASE
          "relative flex items-center justify-center rounded-full",
          // CRISTAL Y BORDE
          "bg-white/5 backdrop-blur-md border border-white/20",
          // 3. EL TRUCO 3D (Sombras internas y externas)
          // - shadow-xl: Sombra externa para despegarlo del fondo
          // - shadow-inner: Sombra interna para dar profundidad
          // - ring-1: Un anillo sutil blanco para el borde cortante
          "shadow-[0_10px_30px_rgba(0,0,0,0.5)] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] ring-1 ring-white/10",
          sizeClasses[size],
          className
        )}
      >
        {/* REFLEJO SUPERIOR (El brillo de la luz en la esfera) */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50 pointer-events-none" />

        {/* REFLEJO INFERIOR (Luz de rebote) */}
        <div className="absolute bottom-1 right-2 w-2/3 h-1/3 rounded-full bg-gradient-to-br from-transparent to-white/10 opacity-40 blur-sm pointer-events-none" />

        {/* EL ICONO DENTRO */}
        <div className="relative z-10 text-gray-200 group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          {/* Clonamos el elemento para forzarle tamaño si es necesario, o lo renderizamos directo */}
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement, {
                size: iconSizes[size],
              })
            : icon}
        </div>
      </motion.div>

      {/* LABEL (Tooltip que aparece abajo al hacer hover) */}
      {label && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 pointer-events-none px-2 py-1 bg-black/80 text-white text-[10px] uppercase tracking-widest rounded border border-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
};
