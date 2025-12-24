import apiClient from "../config/api";
import type { ApiResponse } from "../types/api/ApiResponse";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/models/Auth";

/**
 * ESPEJO DE: AuthController.java
 * Backend: src/main/java/studios/tkoh/portfolio/controller/AuthController.java
 */
export const authService = {
  /**
   * @PostMapping("/register")
   */
  register: async (request: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      request
    );
    return response.data.data;
  },

  /**
   * @PostMapping("/login")
   */
  login: async (request: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      request
    );
    return response.data.data;
  },
};
