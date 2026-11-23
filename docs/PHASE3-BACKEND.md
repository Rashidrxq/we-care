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

## Dedicated test database setup (not done yet)

1. Create a fresh **separate** Supabase project in the user's chosen organization, on a free tier if available. Confirm any nonzero charges before creation.
2. Review the SQL in docs/booking-demo-schema.sql and apply it on that dedicated project after testing. Keep RLS enabled and keep anon/authenticated roles revoked.
3. In the Vercel **we-care-healthcare** project, configure these server-side variables:
   - SUPABASE_URL — dedicated project's API URL.
   - SUPABASE_SERVICE_ROLE_KEY — dedicated project's secret **server-only** service role key. Never use VITE_ prefix, place in frontend code, or commit it.
   - WECARE_ALLOWED_ORIGINS — production hostname(s), comma-separated (for example https://we-care-healthcare-six.vercel.app).
   - WECARE_DEMO_SERVER_API_KEY — randomly generated 32+ byte test-only secret, never exposed to the browser.
   - WECARE_BOOKING_API_ENABLED — set to true only after the safety and SQL checks pass. This does **not** activate real patient booking.
4. Redeploy. Test readiness, invalid/missing write access key (401), duplicate-slot rejection (unique partial index), cancellation token validation, and 503 fail-closed behaviour when the database or key is absent.

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
