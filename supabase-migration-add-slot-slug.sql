-- Optional custom URL for an event: /events/<slug> instead of /events/<uuid>.
-- Shared by every date row in a group; the API keeps it unique across groups.
-- Run this in your Supabase SQL editor

alter table slots
  add column slug text;

create index slots_slug_idx on slots (slug);
