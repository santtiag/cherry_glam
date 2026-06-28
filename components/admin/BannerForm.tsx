"use client";

import { useState } from "react";
import { createBanner, updateBanner } from "@/lib/actions/banners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Banner } from "@/types/banner";

interface BannerFormProps {
  banner?: Banner;
  onSuccess?: () => void;
}

export function BannerForm({ banner, onSuccess }: BannerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError("");

    try {
      const data = {
        title: formData.get("title") as string,
        subtitle: (formData.get("subtitle") as string) || undefined,
        image_url: formData.get("image_url") as string,
        link: (formData.get("link") as string) || undefined,
        start_date: formData.get("start_date") as string,
        end_date: (formData.get("end_date") as string) || undefined,
        is_active: formData.get("is_active") === "on",
        sort_order: parseInt(formData.get("sort_order") as string) || 0,
      };

      if (banner) {
        await updateBanner(banner.id, data);
      } else {
        await createBanner(data);
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
          defaultValue={banner?.title}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtítulo</Label>
        <Textarea
          id="subtitle"
          name="subtitle"
          defaultValue={banner?.subtitle || ""}
          rows={2}
        />
      </div>

      <ImageUpload
        name="image_url"
        label="Imagen"
        defaultValue={banner?.image_url}
        required
      />

      <div className="space-y-2">
        <Label htmlFor="link">Link (CTA)</Label>
        <Input
          id="link"
          name="link"
          type="url"
          defaultValue={banner?.link || ""}
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start_date">Fecha Inicio *</Label>
          <Input
            id="start_date"
            name="start_date"
            type="date"
            defaultValue={
              banner?.start_date || new Date().toISOString().split("T")[0]
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end_date">Fecha Fin</Label>
          <Input
            id="end_date"
            name="end_date"
            type="date"
            defaultValue={banner?.end_date || ""}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort_order">Orden</Label>
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={banner?.sort_order || 0}
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="is_active"
          name="is_active"
          defaultChecked={banner?.is_active ?? true}
        />
        <Label htmlFor="is_active">Activo</Label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-cherry hover:bg-cherry-dark text-white"
      >
        {isSubmitting
          ? "Guardando..."
          : banner
          ? "Actualizar Banner"
          : "Crear Banner"}
      </Button>
    </form>
  );
}
