import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { PublicLayout } from "../components/layout/PublicLayout";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Loader } from "../components/shared/Loader";
import { lazyWithDelay } from "../utils/lazyWithDelay";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";
import { LandingPage } from "../modules/landing/LandingPage";

// --- LAZY IMPORTS (Públicos) ---
const HomePage = lazyWithDelay(() => import("../modules/portafolio/HomePage"));
const PortfolioDetailPage = lazyWithDelay(
  () => import("../modules/portafolio/PortfolioDetailPage")
);
const LoginPage = lazyWithDelay(() => import("../modules/auth/LoginPage"));
const RegisterPage = lazyWithDelay(
  () => import("../modules/auth/RegisterPage")
);

// --- LAZY IMPORTS (Privados / Admin Dashboard) ---
const DashboardOverview = lazyWithDelay(
  () => import("../modules/admin/dashboard/DashboardOverview")
);
const DashboardProfile = lazyWithDelay(
  () => import("../modules/admin/profile/ProfilePage")
);
const DashboardProjects = lazyWithDelay(
  () => import("../modules/admin/projects/ProjectsPage")
);
const DashboardSkills = lazyWithDelay(
  () => import("../modules/admin/skills/SkillsPage")
);
const DashboardEducation = lazyWithDelay(
  () => import("../modules/admin/education/EducationPage")
);
const DashboardExperience = lazyWithDelay(
  () => import("../modules/admin/experience/ExperiencePage")
);
const DashboardCertificates = lazyWithDelay(
  () => import("../modules/admin/certificates/CertificatesPage")
);
const DashboardSocial = lazyWithDelay(
  () => import("../modules/admin/socials/SocialLinksPage")
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* =================================================
          RUTAS PÚBLICAS (Layout con Header y Footer)
         ================================================= */}
      <Route element={<PublicLayout />}>
        {/* Rutas abiertas a todo el mundo */}
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/home"
          element={
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          }
        />

        <Route
          path="/portfolios/:slug"
          element={
            <Suspense fallback={<Loader />}>
              <PortfolioDetailPage />
            </Suspense>
          }
        />

        {/* Rutas "Guest Only" (Login/Register) 
            Si ya estás logueado, te redirigen al Dashboard.
        */}
        <Route element={<GuestRoute />}>
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loader />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loader />}>
                <RegisterPage />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* =================================================
          RUTAS PRIVADAS (Layout Dashboard con Sidebar)
         ================================================= */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* INDEX: Vista de Resumen */}
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <DashboardOverview />
              </Suspense>
            }
          />

          {/* --- MÓDULOS DE GESTIÓN --- */}

          <Route
            path="profile"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardProfile />
              </Suspense>
            }
          />

          <Route
            path="projects"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardProjects />
              </Suspense>
            }
          />

          <Route
            path="skills"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardSkills />
              </Suspense>
            }
          />

          <Route
            path="experience"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardExperience />
              </Suspense>
            }
          />

          <Route
            path="education"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardEducation />
              </Suspense>
            }
          />

          <Route
            path="certificates"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardCertificates />
              </Suspense>
            }
          />

          <Route
            path="social"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardSocial />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* RUTA 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-cyan-500 mb-2">404</h1>
              <p>Página no encontrada</p>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
