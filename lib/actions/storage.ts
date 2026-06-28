"use server";

import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "media";
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

export async function uploadImage(formData: FormData): Promise<string> {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("No se seleccionó archivo");
  if (!file.type.startsWith("image/"))
    throw new Error("El archivo debe ser una imagen");
  if (file.size > MAX_BYTES) throw new Error("La imagen supera 5MB");

  const supabase = createAdminClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
