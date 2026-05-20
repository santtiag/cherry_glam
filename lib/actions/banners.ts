"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { bannerSchema } from "@/lib/validations/banner.schema";
import { revalidatePath } from "next/cache";
import type { BannerFormData } from "@/types/banner";

export async function getActiveBanners() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("is_active", true)
    .gte("end_date", new Date().toISOString().split("T")[0])
    .lte("start_date", new Date().toISOString().split("T")[0])
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getAllBanners() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createBanner(formData: BannerFormData) {
  const validated = bannerSchema.parse(formData);
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("banners")
    .insert(validated)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/");
  return data;
}

export async function updateBanner(id: string, formData: BannerFormData) {
  const validated = bannerSchema.parse(formData);
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("banners")
    .update(validated)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/");
  return data;
}

export async function deleteBanner(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("banners").delete().eq("id", id);

  if (error) throw error;
  revalidatePath("/");
}
