// src/types/certificate.ts

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.certificate.CertificateDto
 */
export interface CertificateDto {
  id: number;
  educationId: number | null;
  name: string;
  description: string | null;
  imageUrl: string | null;
  fileId: string | null;
}

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.certificate.CertificateCreateRequest
 * Usamos Omit para quitar lo que el backend genera o no pide al crear.
 */
export type CertificateCreateRequest = Omit<
  CertificateDto,
  "id" | "imageUrl" | "fileId"
>;

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.certificate.CertificateUpdateRequest
 * El update pide ID + datos de texto, pero no maneja la subida de imagen directamente aquí.
 */
export type CertificateUpdateRequest = Omit<
  CertificateDto,
  "imageUrl" | "fileId"
>;
