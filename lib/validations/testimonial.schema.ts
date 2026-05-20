import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(200),
  avatar_url: z.string().url().optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5).default(5),
  message: z.string().min(1, "El mensaje es obligatorio").max(1000),
  testimonial_date: z.string().min(1, "La fecha es obligatoria"),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().min(0).default(0),
});

export type TestimonialSchema = z.infer<typeof testimonialSchema>;
