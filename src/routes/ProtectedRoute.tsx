// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../services/auth/authStore"; // <-- Importa el store real

// --- Borramos el Placeholder Temporal ---

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  // --- Usamos datos reales del store ---
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // TODO: El backend aún no devuelve roles en el ProfileDto.
  // Por ahora, solo validamos si está autenticado.
  // const userRoles = useAuthStore((state) => state.user?.roles) || [];
  // ---

  // 1. ¿Está autenticado?
  if (!isAuthenticated) {
    // Nota: El interceptor de Axios ya redirige, pero esto es una
    // doble seguridad para la navegación directa por URL.
    return <Navigate to="/login" replace />;
  }

  // 2. ¿Tiene permiso? (Lógica de Roles)
  // Descomenta esto cuando tu API envíe los roles en el objeto 'user'
  /*
  const isAuthorized = allowedRoles
    ? allowedRoles.some(role => userRoles.includes(role))
    : true; 

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }
  */

  // 3. Si todo está bien, muestra la página solicitada
  return <Outlet />;
}
