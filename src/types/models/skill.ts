// src/types/skill.ts

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.skill.SkillDto
 * Backend: src/main/java/studios/tkoh/portfolio/dto/skill/SkillDto.java
 * Nota: El DTO de lectura no expone 'sortOrder' en el record Java proporcionado.
 */
export interface SkillDto {
  id: number;
  name: string;
  level: number; // Java short -> TS number
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
  sortOrder: number; // @NotNull - Este campo existe aquí pero no en SkillDto (Java)
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
 * Usado para borrar múltiples skills a la vez.
 */
export interface BatchDeleteRequest {
  ids: number[]; // List<Long>
}
