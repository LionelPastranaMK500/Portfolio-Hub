// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PublicLayout } from "../components/layouts/PublicLayout";
import { PrivateLayout } from "../components/layouts/PrivateLayout";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

// Loader Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-cyan-400 font-maven text-sm animate-pulse">
        Cargando contenido...
      </span>
    </div>
  </div>
);

// --- CARGA DIFERIDA (LAZY LOADING) ---

// Páginas Públicas
const HomePage = lazy(() => import("../pages/public/HomePage"));
const PortfolioDetailPage = lazy(
  () => import("../pages/public/PortfolioDetailPage")
);
const NotFoundPage = lazy(() => import("../pages/public/NotFoundPage"));
const LoginPage = lazy(() => import("../modules/auth/LoginPage"));
const RegisterPage = lazy(() => import("../modules/auth/RegisterPage"));

// Páginas Privadas (Dashboard) - Placeholder para cuando lleguemos a la parte privada
// const DashboardProfile = lazy(() => import("../pages/dashboard/ProfilePage"));

const AppRoutes = () => {
  return (
    <Routes>
      {/* =========================================
          ZONA PÚBLICA (Landing, Auth, Detalle)
         ========================================= */}

      {/* Rutas protegidas para NO autenticados (Login/Register) */}
      <Route element={<PublicRoute />}>
        <Route element={<PublicLayout />}>
          <Route
            path="/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<PageLoader />}>
                <RegisterPage />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* Rutas públicas accesibles para todos (Home, Detalle) */}
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/portfolios/:slug"
          element={
            <Suspense fallback={<PageLoader />}>
              <PortfolioDetailPage />
            </Suspense>
          }
        />
        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>

      {/* =========================================
          ZONA PRIVADA (Dashboard)
         ========================================= */}
      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/profile" replace />}
          />
          {/* Aquí añadiremos las rutas del dashboard en el siguiente paso */}
          <Route
            path="/dashboard/profile"
            element={<div>Perfil (Próximamente)</div>}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
