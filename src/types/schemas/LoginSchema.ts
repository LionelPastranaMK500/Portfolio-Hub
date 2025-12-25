import { z } from "zod";

// Definimos el Schema con tu sintaxis de Zod v4
export const loginSchema = z.object({
  email: z.email("Debes ingresar un email válido"),
  password: z.string().min(1, "La contraseña no puede estar vacía"),
});

// Exportamos el tipo inferido
export type LoginFormValues = z.infer<typeof loginSchema>;
