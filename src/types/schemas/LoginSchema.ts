// src/types/auth/LoginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Debes ingresar un email válido"),
  password: z.string().min(1, "La contraseña no puede estar vacía"),
});

// Exportamos el tipo inferido para usarlo en nuestro formulario
export type LoginFormValues = z.infer<typeof loginSchema>;
