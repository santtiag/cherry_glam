"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { blogPostSchema } from "@/lib/validations/blog.schema";
import { revalidatePath } from "next/cache";
import type { BlogPostFormData } from "@/types/blog";

function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export async function getPublishedPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
}

export async function getAllPosts() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createBlogPost(formData: BlogPostFormData) {
  const validated = blogPostSchema.parse(formData);
  const supabase = createAdminClient();

  const slug = validated.slug || slugify(validated.title);

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      ...validated,
      slug,
      published_at:
        validated.status === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/blog");
  return data;
}

export async function updateBlogPost(id: string, formData: BlogPostFormData) {
  const validated = blogPostSchema.parse(formData);
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      ...validated,
      updated_at: new Date().toISOString(),
      published_at:
        validated.status === "published"
          ? new Date().toISOString()
          : undefined,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/blog");
  revalidatePath(`/blog/${validated.slug}`);
  return data;
}

export async function deleteBlogPost(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) throw error;
  revalidatePath("/blog");
}

export async function togglePublishPost(id: string, currentStatus: string) {
  const supabase = createAdminClient();
  const newStatus = currentStatus === "published" ? "draft" : "published";

  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      status: newStatus,
      published_at: newStatus === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/blog");
  return data;
}
