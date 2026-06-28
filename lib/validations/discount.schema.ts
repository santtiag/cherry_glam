import { z } from "zod";

export const discountSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").max(200),
  description: z.string().max(500).optional().or(z.literal("")),
  code: z.string().max(50).optional().or(z.literal("")),
  type: z.enum(["percent", "fixed"]).default("percent"),
  value: z.number().min(0, "El valor no puede ser negativo"),
  image_url: z.string().optional().or(z.literal("")),
  link: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  starts_at: z.string().min(1, "La fecha de inicio es obligatoria"),
  ends_at: z.string().optional().or(z.literal("")),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().min(0).default(0),
});

export type DiscountSchema = z.infer<typeof discountSchema>;
