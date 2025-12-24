// src/types/profile.ts

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.profile.ProfileDto
 * Backend: src/main/java/studios/tkoh/portfolio/dto/profile/ProfileDto.java
 */
export interface ProfileDto {
  id: number;
  slug: string;
  fullName: string;
  headline: string;
  bio: string;
  contactEmail: string;
  location: string | null;
  avatarUrl: string | null;
  resumeUrl: string | null;
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.profile.ProfileUpdateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/profile/ProfileUpdateRequest.java
 * Usamos Pick porque son exactamente estos 5 campos los que se permiten editar (sin slug, ni avatar, ni id).
 */
export type ProfileUpdateRequest = Pick<
  ProfileDto,
  "fullName" | "headline" | "bio" | "contactEmail" | "location"
>;

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.profile.ContactEmailUpdateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/profile/ContactEmailUpdateRequest.java
 */
export interface ContactEmailUpdateRequest {
  email: string; // @NotBlank @Email
}
