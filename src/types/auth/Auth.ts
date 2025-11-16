// src/types/auth/Auth.ts

// Basado en LoginRequest.java
export interface LoginCredentials {
  email: string;
  password: string;
}

// Basado en RegisterRequest.java
export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
}

// Basado en AuthResponse.java
export interface AuthResponse {
  token: string;
}
