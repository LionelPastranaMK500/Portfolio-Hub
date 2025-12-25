import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, "El título es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  summary: z
    .string()
    .min(10, "El resumen debe tener al menos 10 caracteres")
    .max(255, "El resumen es muy largo (máx 255)"),
  description: z.string().nullable().optional(),
  repoUrl: z.string().nullable().optional().or(z.literal("")),
  liveUrl: z.string().nullable().optional().or(z.literal("")),
  coverImage: z.string().nullable().optional().or(z.literal("")),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  featured: z.boolean(),
  sortOrder: z.number().min(0, "El orden debe ser mayor o igual a 0"),
});

export type ProjectSchemaType = z.infer<typeof projectSchema>;
