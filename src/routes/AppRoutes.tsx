import { Routes, Route, Navigate } from "react-router-dom";
// import { Suspense } from "react";
import { PublicLayout } from "../components/layout/PublicLayout";
// import { PrivateLayout } from "../components/layout/PrivateLayout";
// import PublicRoute from "./PublicRoute";
// import PrivateRoute from "./PrivateRoute";
// import { Loader } from "../components/shared/Loader";
// import { lazyWithDelay } from "../utils/lazyWithDelay";

// --- MÓDULO LANDING (Activo) ---
import { LandingPage } from "../modules/landing/LandingPage";

// --- COMPONENTES COMENTADOS HASTA COMPLETAR LA MIGRACIÓN A MODULES ---

/*
const HomePage = lazyWithDelay(() => import("../pages/public/HomePage"));
const PortfolioDetailPage = lazyWithDelay(
  () => import("../pages/public/PortfolioDetailPage")
);
const ProjectDetailPage = lazyWithDelay(
  () => import("../pages/public/ProjectDetailPage")
);
const NotFoundPage = lazyWithDelay(
  () => import("../pages/public/NotFoundPage")
);
const LoginPage = lazyWithDelay(() => import("../modules/auth/LoginPage"));
const RegisterPage = lazyWithDelay(
  () => import("../modules/auth/RegisterPage")
);

// Páginas Privadas
const DashboardProfile = lazyWithDelay(
  () => import("../pages/dashboard/ProfilePage")
);
const DashboardProjects = lazyWithDelay(
  () => import("../pages/dashboard/projects/ProjectListPage")
);
const DashboardProjectSave = lazyWithDelay(
  () => import("../pages/dashboard/projects/ProjectSavePage")
);
const DashboardExperience = lazyWithDelay(
  () => import("../pages/dashboard/experience/ExperienceListPage")
);
const DashboardExperienceSave = lazyWithDelay(
  () => import("../pages/dashboard/experience/ExperienceSavePage")
);
const DashboardEducation = lazyWithDelay(
  () => import("../pages/dashboard/education/EducationListPage")
);
const DashboardEducationSave = lazyWithDelay(
  () => import("../pages/dashboard/education/EducationSavePage")
);
const DashboardSkills = lazyWithDelay(
  () => import("../pages/dashboard/skills/SkillManagerPage")
);
const DashboardCertificates = lazyWithDelay(
  () => import("../pages/dashboard/certificates/CertificateListPage")
);
const DashboardCertificateSave = lazyWithDelay(
  () => import("../pages/dashboard/certificates/CertificateSavePage")
);
const DashboardSocials = lazyWithDelay(
  () => import("../pages/dashboard/socials/SocialLinkListPage")
);
const DashboardSocialSave = lazyWithDelay(
  () => import("../pages/dashboard/socials/SocialLinkSavePage")
);
*/

const AppRoutes = () => {
  return (
    <Routes>
      {/* RUTA RAÍZ: La Landing Page de Studios TKOH! (ACTIVA) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* --- RUTAS PÚBLICAS Y DE AUTH (COMENTADAS) --- */}
      {/*
      <Route element={<PublicRoute />}>
        <Route element={<PublicLayout />}>
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

      <Route element={<PublicLayout />}>
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
        <Route
          path="/portfolios/:profileSlug/projects/:projectSlug"
          element={
            <Suspense fallback={<Loader />}>
              <ProjectDetailPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
      */}

      {/* --- RUTAS PRIVADAS / DASHBOARD (COMENTADAS) --- */}
      {/*
      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/profile" replace />}
          />

          <Route
            path="/dashboard/profile"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardProfile />
              </Suspense>
            }
          />

          <Route
            path="/dashboard/projects"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardProjects />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/projects/new"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardProjectSave />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/projects/edit/:id"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardProjectSave />
              </Suspense>
            }
          />

          <Route
            path="/dashboard/experience"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardExperience />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/experience/new"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardExperienceSave />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/experience/edit/:id"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardExperienceSave />
              </Suspense>
            }
          />

          <Route
            path="/dashboard/education"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardEducation />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/education/new"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardEducationSave />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/education/edit/:id"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardEducationSave />
              </Suspense>
            }
          />

          <Route
            path="/dashboard/skills"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardSkills />
              </Suspense>
            }
          />

          <Route
            path="/dashboard/certificates"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardCertificates />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/certificates/new"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardCertificateSave />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/certificates/edit/:id"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardCertificateSave />
              </Suspense>
            }
          />

          <Route
            path="/dashboard/socials"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardSocials />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/socials/new"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardSocialSave />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/socials/edit/:id"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardSocialSave />
              </Suspense>
            }
          />
        </Route>
      </Route>
      */}
    </Routes>
  );
};

export default AppRoutes;
