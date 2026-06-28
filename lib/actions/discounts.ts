"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { discountSchema } from "@/lib/validations/discount.schema";
import { revalidatePath } from "next/cache";
import type { DiscountFormData } from "@/types/discount";

export async function getActiveDiscounts() {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("discounts")
    .select("*")
    .eq("is_active", true)
    .lte("starts_at", today)
    .or(`ends_at.gte.${today},ends_at.is.null`)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getAllDiscounts() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("discounts")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createDiscount(formData: DiscountFormData) {
  const validated = discountSchema.parse(formData);
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("discounts")
    .insert(validated)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/catalogo");
  return data;
}

export async function updateDiscount(id: string, formData: DiscountFormData) {
  const validated = discountSchema.parse(formData);
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("discounts")
    .update(validated)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/catalogo");
  return data;
}

export async function deleteDiscount(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("discounts").delete().eq("id", id);

  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/catalogo");
}
