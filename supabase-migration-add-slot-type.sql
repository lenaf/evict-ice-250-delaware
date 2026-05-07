-- Add type, signup_link columns and make target_volunteers optional
-- Run this in your Supabase SQL editor

alter table slots
  add column type text check (type in ('picket', 'event')) default 'picket';

alter table slots
  add column signup_link text;

alter table slots
  alter column target_volunteers drop not null,
  alter column target_volunteers set default null;

-- Backfill existing slots as picket
update slots set type = 'picket' where type is null;

-- Make type not null after backfill
alter table slots alter column type set not null;
