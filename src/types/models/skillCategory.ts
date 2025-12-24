// src/types/skillCategory.ts
import type { SkillDto } from "./skill";

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.skill.SkillCategoryDto
 * Backend: src/main/java/studios/tkoh/portfolio/dto/skill/SkillCategoryDto.java
 */
export interface SkillCategoryDto {
  id: number;
  name: string;
  sortOrder: number;
  skills: SkillDto[]; // Set<SkillDto> en Java
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.skill.SkillCategoryCreateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/skill/SkillCategoryCreateRequest.java
 * Es igual al DTO pero sin ID y sin la lista de skills (se crea vacía).
 */
export type SkillCategoryCreateRequest = Omit<
  SkillCategoryDto,
  "id" | "skills"
>;

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.skill.SkillCategoryUpdateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/skill/SkillCategoryUpdateRequest.java
 * Es igual al DTO pero sin la lista de skills (se actualizan aparte o no se tocan aquí).
 */
export type SkillCategoryUpdateRequest = Omit<SkillCategoryDto, "skills">;
