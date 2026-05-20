export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link: string | null;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BannerFormData {
  title: string;
  subtitle?: string;
  image_url: string;
  link?: string;
  start_date: string;
  end_date?: string;
  is_active: boolean;
  sort_order: number;
}
