// src/types/schemas/RegisterSchema.ts
import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.email("Debes ingresar un email válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Por favor confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
