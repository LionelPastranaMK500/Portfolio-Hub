// src/types/portfolio.ts
import type { SocialLinkDto } from "./socialLink";
import type { SkillCategoryDto } from "./skillCategory";
import type { ExperienceDto } from "./experience";
import type { EducationDto } from "./education";
import type { CertificateDto } from "./certificate";

/**
 * Representa un resumen público de un portafolio
 * (Basado en PortfolioPublicDto.java)
 */
export interface PortfolioPublicDto {
  slug: string;
  fullName: string;
  headline: string;
  avatarUrl: string | null;
  isTkohCollaborator: boolean;
}

/**
 * Representa un resumen público de un proyecto para la lista
 * (Basado en ProjectSummaryDto.java)
 */
export interface ProjectSummaryDto {
  title: string;
  slug: string;
  summary: string;
  coverImage: string | null;
  featured: boolean;
}

/**
 * Representa el detalle completo de un portafolio público
 * (Basado en PortfolioDetailDto.java)
 */
export interface PortfolioDetailDto {
  slug: string;
  fullName: string;
  headline: string;
  bio: string;
  contactEmail: string;
  location: string | null;
  avatarUrl: string | null;
  resumeUrl: string | null;
  isTkohCollaborator: boolean;
  socialLinks: SocialLinkDto[];
  skillCategories: SkillCategoryDto[];
  projects: ProjectSummaryDto[]; // Nota: La API define esto como ProjectSummaryDto
  experiences: ExperienceDto[];
  education: EducationDto[];
  certificates: CertificateDto[];
}
