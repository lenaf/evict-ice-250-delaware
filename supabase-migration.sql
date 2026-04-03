-- Volunteer Slot Signup Schema
-- Run this in your Supabase SQL editor

-- Slots table
create table slots (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date date not null,
  start_time time not null,
  end_time time not null,
  location text not null default '250 Delaware Ave, Buffalo, NY',
  target_volunteers int not null default 5,
  -- Recurrence
  recurrence text check (recurrence in ('none', 'weekly', 'biweekly')) default 'none',
  recurrence_end_date date,
  parent_slot_id uuid references slots(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Signups table
create table signups (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null references slots(id) on delete cascade,
  name text not null,
  email text not null,
  phone text not null,
  cancel_token uuid not null default gen_random_uuid(),
  reminder_sent boolean not null default false,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  unique(slot_id, email)
);

-- Indexes
create index idx_slots_date on slots(date);
create index idx_signups_slot_id on signups(slot_id);
create index idx_signups_cancel_token on signups(cancel_token);
create index idx_signups_reminder on signups(reminder_sent, cancelled_at);

-- Row Level Security
alter table slots enable row level security;
alter table signups enable row level security;

-- Public can read upcoming slots
create policy "Anyone can view slots"
  on slots for select
  using (true);

-- Public can insert signups
create policy "Anyone can sign up"
  on signups for insert
  with check (true);

-- Public can read signup counts (but not personal info)
create policy "Anyone can count signups"
  on signups for select
  using (true);

-- Service role (used by API routes) bypasses RLS automatically

-- View for slot signup counts
create view slot_signup_counts as
select
  slot_id,
  count(*) filter (where cancelled_at is null) as signup_count
from signups
group by slot_id;
