import { useParams, Link } from "react-router-dom";
import { usePortfolioDetail } from "../../services/publicPortfolioService";
import type {
  PortfolioDetailDto,
  ProjectSummaryDto,
} from "../../types/portfolio";
import type { SkillCategoryDto } from "../../types/skillCategory";
import type { ExperienceDto } from "../../types/experience";
import type { EducationDto } from "../../types/education";
import type { CertificateDto } from "../../types/certificate";
import { ContactForm } from "./components/ContactForm";
import {
  FaSpinner,
  FaExclamationTriangle,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaProjectDiagram,
  FaAward,
  FaFilePdf,
  FaLink,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { SEO } from "../../components/common/SEO";

// ==========================================
// --- SECCIÓN HERO (Perfil y Redes) ---
// ==========================================
const HeroSection = ({ portfolio }: { portfolio: PortfolioDetailDto }) => {
  const getSocialIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes("github"))
      return <FaGithub className="h-5 w-5" />;
    if (lowerPlatform.includes("linkedin"))
      return <FaLinkedin className="h-5 w-5" />;
    return <FaLink className="h-5 w-5" />;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
      {/* Avatar */}
      <div
        className="w-40 h-40 md:w-52 md:h-52 shrink-0 rounded-full overflow-hidden 
                   bg-gray-700/50 border-4 border-cyan-400 
                   flex items-center justify-center shadow-lg"
      >
        {portfolio.avatarUrl ? (
          <img
            src={portfolio.avatarUrl}
            alt={portfolio.fullName}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUser className="w-24 h-24 text-gray-400" />
        )}
      </div>
      {/* Info */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold font-maven text-white">
          {portfolio.fullName}
        </h1>
        <p className="text-xl md:text-2xl text-cyan-200 mt-2 font-maven">
          {portfolio.headline}
        </p>

        {/* Redes Sociales */}
        <div className="flex justify-center md:justify-start gap-4 mt-6">
          {portfolio.socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.platform}
              className="p-2 rounded-full bg-white/20 text-gray-200
                         hover:bg-cyan-500 hover:text-white 
                         transition-all duration-300 transform hover:scale-110"
            >
              {getSocialIcon(link.platform)}
            </a>
          ))}
        </div>

        {/* Botón de Resumen/CV */}
        {portfolio.resumeUrl && (
          <a
            href={portfolio.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-maven font-semibold 
                       text-white bg-cyan-600 hover:bg-cyan-500 
                       transition-all duration-300 ease-in-out
                       hover:scale-105 active:scale-95 mt-8"
          >
            <FaFilePdf />
            Descargar CV
          </a>
        )}
      </div>
    </div>
  );
};

// ==========================================
// --- CONTENEDOR DE SECCIÓN (Wrapper) ---
// ==========================================
const Section: React.FC<
  React.PropsWithChildren<{ title: string; icon: React.ReactNode }>
> = ({ title, icon, children }) => (
  <section className="mb-16">
    <h2 className="flex items-center gap-3 text-3xl font-bold font-maven text-white mb-6">
      <span className="p-2 bg-white/10 rounded-lg text-cyan-300">{icon}</span>
      {title}
    </h2>
    <div className="pl-4 md:pl-12 border-l-2 border-gray-700/50">
      {children}
    </div>
  </section>
);

// ==========================================
// --- SECCIONES DE CONTENIDO ---
// ==========================================

const AboutSection = ({ bio }: { bio: string }) => (
  <Section title="Sobre Mí" icon={<FaUser />}>
    <p className="text-gray-300 text-lg whitespace-pre-wrap leading-relaxed">
      {bio}
    </p>
  </Section>
);

const SkillsSection = ({ categories }: { categories: SkillCategoryDto[] }) => (
  <Section title="Habilidades" icon={<FaStar />}>
    <div className="flex flex-col gap-6">
      {categories.map((category) => (
        <div key={category.id}>
          <h3 className="text-xl font-semibold text-cyan-200 mb-3">
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-3">
            {category.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-4 py-2 rounded-full bg-gray-700/50 text-gray-200 text-sm font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const ProjectsSection = ({
  projects,
  profileSlug,
}: {
  projects: ProjectSummaryDto[];
  profileSlug: string;
}) => (
  <Section title="Proyectos Destacados" icon={<FaProjectDiagram />}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <div
          key={project.slug}
          className="rounded-lg bg-white/5 border border-gray-700/50 
                     overflow-hidden shadow-lg transition-all duration-300
                     hover:shadow-cyan-500/10 hover:border-cyan-400/50"
        >
          {project.coverImage && (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-300 mb-4 line-clamp-3">{project.summary}</p>
            <Link
              to={`/portfolios/${profileSlug}/projects/${project.slug}`}
              className="font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Ver detalles &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const ExperienceSection = ({
  experiences,
}: {
  experiences: ExperienceDto[];
}) => (
  <Section title="Experiencia" icon={<FaBriefcase />}>
    <div className="relative flex flex-col gap-10">
      {experiences.map((exp) => (
        <div key={exp.id} className="pl-6">
          <span
            className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-cyan-400
                       border-4 border-gray-800"
          ></span>
          <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
          <p className="text-lg text-gray-300 font-medium">{exp.company}</p>
          <p className="text-sm text-gray-400 mb-2">
            {new Date(exp.startDate).getFullYear()} -{" "}
            {exp.current ? "Presente" : new Date(exp.endDate!).getFullYear()}
            {exp.location && ` | ${exp.location}`}
          </p>
          <p className="text-gray-300 whitespace-pre-wrap">{exp.description}</p>
        </div>
      ))}
    </div>
  </Section>
);

const EducationSection = ({ education }: { education: EducationDto[] }) => (
  <Section title="Educación" icon={<FaGraduationCap />}>
    <div className="relative flex flex-col gap-10">
      {education.map((edu) => (
        <div key={edu.id} className="pl-6">
          <span
            className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-cyan-400
                       border-4 border-gray-800"
          ></span>
          <h3 className="text-xl font-semibold text-white">
            {edu.institution}
          </h3>
          <p className="text-lg text-gray-300 font-medium">{edu.degree}</p>
          <p className="text-sm text-gray-400 mb-2">
            {new Date(edu.startDate).getFullYear()} -{" "}
            {edu.endDate ? new Date(edu.endDate).getFullYear() : "Presente"}
          </p>
          <p className="text-gray-300">{edu.description}</p>
        </div>
      ))}
    </div>
  </Section>
);

const CertificatesSection = ({
  certificates,
}: {
  certificates: CertificateDto[];
}) => (
  <Section title="Certificados" icon={<FaAward />}>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {certificates.map((cert) => (
        <a
          key={cert.id}
          href={cert.imageUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg bg-white/5 border border-gray-700/50
                     hover:border-cyan-400/50 hover:bg-white/10 transition-all"
        >
          <h4 className="font-semibold text-white truncate">{cert.name}</h4>
          <p className="text-sm text-gray-400 line-clamp-2">
            {cert.description}
          </p>
        </a>
      ))}
    </div>
  </Section>
);

// ==========================================
// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
// ==========================================
export default function PortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // Hook para obtener los datos
  const {
    data: portfolio,
    isLoading,
    isError,
    error,
  } = usePortfolioDetail(slug!);

  // Estado de Carga
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="h-16 w-16 text-cyan-300 animate-spin" />
      </div>
    );
  }

  // Estado de Error
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="flex flex-col items-center justify-center 
                       text-red-300 bg-red-500/20 
                       max-w-lg mx-auto p-10 rounded-lg border border-red-400"
        >
          <FaExclamationTriangle className="h-16 w-16 mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            Error al cargar el portafolio
          </h2>
          <p className="text-center text-lg">
            {(error as Error)?.message || "No se pudo encontrar el portafolio."}
          </p>
          <Link
            to="/"
            className="mt-6 px-4 py-2 bg-cyan-600 text-white rounded-lg"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!portfolio) return null;

  return (
    <>
      <SEO
        title={portfolio.fullName}
        description={portfolio.headline}
        name={portfolio.fullName}
        type="profile"
      />
      <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
        <HeroSection portfolio={portfolio} />
        <AboutSection bio={portfolio.bio} />
        <SkillsSection categories={portfolio.skillCategories} />
        <ProjectsSection
          projects={portfolio.projects}
          profileSlug={portfolio.slug}
        />
        <ExperienceSection experiences={portfolio.experiences} />
        <EducationSection education={portfolio.education} />
        <CertificatesSection certificates={portfolio.certificates} />
        <ContactForm portfolioSlug={portfolio.slug} />
      </div>
    </>
  );
}
