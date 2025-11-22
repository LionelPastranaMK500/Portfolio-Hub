// src/utils/lazyWithDelay.ts
import { lazy } from "react";

/**
 * Envuelve un import lazy con un retraso mínimo artificial.
 * @param importFunc Función de importación (ej: () => import('./Page'))
 * @param delay Tiempo mínimo en ms (por defecto 2000ms = 2s)
 */
export function lazyWithDelay(
  importFunc: () => Promise<any>,
  delay: number = 1500
) {
  return lazy(() =>
    Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([moduleExports]) => moduleExports)
  );
}
