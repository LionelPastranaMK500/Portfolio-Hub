// src/routes/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../services/auth/authStore";

interface PrivateRouteProps {
  allowedRoles?: string[]; // Opcional: Lista de roles permitidos
}

/**
 * Este componente envuelve las rutas PRIVADAS (Dashboard).
 * Si NO está autenticado, lo manda al Login.
 * Si está autenticado pero NO tiene rol, lo manda a Unauthorized.
 */
const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // TODO: Descomentar esto cuando el backend devuelva roles
  // const user = useAuthStore((state) => state.user);
  // const userRoles = user?.roles || [];

  // 1. Verificación de Autenticación
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Verificación de Roles (Lógica preparada para el futuro)
  /*
  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = allowedRoles.some(role => userRoles.includes(role));
    if (!hasPermission) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  */

  // Si pasa todas las pruebas, renderiza la ruta hija
  return <Outlet />;
};

export default PrivateRoute;
