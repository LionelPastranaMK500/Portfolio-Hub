import { z } from "zod";

export const certificateSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre del certificado es obligatorio")
    .max(150, "El nombre es demasiado largo (máx 150 caracteres)"),
  description: z
    .string()
    .max(500, "La descripción no puede exceder los 500 caracteres")
    .optional()
    .nullable(),
  educationId: z.number().optional().nullable(),
});

// Exportamos el tipo inferido por si lo necesitamos en el front
export type CertificateSchemaType = z.infer<typeof certificateSchema>;
