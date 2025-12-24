// src/types/socialLink.ts

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.social.SocialLinkDto
 * Backend: src/main/java/studios/tkoh/portfolio/dto/social/SocialLinkDto.java
 */
export interface SocialLinkDto {
  id: number;
  platform: string;
  url: string;
  sortOrder: number;
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.social.SocialLinkCreateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/social/SocialLinkCreateRequest.java
 * Omitimos 'id' porque se genera en base de datos.
 */
export type SocialLinkCreateRequest = Omit<SocialLinkDto, "id">;

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.social.SocialLinkUpdateRequest
 * Backend: src/main/java/studios/tkoh/portfolio/dto/social/SocialLinkUpdateRequest.java
 * Requiere 'id' y todos los datos para actualizar.
 */
export type SocialLinkUpdateRequest = SocialLinkDto;
