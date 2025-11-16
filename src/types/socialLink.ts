// src/types/socialLink.ts

/**
 * Representa un enlace social (basado en SocialLinkDto.java)
 *
 */
export interface SocialLinkDto {
  id: number;
  platform: string;
  url: string;
  sortOrder: number;
}

/**
 * Datos para crear un enlace social (basado en SocialLinkCreateRequest.java)
 *
 */
export type SocialLinkCreateRequest = Omit<SocialLinkDto, "id">;

/**
 * Datos para actualizar un enlace social (basado en SocialLinkUpdateRequest.java)
 *
 */
export type SocialLinkUpdateRequest = SocialLinkDto;
