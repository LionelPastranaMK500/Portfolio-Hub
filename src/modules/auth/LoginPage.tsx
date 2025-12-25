import { LoginForm } from "./components/LoginForm";
import { GlassTiltCard } from "../../components/ui/GlassTiltCard";
import { ParticlesBackground } from "../../components/shared/ParticlesBackground";

export const LoginPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-black">
      {/* FONDO */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* TARJETA DE LOGIN - COMPACTA */}
      <div className="relative z-10 w-full max-w-md mt-16">
        {" "}
        {/* mt-16 para separarlo del Header fijo */}
        <GlassTiltCard className="p-8 border-white/10 bg-black/40 backdrop-blur-xl">
          {/* CABECERA (Solo Texto) */}
          <div className="flex flex-col items-center text-center mb-6">
            <h1 className="text-3xl font-bold text-white tracking-tight font-maven">
              Bienvenido
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              Ingresa tus credenciales para acceder.
            </p>
          </div>

          {/* FORMULARIO */}
          <LoginForm />
        </GlassTiltCard>
        {/* Footer discreto */}
        <p className="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-widest">
          Secure Access • Studios TKOH
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
