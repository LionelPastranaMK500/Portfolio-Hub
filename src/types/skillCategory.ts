// src/types/skillCategory.ts
import type { SkillDto } from "./skill";

/**
 * Representa una categoría de habilidad (basado en SkillCategoryDto.java)
 *
 */
export interface SkillCategoryDto {
  id: number;
  name: string;
  sortOrder: number;
  skills: SkillDto[];
}

/**
 * Datos para crear una SkillCategory (basado en SkillCategoryCreateRequest.java)
 *
 */
export type SkillCategoryCreateRequest = Omit<
  SkillCategoryDto,
  "id" | "skills"
>;

/**
 * Datos para actualizar una SkillCategory (basado en SkillCategoryUpdateRequest.java)
 *
 */
export type SkillCategoryUpdateRequest = Omit<SkillCategoryDto, "skills">;

/**
 * Datos para eliminar en lote (basado en BatchDeleteRequest.java)
 *
 */
export interface BatchDeleteRequest {
  ids: number[];
}
