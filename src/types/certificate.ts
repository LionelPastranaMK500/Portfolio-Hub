// src/types/certificate.ts

/**
 * Representa un certificado (basado en CertificateDto.java)
 *
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
 * Datos para crear un certificado (basado en CertificateCreateRequest.java)
 *
 */
export interface CertificateCreateRequest {
  name: string;
  description: string | null;
  educationId: number | null;
}

/**
 * Datos para actualizar un certificado (basado en CertificateUpdateRequest.java)
 *
 */
export interface CertificateUpdateRequest {
  id: number;
  name: string;
  description: string | null;
  educationId: number | null;
}
