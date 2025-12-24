// src/types/models/Auth.ts
import type { ProfileDto } from "./profile";

/**
 * ESPEJO DE: package studios.tkoh.portfolio.dto.auth.LoginRequest
 * Ubicación Backend: src/main/java/studios/tkoh/portfolio/dto/auth/LoginRequest.java
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * ESPEJO DE: package studios.tkoh.portfolio.dto.auth.RegisterRequest
 * Ubicación Backend: src/main/java/studios/tkoh/portfolio/dto/auth/RegisterRequest.java
 */
export interface RegisterRequest {
  fullName: string; // En Java: @Size(min = 3, max = 120)
  email: string; // En Java: @Email, @Size(max = 150)
  password: string; // En Java: @Size(min = 8, max = 100)
}

/**
 * ESPEJO DE: package studios.tkoh.portfolio.dto.auth.AuthResponse
 * Ubicación Backend: src/main/java/studios/tkoh/portfolio/dto/auth/AuthResponse.java
 */
export interface AuthResponse {
  token: string;
}

/**
 * --- FRONTEND STATE ---
 * Interfaz para el estado global de autenticación (Zustand).
 * No es un espejo del backend, pero es vital para el Auth.
 */
export interface AuthState {
  user: ProfileDto | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  // Acciones
  setToken: (token: string) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}
