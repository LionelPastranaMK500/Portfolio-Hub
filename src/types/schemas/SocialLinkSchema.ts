import { z } from "zod";

export const socialLinkSchema = z.object({
  platform: z
    .string()
    .min(1, "El nombre de la plataforma es obligatorio")
    .max(50, "Máximo 50 caracteres"),

  url: z
    .url("Debe ser una URL válida (https://...)")
    .min(1, "La URL es obligatoria"),

  sortOrder: z
    .number()
    .int("El orden debe ser un número entero")
    .min(0, "El orden debe ser positivo"),
});

export type SocialLinkSchemaType = z.infer<typeof socialLinkSchema>;
