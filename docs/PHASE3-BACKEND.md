# Phase 3 — Booking architecture & deployment gates

## Current production status

The website exposes a **functional fictional-data browser demo** at /book and a public staff dashboard preview at /staff-demo. This is NOT production patient booking. No medical data is collected. The demo appointment records are saved only in the visitor's browser; this is not secure shared scheduling.

A small serverless API is provided for future **fictional-data only** database testing:
- GET /api/health is a safe readiness check.
- GET /api/availability?doctorId=ananya&date=YYYY-MM-DD provides server-calculated free slots only when activated.
- POST /api/bookings with JSON { doctorId, patientId, date, time } creates a database-backed **fictional** booking only when activated **and** when authenticated with a strong private server-to-server test credential.
- DELETE /api/bookings with JSON { reference, cancellationToken } cancels the fictional booking using a long random secret **and** the private server-to-server test credential.
- The browser-local demo does not call these APIs.

All protected endpoints **fail closed with HTTP 503** when database configuration is missing. Write endpoints additionally require the 32+ byte `WECARE_DEMO_SERVER_API_KEY`, supplied only in an `Authorization: Bearer ...` header by a trusted testing client. They return HTTP 401 for missing or invalid keys when enabled. **Never add this key to frontend code or a public website.** This is an internal testing interface, not an actual user booking API.

The frontend at `/book` intentionally remains browser-only and is **not connected** to the server API. The public `/staff-demo` route uses fictional browser-local data only.

## Dedicated fictional-data database — provisioned 2026-11-23

The WE CARE project **already exists** in Supabase at [WE CARE dashboard](https://supabase.com/dashboard/project/xtlhcwonhgfwzydgrmeq) (project ref `xtlhcwonhgfwzydgrmeq`, region `ap-south-1`). Quoted new project cost: $0/month, subject to free-plan limits.

The migration in `docs/booking-demo-schema.sql` was successfully applied using the Supabase migration tool. Verified:
- RLS is enabled.
- `anon` and `authenticated` roles have no table privileges; only the server role can access bookings.
- The active slot partial unique index rejects duplicate bookings.
- IST schedule check rejects Sunday bookings.
- Security advisor reports one INFO finding (`rls_enabled_no_policy`) because the private server-only table intentionally has **no public policies**.
- Performance advisor reports an unused index on the new empty table (expected).
- All test inserts were removed (zero fictional booking rows left).

Four Vercel environment variables were configured for production and preview: `SUPABASE_URL` (dedicated project URL), `WECARE_ALLOWED_ORIGINS`, `WECARE_BOOKING_API_ENABLED=false`, and an encrypted random 256-bit `WECARE_DEMO_SERVER_API_KEY` for server-to-server fictional tests. The key value is not committed. This is **not yet an active DB-backed API**.

### Remaining private-key setup (manual for account owner)

In the Vercel **we-care-healthcare** project, configure these server-side variables:
   - `SUPABASE_SERVICE_ROLE_KEY` — preferably a dedicated modern Supabase `sb_secret_...` key, **server-only**. Use [Supabase project API Keys](https://supabase.com/dashboard/project/xtlhcwonhgfwzydgrmeq/settings/api-keys) to create or reveal it. **Never paste it into chat, put it in `VITE_*` variables, or commit it to GitHub.**
   - `WECARE_DEMO_SERVER_API_KEY` — **already configured** in Vercel as an encrypted random 256-bit server-to-server testing credential. Never expose it to frontend code.
   - `WECARE_BOOKING_API_ENABLED` — change from `false` to `true` only for approved fictional-data API integration tests, after the secrets exist and the owner reviews security. It must remain `false` for real patients.
Then redeploy and test 401 for unauthenticated writes, shared availability, duplicate-slot rejection, cancellation-token validation and the 503 fail-closed path.

Do not add database or test API secrets to the public Vercel `VITE_*` environment. A separate properly authenticated patient booking API and staff portal remain future milestones.

## Constraints before real clinic use

The reference schema and endpoints are for **fictional identities only**. Do NOT extend them to real patient data without a separate design and security review.

Minimum production controls: verified clinic and doctors, staff sign-in with individual accounts and MFA, least-privilege roles, staff authorisation checks on every operation, audit trail, consistent CSRF/origin protection and abuse throttling, confirmation notifications, cancellation/identity verification, secured database backups and retention/deletion, privacy and consent notices, health-data regulatory review, transaction-safe scheduling, end-to-end tests, and live traffic monitoring.

Public staff-demo route must be removed/replaced when a real staff portal is available. A shared admin password or secret embedded in the browser is NOT acceptable.

## Backend safeguards added

- Booking responses explicitly project public fields and never return the stored cancellation-token hash.
- Availability uses an `and=(starts_at.gte…,starts_at.lt…)` PostgREST range filter, not duplicate query keys.
- JSON body-size limits validate both Content-Length and the parsed body.
- A strong server-only testing key is required for POST/DELETE, checked with constant-time comparison.
- Database constraints validate doctor schedules and half-hour IST time slots. A partial unique index rejects concurrent active-slot double bookings.
- The test API never handles real patient information or exposes a staff login.
