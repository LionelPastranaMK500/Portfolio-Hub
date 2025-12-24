// src/layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ParticlesBackground } from "../shared/ParticlesBackground";

export function PublicLayout() {
  return (
    // Este div aplica tu estilo visual de fondo
    <div className="relative bg-gradient-to-r from-green-600 to-cyan-400 dark:from-gray-900 dark:to-gray-800 text-white dark:text-gray-100 min-h-screen flex flex-col font-sans transition-colors duration-300">
      <ParticlesBackground /> {/* Fondo animado */}
      {/* El Header y Footer están DENTRO de este layout */}
      <Header />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
