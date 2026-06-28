export type DiscountType = "percent" | "fixed";

export interface Discount {
  id: string;
  title: string;
  description: string | null;
  code: string | null;
  type: DiscountType;
  value: number;
  image_url: string | null;
  link: string | null;
  starts_at: string;
  ends_at: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DiscountFormData {
  title: string;
  description?: string;
  code?: string;
  type: DiscountType;
  value: number;
  image_url?: string;
  link?: string;
  starts_at: string;
  ends_at?: string;
  is_active: boolean;
  sort_order: number;
}
