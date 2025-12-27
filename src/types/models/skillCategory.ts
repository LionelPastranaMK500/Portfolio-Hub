// src/types/models/skillCategory.ts
import type { SkillDto } from "./skill";

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.skill.SkillCategoryDto
 * Backend: src/main/java/studios/tkoh/portfolio/dto/skill/SkillCategoryDto.java
 * (Asumido basado en estructura previa y uso de listas de Skills)
 */
export interface SkillCategoryDto {
  id: number;
  name: string;
  sortOrder: number;
  skills: SkillDto[];
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.skill.SkillCategoryCreateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/skill/SkillCategoryCreateRequest.java
 */
export interface SkillCategoryCreateRequest {
  name: string; // @NotBlank
  sortOrder: number; // @NotNull
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.skill.SkillCategoryUpdateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/skill/SkillCategoryUpdateRequest.java
 */
export interface SkillCategoryUpdateRequest {
  id: number; // @NotNull
  name: string; // @NotBlank
  sortOrder: number; // @NotNull
}
