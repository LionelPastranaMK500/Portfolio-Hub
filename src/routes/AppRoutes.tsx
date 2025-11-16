// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import { PublicLayout } from "@/layouts/PublicLayout";
import { PrivateLayout } from "@/layouts/PrivateLayout";

// Route Guards (Los que acabamos de crear)
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

// Componentes de Carga (Loaders)
// (Puedes usar el LazyLoader que definimos en App.tsx o crear uno nuevo)
const PageLoader = () => (
  <div className="p-10 text-center text-cyan-500 font-maven animate-pulse">
    Cargando contenido...
  </div>
);

// --- CARGA DIFERIDA (LAZY LOADING) DE MÓDULOS ---

// Públicos
const HomePage = lazy(() => import("@/pages/public/HomePage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const NotFoundPage = lazy(() => import("@/pages/public/NotFoundPage"));

// Privados (Dashboard)
const ProfilePage = lazy(() => import("@/pages/dashboard/ProfilePage"));
const ExperiencePage = lazy(() => import("@/pages/dashboard/ExperiencePage"));
const EducationPage = lazy(() => import("@/pages/dashboard/EducationPage"));
const ProjectsPage = lazy(() => import("@/pages/dashboard/ProjectsPage"));
const SkillsPage = lazy(() => import("@/pages/dashboard/SkillsPage"));
const SocialsPage = lazy(() => import("@/pages/dashboard/SocialsPage"));
const CertificatesPage = lazy(
  () => import("@/pages/dashboard/CertificatesPage")
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* =========================================
          ZONA PÚBLICA (Landing, Login, etc.)
         ========================================= */}
      {/* 1. Filtro de Ruta Pública: Si estás logueado, te saca de aquí */}
      <Route element={<PublicRoute />}>
        {/* 2. Layout Público: Header + Footer + Fondo Partículas */}
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
          ZONA PRIVADA (Dashboard)
         ========================================= */}
      {/* 1. Filtro de Ruta Privada: Si NO estás logueado, te manda al Login */}
      <Route element={<PrivateRoute />}>
        {/* 2. Layout Privado: Sidebar + Fondo Dashboard */}
        <Route element={<PrivateLayout />}>
          {/* Rutas del Dashboard */}
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/profile" replace />}
          />

          <Route
            path="/dashboard/profile"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProfilePage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/experience"
            element={
              <Suspense fallback={<PageLoader />}>
                <ExperiencePage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/education"
            element={
              <Suspense fallback={<PageLoader />}>
                <EducationPage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/projects"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProjectsPage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/skills"
            element={
              <Suspense fallback={<PageLoader />}>
                <SkillsPage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/socials"
            element={
              <Suspense fallback={<PageLoader />}>
                <SocialsPage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/certificates"
            element={
              <Suspense fallback={<PageLoader />}>
                <CertificatesPage />
              </Suspense>
            }
          />

          {/* Ejemplo de ruta con roles específicos (comentada por ahora) */}
          {/* <Route element={<PrivateRoute allowedRoles={['ROLE_ADMIN']} />}>
             <Route path="/dashboard/admin" element={...} />
          </Route> 
          */}
        </Route>
      </Route>

      {/* =========================================
          404 NOT FOUND
         ========================================= */}
      <Route path="*" element={<PublicLayout />}>
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
