// src/types/education.ts

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.education.EducationDto
 */
export interface EducationDto {
  id: number;
  institution: string;
  degree: string;
  field: string | null;
  startDate: string; // YYYY-MM-DD
  endDate: string | null;
  description: string | null;
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.education.EducationCreateRequest
 * Quitamos el ID porque es autogenerado.
 */
export type EducationCreateRequest = Omit<EducationDto, "id">;

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.education.EducationUpdateRequest
 * Es idéntico al DTO (necesita ID y todos los campos).
 */
export type EducationUpdateRequest = EducationDto;
