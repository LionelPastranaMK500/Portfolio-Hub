// src/types/project.ts
import type { SkillDto } from "./skill";

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.project.ProjectDto
 * Backend: src/main/java/studios/tkoh/portfolio/dto/project/ProjectDto.java
 */
export interface ProjectDto {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  coverImage: string | null; // El backend acepta URL string o archivo Multipart aparte
  startDate: string | null; // LocalDate -> YYYY-MM-DD
  endDate: string | null; // LocalDate -> YYYY-MM-DD
  featured: boolean;
  sortOrder: number;
  skills: SkillDto[]; // En Java es Set<SkillDto>
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.project.ProjectCreateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/project/ProjectCreateRequest.java
 * Usamos Omit porque Java define este request idéntico al DTO
 * excepto por los campos autogenerados (id, slug) y la relación (skills).
 */
export type ProjectCreateRequest = Omit<ProjectDto, "id" | "slug" | "skills">;

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.project.ProjectUpdateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/project/ProjectUpdateRequest.java
 * Coincide con DTO salvo slug (no editable) y skills (se manejan en otro endpoint).
 */
export type ProjectUpdateRequest = Omit<ProjectDto, "slug" | "skills">;

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.project.ProjectSkillAssociationRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/project/ProjectSkillAssociationRequest.java
 */
export interface ProjectSkillAssociationRequest {
  skillIds: number[]; // List<Long>
}
