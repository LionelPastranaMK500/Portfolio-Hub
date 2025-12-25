import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(1, "La empresa es obligatoria"),
  role: z.string().min(1, "El cargo es obligatorio"),
  location: z.string().nullable().optional(),

  startDate: z.date(),

  endDate: z.date().nullable().optional(),

  current: z.boolean(),

  description: z.string().max(2000).nullable().optional(),
});

export type ExperienceSchemaType = z.infer<typeof experienceSchema>;
