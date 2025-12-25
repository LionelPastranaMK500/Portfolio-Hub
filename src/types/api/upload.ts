// src/types/api/upload.ts

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.upload.UploadResponse
 * Backend: src/main/java/studios/tkoh/portfolio/dto/upload/UploadResponse.java
 * Se usa cuando el backend confirma que un archivo se subió correctamente.
 */
export interface UploadResponse {
  fileId: string;
  publicUrl: string;
}
