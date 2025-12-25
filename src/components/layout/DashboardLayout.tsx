import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* FONDO GLOBAL DEL DASHBOARD */}
      <div className="fixed inset-0 z-0">
        {/* Gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black" />
        {/* Ruido para textura */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
      </div>

      {/* SIDEBAR (Fijo a la izquierda) */}
      <Sidebar />

      {/* CONTENIDO PRINCIPAL */}
      {/* ml-0 md:ml-72 deja el espacio para el sidebar en desktop */}
      <main className="relative z-10 flex-1 min-h-screen transition-all duration-300 md:ml-72">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {/* Animación de entrada suave para cada página */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// Nota: Puedes borrar 'PrivateLayout.tsx' si usas este nombre más descriptivo.
