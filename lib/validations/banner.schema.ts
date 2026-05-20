import { z } from "zod";

export const bannerSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").max(200),
  subtitle: z.string().max(500).optional(),
  image_url: z.string().min(1, "La imagen es obligatoria"),
  link: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  start_date: z.string().min(1, "La fecha de inicio es obligatoria"),
  end_date: z.string().optional().or(z.literal("")),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().min(0).default(0),
});

export type BannerSchema = z.infer<typeof bannerSchema>;
