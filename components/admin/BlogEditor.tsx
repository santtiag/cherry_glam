"use client";

import { useState } from "react";
import { createBlogPost, updateBlogPost } from "@/lib/actions/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { BlogPost } from "@/types/blog";

interface BlogEditorProps {
  post?: BlogPost;
  onSuccess?: () => void;
}

export function BlogEditor({ post, onSuccess }: BlogEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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

      <div className="space-y-2">
        <Label htmlFor="cover_image">URL de Portada</Label>
        <Input
          id="cover_image"
          name="cover_image"
          type="url"
          defaultValue={post?.cover_image || ""}
          placeholder="https://..."
        />
      </div>

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
        <Textarea
          id="content"
          name="content"
          defaultValue={post?.content}
          rows={12}
          required
        />
        <p className="text-xs text-muted-foreground">Soporta HTML básico.</p>
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
