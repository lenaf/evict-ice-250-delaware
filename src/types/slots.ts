export interface Slot {
  id: string;
  title: string;
  description: string | null;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  location: string;
  target_volunteers: number;
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
