import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ParticlesBackground } from "../shared/ParticlesBackground";
import { SmoothScroll } from "./SmoothScroll";

export function PublicLayout() {
  return (
    <SmoothScroll>
      <div className="relative bg-black text-white min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Fondo de Partículas (Fixed para que no se mueva al scrollear) */}
        <div className="fixed inset-0 z-0">
          <ParticlesBackground />
        </div>
        {/* Header y Footer con z-index alto para estar sobre las partículas */}
        <div className="relative z-50">
          <Header />
        </div>

        <main className="flex-1 relative z-10 flex flex-col">
          <Outlet />
        </main>

        <div className="relative z-50">
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
