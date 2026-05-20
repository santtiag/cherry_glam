export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string;
  status: "draft" | "published";
  published_at: string | null;
  author_id: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostFormData {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  category: string;
  status: "draft" | "published";
  meta_title?: string;
  meta_description?: string;
}
