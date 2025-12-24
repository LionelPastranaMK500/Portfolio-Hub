import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import type { LoginRequest, RegisterRequest } from "../types/models/Auth";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  // --- MUTATION: LOGIN ---
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),

    onSuccess: async (data) => {
      console.log("Login exitoso, guardando sesión...");
      if (data.token) {
        setToken(data.token);
        await fetchUser();
      }
    },
    onError: (error: any) => {
      console.error("Error en login:", error);
    },
  });

  // --- MUTATION: REGISTER ---
  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterRequest) =>
      authService.register(credentials),

    onSuccess: async (data) => {
      if (data.token) {
        setToken(data.token);
        await fetchUser();
      }
    },
    onError: (error: any) => {
      console.error("Error en registro:", error);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
  };
};
