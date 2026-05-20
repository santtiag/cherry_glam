"use client";

import { useState } from "react";
import { createTestimonial, updateTestimonial } from "@/lib/actions/testimonials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialFormProps {
  testimonial?: Testimonial;
  onSuccess?: () => void;
}

export function TestimonialForm({ testimonial, onSuccess }: TestimonialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError("");

    try {
      const data = {
        name: formData.get("name") as string,
        avatar_url: (formData.get("avatar_url") as string) || undefined,
        rating: parseInt(formData.get("rating") as string) || 5,
        message: formData.get("message") as string,
        testimonial_date:
          (formData.get("testimonial_date") as string) ||
          new Date().toISOString().split("T")[0],
        is_active: formData.get("is_active") === "on",
        sort_order: parseInt(formData.get("sort_order") as string) || 0,
      };

      if (testimonial) {
        await updateTestimonial(testimonial.id, data);
      } else {
        await createTestimonial(data);
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
        <Label htmlFor="name">Nombre *</Label>
        <Input
          id="name"
          name="name"
          defaultValue={testimonial?.name}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="avatar_url">URL de Foto</Label>
        <Input
          id="avatar_url"
          name="avatar_url"
          type="url"
          defaultValue={testimonial?.avatar_url || ""}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Calificación (1-5) *</Label>
        <Input
          id="rating"
          name="rating"
          type="number"
          min={1}
          max={5}
          defaultValue={testimonial?.rating || 5}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje *</Label>
        <Textarea
          id="message"
          name="message"
          defaultValue={testimonial?.message}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="testimonial_date">Fecha del Testimonio</Label>
        <Input
          id="testimonial_date"
          name="testimonial_date"
          type="date"
          defaultValue={
            testimonial?.testimonial_date ||
            new Date().toISOString().split("T")[0]
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort_order">Orden</Label>
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={testimonial?.sort_order || 0}
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="is_active"
          name="is_active"
          defaultChecked={testimonial?.is_active ?? true}
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
          : testimonial
          ? "Actualizar Testimonio"
          : "Crear Testimonio"}
      </Button>
    </form>
  );
}
