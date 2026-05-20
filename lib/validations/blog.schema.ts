import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").max(200),
  slug: z
    .string()
    .min(1, "El slug es obligatorio")
    .regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras minúsculas, números y guiones"),
  excerpt: z.string().max(500).optional().or(z.literal("")),
  content: z.string().min(1, "El contenido es obligatorio"),
  cover_image: z.string().url().optional().or(z.literal("")),
  category: z.string().min(1, "La categoría es obligatoria").default("general"),
  status: z.enum(["draft", "published"]).default("draft"),
  meta_title: z.string().max(200).optional().or(z.literal("")),
  meta_description: z.string().max(500).optional().or(z.literal("")),
});

export type BlogPostSchema = z.infer<typeof blogPostSchema>;
