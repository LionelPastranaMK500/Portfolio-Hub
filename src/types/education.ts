// src/types/education.ts

/**
 * Representa una entrada de educación (basado en EducationDto.java)
 *
 */
export interface EducationDto {
  id: number;
  institution: string;
  degree: string;
  field: string | null;
  startDate: string; // (LocalDate se convierte en string ISO "YYYY-MM-DD")
  endDate: string | null;
  description: string | null;
}

/**
 * Datos para crear una entrada de educación (basado en EducationCreateRequest.java)
 *
 */
export type EducationCreateRequest = Omit<EducationDto, "id">;

/**
 * Datos para actualizar una entrada de educación (basado en EducationUpdateRequest.java)
 *
 */
export type EducationUpdateRequest = EducationDto;
