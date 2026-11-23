# Phase 3 — Booking architecture & deployment gates

## Current production status

The website exposes a **functional fictional-data browser demo** at /book and a public staff dashboard preview at /staff-demo. This is NOT production patient booking. No medical data is collected. The demo appointment records are saved only in the visitor's browser; this is not secure shared scheduling.

A small serverless API is provided for future **fictional-data only** database testing:
- GET /api/health is a safe readiness check.
- GET /api/availability?doctorId=ananya&date=YYYY-MM-DD provides server-calculated free slots only when activated.
- POST /api/bookings with JSON { doctorId, patientId, date, time } creates a database-backed **fictional** booking only when activated.
- DELETE /api/bookings with JSON { reference, cancellationToken } cancels the fictional booking using a long random secret.
- The browser-local demo does not call these APIs.

All protected endpoints **fail closed with HTTP 503** when database configuration is missing. This is intentional.

## Dedicated test database setup (not done yet)

1. Create a fresh **separate** Supabase project in the user's chosen organization, on a free tier if available. Confirm any nonzero charges before creation.
2. Review the SQL in docs/booking-demo-schema.sql and apply it on that dedicated project after testing. Keep RLS enabled and keep anon/authenticated roles revoked.
3. In the Vercel **we-care-healthcare** project, configure these server-side variables:
   - SUPABASE_URL — dedicated project's API URL.
   - SUPABASE_SERVICE_ROLE_KEY — dedicated project's secret **server-only** service role key. Never use VITE_ prefix, place in frontend code, or commit it.
   - WECARE_ALLOWED_ORIGINS — production hostname(s), comma-separated (for example https://we-care-healthcare-six.vercel.app).
   - WECARE_BOOKING_API_ENABLED — set to true only after the safety and SQL checks pass.
4. Redeploy. Test readiness, duplicate-slot rejection (unique partial index), cancellation token validation, and 503 fail-closed behavior in environments without DB secrets.

## Constraints before real clinic use

The reference schema and endpoints are for **fictional identities only**. Do NOT extend them to real patient data without a separate design and security review.

Minimum production controls: verified clinic and doctors, staff sign-in with individual accounts and MFA, least-privilege roles, staff authorisation checks on every operation, audit trail, consistent CSRF/origin protection and abuse throttling, confirmation notifications, cancellation/identity verification, secured database backups and retention/deletion, privacy and consent notices, health-data regulatory review, transaction-safe scheduling, end-to-end tests, and live traffic monitoring.

Public staff-demo route must be removed/replaced when a real staff portal is available. A shared admin password or secret embedded in the browser is NOT acceptable.
