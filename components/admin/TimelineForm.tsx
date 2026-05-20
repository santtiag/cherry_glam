"use client";

import { useState } from "react";
import { createTimelineEvent, updateTimelineEvent } from "@/lib/actions/timeline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TimelineEvent } from "@/types/timeline";

interface TimelineFormProps {
  event?: TimelineEvent;
  onSuccess?: () => void;
}

export function TimelineForm({ event, onSuccess }: TimelineFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError("");

    try {
      const data = {
        year: parseInt(formData.get("year") as string),
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        icon: (formData.get("icon") as string) || "Sparkles",
        sort_order: parseInt(formData.get("sort_order") as string) || 0,
      };

      if (event) {
        await updateTimelineEvent(event.id, data);
      } else {
        await createTimelineEvent(data);
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
        <Label htmlFor="year">Año *</Label>
        <Input
          id="year"
          name="year"
          type="number"
          defaultValue={event?.year || new Date().getFullYear()}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título *</Label>
        <Input
          id="title"
          name="title"
          defaultValue={event?.title}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción *</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={event?.description}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon">Icono (nombre Lucide)</Label>
        <Input
          id="icon"
          name="icon"
          defaultValue={event?.icon || "Sparkles"}
          placeholder="Sparkles, Heart, Star, etc."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort_order">Orden</Label>
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={event?.sort_order || 0}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-cherry hover:bg-cherry-dark text-white"
      >
        {isSubmitting
          ? "Guardando..."
          : event
          ? "Actualizar Evento"
          : "Crear Evento"}
      </Button>
    </form>
  );
}
