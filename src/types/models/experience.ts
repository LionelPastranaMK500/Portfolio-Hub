// src/types/experience.ts

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.experience.ExperienceDto
 * Backend: src/main/java/studios/tkoh/portfolio/dto/experience/ExperienceDto.java
 */
export interface ExperienceDto {
  id: number;
  company: string;
  role: string;
  location: string | null; // No tiene @NotBlank, puede ser null
  startDate: string; // YYYY-MM-DD
  endDate: string | null;
  current: boolean;
  description: string | null;
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.experience.ExperienceCreateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/experience/ExperienceCreateRequest.java
 * Usamos Omit porque es idéntico al DTO pero sin el ID autogenerado.
 */
export type ExperienceCreateRequest = Omit<ExperienceDto, "id">;

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.experience.ExperienceUpdateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/experience/ExperienceUpdateRequest.java
 * Es idéntico al DTO (requiere ID y todos los campos).
 */
export type ExperienceUpdateRequest = ExperienceDto;
