"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { timelineEventSchema } from "@/lib/validations/timeline.schema";
import { revalidatePath } from "next/cache";
import type { TimelineEventFormData } from "@/types/timeline";

export async function getTimelineEvents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("timeline_events")
    .select("*")
    .order("year", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getAllTimelineEvents() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("timeline_events")
    .select("*")
    .order("year", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createTimelineEvent(formData: TimelineEventFormData) {
  const validated = timelineEventSchema.parse(formData);
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("timeline_events")
    .insert(validated)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/sobre-nosotros");
  return data;
}

export async function updateTimelineEvent(
  id: string,
  formData: TimelineEventFormData
) {
  const validated = timelineEventSchema.parse(formData);
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("timeline_events")
    .update(validated)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/sobre-nosotros");
  return data;
}

export async function deleteTimelineEvent(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("timeline_events").delete().eq("id", id);

  if (error) throw error;
  revalidatePath("/sobre-nosotros");
}
