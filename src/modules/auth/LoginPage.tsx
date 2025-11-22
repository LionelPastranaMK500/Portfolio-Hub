// src/modules/auth/LoginPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../services/auth/authStore";
import type { LoginFormValues } from "../../types/auth/LoginSchema";
import { LoginForm } from "./components/LoginForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from "../../store/themeStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await login(data);
      toast.success("¡Bienvenido de nuevo!");
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        (err.message?.includes("401")
          ? "Email o contraseña incorrectos."
          : null) ||
        (err.message?.includes("Network Error")
          ? "No se pudo conectar al servidor."
          : null) ||
        "Ocurrió un error inesperado.";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-[calc(100vh-148px)]">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme={useThemeStore.getState().theme}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <LoginForm
        onSubmit={handleLoginSubmit}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
