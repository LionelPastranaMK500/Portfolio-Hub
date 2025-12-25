import { z } from "zod";

// --- CATEGORÍA ---
export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(50, "Máximo 50 caracteres"),
  sortOrder: z.number().int().min(0, "Orden debe ser positivo"),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;

// --- SKILL ---
export const skillSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  level: z.number().min(0).max(100, "El nivel debe ser entre 0 y 100"),
  icon: z.string().nullable().optional().or(z.literal("")),
  sortOrder: z.number().int().min(0, "Orden debe ser positivo"),
});

export type SkillSchemaType = z.infer<typeof skillSchema>;
