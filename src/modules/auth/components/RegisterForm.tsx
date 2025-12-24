// src/modules/auth/components/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../../types/schemas/RegisterSchema";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { FaUserPlus, FaSpinner } from "react-icons/fa";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormValues) => void;
  isLoading: boolean;
  error: string | null;
}

export function RegisterForm({
  onSubmit,
  isLoading,
  error,
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const inputStyle =
    "w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 dark:bg-gray-800/50 dark:border-gray-700 " +
    "text-white dark:text-gray-200 placeholder:text-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300";

  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareBorderRadius="1rem"
      className="w-full max-w-md"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 md:p-10 rounded-2xl 
                   bg-white/10 dark:bg-gray-900/50 
                   border border-gray-700/50 shadow-2xl backdrop-blur-lg"
      >
        <h2 className="font-maven text-3xl font-bold text-center text-white mb-2">
          Crear Cuenta
        </h2>
        <p className="text-center text-gray-300 dark:text-gray-400 mb-8 font-maven">
          Únete al Portfolio Hub.
        </p>

        {error && (
          <div className="w-full p-3 mb-4 rounded-lg bg-red-500/20 border border-red-500 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* --- Campo Full Name --- */}
        <div className="mb-6">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Nombre Completo
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Tu nombre y apellido"
            className={`${inputStyle} ${
              errors.fullName ? "ring-2 ring-red-500" : ""
            }`}
            {...register("fullName")}
            disabled={isLoading}
          />
          {errors.fullName && (
            <p className="text-red-400 text-sm mt-2">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* --- Campo Email --- */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            className={`${inputStyle} ${
              errors.email ? "ring-2 ring-red-500" : ""
            }`}
            {...register("email")}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        {/* --- Campo Contraseña --- */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            className={`${inputStyle} ${
              errors.password ? "ring-2 ring-red-500" : ""
            }`}
            {...register("password")}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* --- Campo Confirmar Contraseña --- */}
        <div className="mb-8">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Repite tu contraseña"
            className={`${inputStyle} ${
              errors.confirmPassword ? "ring-2 ring-red-500" : ""
            }`}
            {...register("confirmPassword")}
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* --- Botón de Submit --- */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-lg font-maven font-semibold 
                     text-white bg-cyan-600 hover:bg-cyan-500 
                     transition-all duration-300 ease-in-out
                     hover:scale-105 active:scale-95
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <FaSpinner className="h-5 w-5 animate-spin" />
          ) : (
            <FaUserPlus className="h-5 w-5" />
          )}
          <span>{isLoading ? "Creando cuenta..." : "Crear Cuenta"}</span>
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="font-medium text-cyan-400 hover:text-cyan-300 underline"
          >
            Inicia sesión
          </Link>
        </p>
      </form>
    </Tilt>
  );
}
