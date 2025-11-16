// src/types/project.ts
import type { SkillDto } from "./skill";

/**
 * Representa un proyecto (basado en ProjectDto.java)
 *
 */
export interface ProjectDto {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  coverImage: string | null;
  startDate: string | null; // (LocalDate)
  endDate: string | null; // (LocalDate)
  featured: boolean;
  sortOrder: number;
  skills: SkillDto[]; // Relación con Skills
}

/**
 * Datos para crear un proyecto (basado en ProjectCreateRequest.java)
 *
 */
export type ProjectCreateRequest = Omit<ProjectDto, "id" | "slug" | "skills">;

/**
 * Datos para actualizar un proyecto (basado en ProjectUpdateRequest.java)
 *
 */
export type ProjectUpdateRequest = Omit<ProjectDto, "slug" | "skills">;

/**
 * Datos para asociar skills a un proyecto
 *
 */
export interface ProjectSkillAssociationRequest {
  skillIds: number[];
}
