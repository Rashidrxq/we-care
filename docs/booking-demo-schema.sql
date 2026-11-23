-- Reference schema for a future DEDICATED Supabase project.
-- Not applied. Never put this in the existing career-intelligence database.
-- Demo identities only; the schema intentionally has no names, phones, notes or emails.
-- Actual patient booking requires separate privacy, security and authentication work.

create table if not exists public.wecare_demo_bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique check (reference ~ '^WC-DEMO-[0-9A-F-]{10}$'),
  doctor_id text not null check (doctor_id in ('ananya','fathima','meera')),
  patient_id text not null check (patient_id in ('asha','rahul','sana')),
  starts_at timestamptz not null,
  status text not null default 'confirmed' check (status in ('confirmed','cancelled','completed')),
  cancellation_token_hash text not null check (length(cancellation_token_hash) = 64),
  created_at timestamptz not null default now()
);

create unique index if not exists wecare_demo_one_active_appointment_per_slot
  on public.wecare_demo_bookings (doctor_id, starts_at) where status = 'confirmed';

create index if not exists wecare_demo_bookings_by_day
  on public.wecare_demo_bookings (starts_at, doctor_id);

alter table public.wecare_demo_bookings enable row level security;
revoke all on table public.wecare_demo_bookings from public, anon, authenticated;
grant select, insert, update on table public.wecare_demo_bookings to service_role;
-- No public/authenticated policies. Calls are only permitted by the server-side service role.
-- Verify with security advisors and permission tests before enabling the API.
