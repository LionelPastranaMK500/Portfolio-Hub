// src/routes/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

/**
 * Este componente envuelve las rutas PÚBLICAS (Login, Register).
 * Si el usuario YA está autenticado, lo redirige al Dashboard.
 * Si NO está autenticado, muestra el contenido público.
 */
const PublicRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Si está autenticado, ¡fuera de aquí! Vete al dashboard.
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si no, muestra la página pública (Login, Home, etc.)
  return <Outlet />;
};

export default PublicRoute;
