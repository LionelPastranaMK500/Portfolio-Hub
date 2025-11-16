// src/types/experience.ts

/**
 * Representa una experiencia laboral (basado en ExperienceDto.java)
 *
 */
export interface ExperienceDto {
  id: number;
  company: string;
  role: string;
  location: string | null;
  startDate: string; // (LocalDate se convierte en string ISO "YYYY-MM-DD")
  endDate: string | null;
  current: boolean;
  description: string | null;
}

/**
 * Datos para crear una experiencia (basado en ExperienceCreateRequest.java)
 *
 */
export type ExperienceCreateRequest = Omit<ExperienceDto, "id">;

/**
 * Datos para actualizar una experiencia (basado en ExperienceUpdateRequest.java)
 *
 */
export type ExperienceUpdateRequest = ExperienceDto;
