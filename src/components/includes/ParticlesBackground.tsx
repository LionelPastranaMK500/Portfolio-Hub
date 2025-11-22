// src/components/includes/ParticlesBackground.tsx
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particlesConfig } from "../../config/particlesConfig";

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  // Esta lógica se ejecuta una sola vez al montar el componente
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Aquí cargamos la versión "slim" del motor para que sea ligero
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Mientras se cargan las partículas, no renderizamos nada (o podrías poner un div vacío)
  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={particlesConfig}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
}
