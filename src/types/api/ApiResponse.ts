// src/types/api/ApiResponse.ts

/**
 * ESPEJO DE: studios.tkoh.portfolio.dto.response.ApiResponse
 * Backend: src/main/java/studios/tkoh/portfolio/dto/response/ApiResponse.java
 * Wrapper genérico para todas las respuestas HTTP de la API.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T; // El dato real (User, ProjectDto, lista, etc.)
  timestamp: string; // Java Instant se serializa como String ISO (ej: "2023-12-24T10:00:00Z")
}
