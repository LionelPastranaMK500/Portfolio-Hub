import { RegisterForm } from "./components/RegisterForm";
import { GlassTiltCard } from "../../components/ui/GlassTiltCard";
import { ParticlesBackground } from "../../components/shared/ParticlesBackground";

export const RegisterPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      <div className="relative z-10 w-full max-w-md mt-16">
        <GlassTiltCard className="p-8 border-white/10 bg-black/40 backdrop-blur-xl">
          {/* CABECERA (Solo Texto) */}
          <div className="flex flex-col items-center text-center mb-6">
            <h1 className="text-3xl font-bold text-white tracking-tight font-maven">
              Únete al Hub
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              Crea tu portafolio profesional en minutos.
            </p>
          </div>

          <RegisterForm />
        </GlassTiltCard>

        <p className="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-widest">
          Join the Revolution • Studios TKOH
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
