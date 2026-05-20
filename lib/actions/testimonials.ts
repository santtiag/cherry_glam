"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { testimonialSchema } from "@/lib/validations/testimonial.schema";
import { revalidatePath } from "next/cache";
import type { TestimonialFormData } from "@/types/testimonial";

export async function getActiveTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getAllTestimonials() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createTestimonial(formData: TestimonialFormData) {
  const validated = testimonialSchema.parse(formData);
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("testimonials")
    .insert(validated)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/");
  return data;
}

export async function updateTestimonial(
  id: string,
  formData: TestimonialFormData
) {
  const validated = testimonialSchema.parse(formData);
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("testimonials")
    .update(validated)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/");
  return data;
}

export async function deleteTestimonial(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) throw error;
  revalidatePath("/");
}
