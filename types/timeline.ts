export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TimelineEventFormData {
  year: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
}
