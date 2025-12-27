// src/types/models/skill.ts

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.skill.GlobalSkillDto
 * Backend: src/main/java/studios/tkoh/portfolio/dto/skill/GlobalSkillDto.java
 */
export interface GlobalSkillDto {
  id: number;
  name: string;
  iconUrl: string | null;
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.skill.SkillDto
 * Backend: src/main/java/studios/tkoh/portfolio/dto/skill/SkillDto.java
 * Nota: El DTO de lectura NO expone 'sortOrder', pero sí 'globalSkillId'.
 */
export interface SkillDto {
  id: number;
  name: string;
  globalSkillId: number | null; // Nuevo campo reflejado del Java Record
  level: number;
  icon: string | null;
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.skill.SkillCreateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/skill/SkillCreateRequest.java
 */
export interface SkillCreateRequest {
  name: string; // @NotBlank
  level: number; // @Min(0) @Max(100)
  icon: string | null;
  sortOrder: number; // @NotNull
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.skill.SkillUpdateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/skill/SkillUpdateRequest.java
 */
export interface SkillUpdateRequest {
  id: number; // @NotNull
  name: string; // @NotBlank
  level: number; // @Min(0) @Max(100)
  icon: string | null;
  sortOrder: number; // @NotNull
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.skill.BatchDeleteRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/skill/BatchDeleteRequest.java
 */
export interface BatchDeleteRequest {
  ids: number[]; // List<Long> @NotEmpty
}
