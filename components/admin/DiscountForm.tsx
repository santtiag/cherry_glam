"use client";

import { useState } from "react";
import { createDiscount, updateDiscount } from "@/lib/actions/discounts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Discount, DiscountType } from "@/types/discount";

interface DiscountFormProps {
  discount?: Discount;
  onSuccess?: () => void;
}

export function DiscountForm({ discount, onSuccess }: DiscountFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError("");

    try {
      const data = {
        title: formData.get("title") as string,
        description: (formData.get("description") as string) || undefined,
        code: (formData.get("code") as string) || undefined,
        type: formData.get("type") as DiscountType,
        value: parseFloat(formData.get("value") as string) || 0,
        image_url: (formData.get("image_url") as string) || undefined,
        link: (formData.get("link") as string) || undefined,
        starts_at: formData.get("starts_at") as string,
        ends_at: (formData.get("ends_at") as string) || undefined,
        is_active: formData.get("is_active") === "on",
        sort_order: parseInt(formData.get("sort_order") as string) || 0,
      };

      if (discount) {
        await updateDiscount(discount.id, data);
      } else {
        await createDiscount(data);
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
          defaultValue={discount?.title}
          required
          placeholder="20% en sets de labiales"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={discount?.description || ""}
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo *</Label>
          <select
            id="type"
            name="type"
            defaultValue={discount?.type || "percent"}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <option value="percent">Porcentaje (%)</option>
            <option value="fixed">Monto fijo ($)</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="value">Valor *</Label>
          <Input
            id="value"
            name="value"
            type="number"
            step="0.01"
            min={0}
            defaultValue={discount?.value ?? 0}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="code">Código (opcional)</Label>
        <Input
          id="code"
          name="code"
          defaultValue={discount?.code || ""}
          placeholder="CHERRY20"
        />
      </div>

      <ImageUpload
        name="image_url"
        label="Imagen (opcional)"
        defaultValue={discount?.image_url || ""}
      />

      <div className="space-y-2">
        <Label htmlFor="link">Link (CTA)</Label>
        <Input
          id="link"
          name="link"
          type="url"
          defaultValue={discount?.link || ""}
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="starts_at">Fecha Inicio *</Label>
          <Input
            id="starts_at"
            name="starts_at"
            type="date"
            defaultValue={
              discount?.starts_at || new Date().toISOString().split("T")[0]
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ends_at">Fecha Fin</Label>
          <Input
            id="ends_at"
            name="ends_at"
            type="date"
            defaultValue={discount?.ends_at || ""}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort_order">Orden</Label>
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={discount?.sort_order || 0}
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="is_active"
          name="is_active"
          defaultChecked={discount?.is_active ?? true}
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
          : discount
          ? "Actualizar Descuento"
          : "Crear Descuento"}
      </Button>
    </form>
  );
}
