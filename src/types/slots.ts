export interface Slot {
  id: string;
  type: "picket" | "event";
  // Custom URL (/events/<slug>), shared by every date in the group.
  slug: string | null;
  title: string;
  description: string | null;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  location: string;
  target_volunteers: number | null;
  signup_link: string | null;
  image_url: string | null;
  featured: boolean;
  // Unpublished events are hidden from the public site but kept in the admin.
  published: boolean;
  // Dates that belong to one logical event share a group_id (one slot row per
  // date). Edited together in the admin; rendered as separate dates publicly.
  group_id: string;
  recurrence: "none" | "weekly" | "biweekly";
  recurrence_end_date: string | null;
  parent_slot_id: string | null;
  created_at: string;
  signup_count?: number;
}

export interface Signup {
  id: string;
  slot_id: string;
  name: string;
  email: string;
  phone: string;
  cancel_token: string;
  reminder_sent: boolean;
  cancelled_at: string | null;
  created_at: string;
}
