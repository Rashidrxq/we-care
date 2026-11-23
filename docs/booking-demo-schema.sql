-- Applied on 2026-11-23 to the dedicated WE CARE Supabase project:
-- project ref xtlhcwonhgfwzydgrmeq (ap-south-1).
-- DO NOT apply again: this is a reference copy of the initial migration.
-- Never run in the career-intelligence-agent database.
-- All records contain fictional patient IDs, not real names or medical data.
-- This is not a real patient scheduling schema or a staff authentication system.

create table public.wecare_demo_bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique
    check (reference ~ '^WC-DEMO-[0-9A-F-]{10}$'),
  doctor_id text not null
    check (doctor_id in ('ananya','fathima','meera')),
  patient_id text not null
    check (patient_id in ('asha','rahul','sana')),
  starts_at timestamptz not null,
  status text not null default 'confirmed'
    check (status in ('confirmed','cancelled','completed')),
  cancellation_token_hash text not null
    check (cancellation_token_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),

  -- Appointments must be on weekdays or Saturdays, at half-hour intervals
  -- during the selected fictional doctor's IST schedule.
  constraint wecare_demo_valid_ist_slot check (
    extract(dow from starts_at at time zone 'Asia/Kolkata') between 1 and 6
    and extract(minute from starts_at at time zone 'Asia/Kolkata') in (0, 30)
    and extract(second from starts_at at time zone 'Asia/Kolkata') = 0
    and (
      (doctor_id = 'ananya' and extract(hour from starts_at at time zone 'Asia/Kolkata') between 9 and 12)
      or (doctor_id = 'fathima' and extract(hour from starts_at at time zone 'Asia/Kolkata') between 10 and 13)
      or (doctor_id = 'meera' and extract(hour from starts_at at time zone 'Asia/Kolkata') between 14 and 17)
    )
  )
);

-- Concurrency-safe: concurrent requests cannot double-book an active slot.
create unique index wecare_demo_one_active_appointment_per_slot
  on public.wecare_demo_bookings (doctor_id, starts_at)
  where status = 'confirmed';

create index wecare_demo_bookings_by_day
  on public.wecare_demo_bookings (starts_at, doctor_id);

-- Explicitly deny access from the public Data API and all signed-in users.
alter table public.wecare_demo_bookings enable row level security;
revoke all on table public.wecare_demo_bookings from public, anon, authenticated;
grant select, insert, update on table public.wecare_demo_bookings to service_role;

-- There are no anon/authenticated policies.
-- The service role must only be used by backend code and never exposed.
-- Test permission denials and run Supabase security advisors before enabling.
