// src/modules/auth/RegisterPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../services/auth/authStore";
import type { RegisterFormValues } from "../../types/auth/RegisterSchema";
import { RegisterForm } from "./components/RegisterForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from "../../store/themeStore";

export default function RegisterPage() {
  const navigate = useNavigate();

  // Obtenemos la lógica de Zustand
  const { register, isAuthenticated } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirige si ya está logueado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    const { confirmPassword, ...apiData } = data;

    try {
      await register(apiData);

      toast.success("¡Cuenta creada! Bienvenido.");
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        (err.message.includes("Network Error")
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

      <RegisterForm
        onSubmit={handleRegisterSubmit}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
