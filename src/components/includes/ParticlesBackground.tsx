// src/includes/ParticlesBackground.tsx
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
// Necesitaremos crear este archivo de config:
import { particlesConfig } from "@/config/particlesConfig";

export function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
}
