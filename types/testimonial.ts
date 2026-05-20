export interface Testimonial {
  id: string;
  name: string;
  avatar_url: string | null;
  initial: string;
  rating: number;
  message: string;
  testimonial_date: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface TestimonialFormData {
  name: string;
  avatar_url?: string;
  rating: number;
  message: string;
  testimonial_date: string;
  is_active: boolean;
  sort_order: number;
}
