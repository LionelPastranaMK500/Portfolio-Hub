import { z } from "zod";

export const educationSchema = z.object({
  institution: z
    .string()
    .min(1, "El nombre de la institución es obligatorio")
    .max(150, "El nombre es muy largo"),
  degree: z
    .string()
    .min(1, "El título/grado es obligatorio")
    .max(150, "El título es muy largo"),
  field: z.string().optional().nullable(),

  startDate: z.date(),

  endDate: z.date().optional().nullable(),

  description: z
    .string()
    .max(1000, "La descripción es muy larga")
    .optional()
    .nullable(),
});

export type EducationSchemaType = z.infer<typeof educationSchema>;
