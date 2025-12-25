import { z } from "zod";

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre es muy largo"),
  headline: z
    .string()
    .min(3, "El titular es obligatorio")
    .max(150, "El titular es muy largo"),
  contactEmail: z
    .email("Debe ser un correo válido")
    .min(1, "El correo de contacto es obligatorio"),
  location: z
    .string()
    .max(100, "La ubicación es muy larga")
    .optional()
    .nullable(),
  bio: z
    .string()
    .min(10, "La biografía debe tener al menos 10 caracteres")
    .max(2000, "La biografía excede el límite permitido"),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
