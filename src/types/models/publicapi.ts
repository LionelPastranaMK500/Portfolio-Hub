// src/types/publicapi.ts

import type { SocialLinkDto } from "./socialLink";
import type { SkillCategoryDto } from "./skillCategory";
import type { ExperienceDto } from "./experience";
import type { EducationDto } from "./education";
import type { CertificateDto } from "./certificate";

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.publicapi.ContactRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/publicapi/ContactRequest.java
 */
export interface ContactRequest {
  name: string; // @NotBlank @Size(max = 120)
  email: string; // @NotBlank @Email @Size(max = 160)
  message: string; // @NotBlank @Size(max = 5000)
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.publicapi.ProjectSummaryDto
 * Backend: src/main/java/studios/tkoh/portfolio/dto/publicapi/ProjectSummaryDto.java
 */
export interface ProjectSummaryDto {
  title: string;
  slug: string;
  summary: string;
  coverImage: string | null;
  featured: boolean;
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.publicapi.PortfolioPublicDto
 * Backend: src/main/java/studios/tkoh/portfolio/dto/publicapi/PortfolioPublicDto.java
 */
export interface PortfolioPublicDto {
  slug: string;
  fullName: string;
  headline: string;
  avatarUrl: string | null;
  tkohCollab: boolean;
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.publicapi.PortfolioDetailDto
 * Backend: src/main/java/studios/tkoh/portfolio/dto/publicapi/PortfolioDetailDto.java
 * Contiene toda la información pública del usuario para mostrar en el perfil.
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
  tkohCollab: boolean;

  // Relaciones (Listas)
  socialLinks: SocialLinkDto[];
  skillCategories: SkillCategoryDto[];
  projects: ProjectSummaryDto[]; // Usa el resumen definido arriba
  experiences: ExperienceDto[];
  education: EducationDto[];
  certificates: CertificateDto[];
}
