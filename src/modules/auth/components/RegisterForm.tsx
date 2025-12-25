import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import {
  registerSchema,
  type RegisterFormValues,
} from "../../../types/schemas/RegisterSchema";
import { useAuth } from "../../../hooks/useAuth";
import { cn } from "../../../utils/cn";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser, isRegistering } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    registerUser(data, {
      onSuccess: () => {
        // Al registrarse exitosamente, el hook useAuth ya guarda el token
        // Redirigimos al onboarding o al perfil
        navigate("/dashboard/profile");
      },
      onError: (err: any) => {
        // Manejo de errores (ej: Email ya existe)
        const msg = err?.response?.data?.message || "Error al crear la cuenta.";
        setServerError(msg);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 w-full max-w-sm mx-auto"
    >
      {/* ERROR FEEDBACK */}
      {serverError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-sm flex items-center gap-2"
        >
          <AlertCircle size={16} />
          {serverError}
        </motion.div>
      )}

      {/* NOMBRE COMPLETO */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 ml-1">
          Nombre Completo
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User
              size={18}
              className="text-gray-500 group-focus-within:text-cyan-400 transition-colors"
            />
          </div>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Juan Pérez"
            className={cn(
              "w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 transition-all outline-none",
              "focus:border-cyan-500/50 focus:bg-black/40 focus:ring-1 focus:ring-cyan-500/20",
              errors.fullName &&
                "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
            )}
          />
        </div>
        {errors.fullName && (
          <span className="text-xs text-red-400 ml-1">
            {errors.fullName.message}
          </span>
        )}
      </div>

      {/* EMAIL */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 ml-1">
          Correo Electrónico
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail
              size={18}
              className="text-gray-500 group-focus-within:text-cyan-400 transition-colors"
            />
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="juan@ejemplo.com"
            className={cn(
              "w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 transition-all outline-none",
              "focus:border-cyan-500/50 focus:bg-black/40 focus:ring-1 focus:ring-cyan-500/20",
              errors.email &&
                "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
            )}
          />
        </div>
        {errors.email && (
          <span className="text-xs text-red-400 ml-1">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* PASSWORD */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 ml-1">
          Contraseña
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock
              size={18}
              className="text-gray-500 group-focus-within:text-cyan-400 transition-colors"
            />
          </div>
          <input
            {...register("password")}
            type="password"
            placeholder="Mínimo 8 caracteres"
            className={cn(
              "w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 transition-all outline-none",
              "focus:border-cyan-500/50 focus:bg-black/40 focus:ring-1 focus:ring-cyan-500/20",
              errors.password &&
                "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
            )}
          />
        </div>
        {errors.password && (
          <span className="text-xs text-red-400 ml-1">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* BUTTON */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isRegistering}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-900/20 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
      >
        {isRegistering ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            Crear Cuenta <UserPlus size={18} />
          </>
        )}
      </motion.button>

      {/* FOOTER */}
      <div className="text-center space-y-4 pt-2">
        <p className="text-sm text-gray-400">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </form>
  );
};
