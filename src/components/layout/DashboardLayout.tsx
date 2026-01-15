import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";
import { useUIStore } from "../../store/uiStore";

export function DashboardLayout() {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* FONDO GLOBAL DEL DASHBOARD */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
      </div>

      <Sidebar />

      {/* CONTENIDO PRINCIPAL */}
      <motion.main
        initial={false}
        animate={{
          marginLeft:
            typeof window !== "undefined" && window.innerWidth < 768
              ? 0
              : isSidebarOpen
              ? 288
              : 80,
        }}
        className="relative z-10 flex-1 min-h-screen transition-all duration-300"
      >
        {/* En móvil pt-16 para no chocar con la burbuja superior */}
        <div className="p-4 pt-16 md:pt-10 md:p-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}
