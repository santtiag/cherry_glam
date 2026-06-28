"use client";

import { useRef, useState } from "react";
import { createBlogPost, updateBlogPost } from "@/lib/actions/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Bold, Italic, Link2, List, Heading } from "lucide-react";
import type { BlogPost } from "@/types/blog";

interface BlogEditorProps {
  post?: BlogPost;
  onSuccess?: () => void;
}

export function BlogEditor({ post, onSuccess }: BlogEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Envuelve la selección del textarea con tags HTML (sin librerías).
  function wrap(before: string, after: string) {
    const el = contentRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const selected = value.slice(s, e) || "texto";
    el.value = value.slice(0, s) + before + selected + after + value.slice(e);
    el.focus();
    el.setSelectionRange(s + before.length, s + before.length + selected.length);
  }

  const tools = [
    { icon: Bold, label: "Negrita", action: () => wrap("<strong>", "</strong>") },
    { icon: Italic, label: "Itálica", action: () => wrap("<em>", "</em>") },
    { icon: Heading, label: "Subtítulo", action: () => wrap("<h2>", "</h2>") },
    { icon: List, label: "Lista", action: () => wrap("<ul>\n  <li>", "</li>\n</ul>") },
    { icon: Link2, label: "Enlace", action: () => wrap('<a href="https://">', "</a>") },
  ];

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError("");

    try {
      const data = {
        title: formData.get("title") as string,
        slug: (formData.get("slug") as string) || undefined,
        excerpt: (formData.get("excerpt") as string) || undefined,
        content: formData.get("content") as string,
        cover_image: (formData.get("cover_image") as string) || undefined,
        category: formData.get("category") as string,
        status: (formData.get("is_published") === "on" ? "published" : "draft") as "published" | "draft",
        meta_title: (formData.get("meta_title") as string) || undefined,
        meta_description:
          (formData.get("meta_description") as string) || undefined,
      };

      if (post) {
        await updateBlogPost(post.id, data);
      } else {
        await createBlogPost(data);
      }

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Título *</Label>
        <Input
          id="title"
          name="title"
          defaultValue={post?.title}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug (dejar en blanco para generar automático)</Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={post?.slug}
          placeholder="mi-publicacion"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Extracto</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          defaultValue={post?.excerpt || ""}
          rows={2}
        />
      </div>

      <ImageUpload
        name="cover_image"
        label="Imagen de portada"
        defaultValue={post?.cover_image || ""}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoría *</Label>
          <Input
            id="category"
            name="category"
            defaultValue={post?.category || "general"}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Contenido *</Label>
        <div className="flex flex-wrap gap-1 rounded-t-lg border border-b-0 border-input bg-cherry-50/50 p-1.5">
          {tools.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={t.action}
              title={t.label}
              aria-label={t.label}
              className="flex h-8 w-8 items-center justify-center rounded-md text-cherry transition-colors hover:bg-cherry hover:text-white"
            >
              <t.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
        <Textarea
          id="content"
          name="content"
          ref={contentRef}
          defaultValue={post?.content}
          rows={12}
          required
          className="rounded-t-none"
        />
        <p className="text-xs text-muted-foreground">
          Selecciona texto y usa los botones para dar formato. Soporta HTML.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="meta_title">Meta Título (SEO)</Label>
        <Input
          id="meta_title"
          name="meta_title"
          defaultValue={post?.meta_title || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="meta_description">Meta Descripción (SEO)</Label>
        <Textarea
          id="meta_description"
          name="meta_description"
          defaultValue={post?.meta_description || ""}
          rows={2}
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="is_published"
          name="is_published"
          defaultChecked={post?.status === "published"}
        />
        <Label htmlFor="is_published">Publicado</Label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-cherry hover:bg-cherry-dark text-white"
      >
        {isSubmitting
          ? "Guardando..."
          : post
          ? "Actualizar Entrada"
          : "Crear Entrada"}
      </Button>
    </form>
  );
}
