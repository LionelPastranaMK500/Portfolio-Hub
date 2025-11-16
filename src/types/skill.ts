// src/types/skill.ts

/**
 * Representa una habilidad (basado en SkillDto.java)
 *
 */
export interface SkillDto {
  id: number;
  name: string;
  level: number;
  icon: string | null;
}

/**
 * Datos para crear un Skill (basado en SkillCreateRequest.java)
 *
 */
export interface SkillCreateRequest {
  name: string;
  level: number;
  icon: string | null;
  sortOrder: number;
}

/**
 * Datos para actualizar un Skill (basado en SkillUpdateRequest.java)
 *
 */
export interface SkillUpdateRequest {
  id: number;
  name: string;
  level: number;
  icon: string | null;
  sortOrder: number;
}

/**
 * Datos para eliminar en lote (basado en BatchDeleteRequest.java)
 *
 */
export interface BatchDeleteRequest {
  ids: number[];
}
