-- Published flag: unpublished events are hidden from the public site but kept
-- in the admin. Shared by every date row in a group.
-- Run this in your Supabase SQL editor

alter table slots
  add column published boolean not null default true;
