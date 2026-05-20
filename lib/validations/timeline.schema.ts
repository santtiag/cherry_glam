import { z } from "zod";

export const timelineEventSchema = z.object({
  year: z.number().int().min(2000).max(2100),
  title: z.string().min(1, "El título es obligatorio").max(200),
  description: z.string().min(1, "La descripción es obligatoria").max(1000),
  icon: z.string().max(100).default("Sparkles"),
  sort_order: z.number().int().min(0).default(0),
});

export type TimelineEventSchema = z.infer<typeof timelineEventSchema>;
