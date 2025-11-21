// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import { PublicLayout } from "@/layouts/PublicLayout";
import { PrivateLayout } from "@/layouts/PrivateLayout";

// Route Guards
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

// ... (PageLoader component)
const PageLoader = () => (
  <div className="p-10 text-center text-cyan-500 font-maven animate-pulse">
    Cargando contenido...
  </div>
);

// --- CARGA DIFERIDA (LAZY LOADING) DE MÓDULOS ---

// Públicos
const HomePage = lazy(() => import("../pages/public/HomePage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const NotFoundPage = lazy(() => import("..pages/public/NotFoundPage"));
// --- AÑADIR ESTA LÍNEA ---
const PortfolioDetailPage = lazy(
  () => import("@/pages/public/PortfolioDetailPage")
);
// ------------------------

// Privados (Dashboard)
// ... (imports de páginas del dashboard)

const AppRoutes = () => {
  return (
    <Routes>
      {/* =========================================
          ZONA PÚBLICA (Landing, Login, etc.)
         ========================================= */}
      <Route element={<PublicRoute />}>
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
            path="/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* =========================================
          PÁGINA DE DETALLE DE PORTAFOLIO PÚBLICO
         ========================================= */}
      {/* --- AÑADIR ESTE BLOQUE COMPLETO --- */}
      <Route element={<PublicLayout />}>
        <Route
          path="/portfolios/:slug"
          element={
            <Suspense fallback={<PageLoader />}>
              <PortfolioDetailPage />
            </Suspense>
          }
        />
      </Route>
      {/* ------------------------------------- */}

      {/* =========================================
          ZONA PRIVADA (Dashboard)
         ========================================= */}
      <Route element={<PrivateRoute />}>{/* ... (resto de rutas privadas) */}</Route>

      {/* =========================================
          404 NOT FOUND
         ========================================= */}
      <Route path="*" element={<PublicLayout />}>
        {/* ... (resto de la ruta 404) */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;