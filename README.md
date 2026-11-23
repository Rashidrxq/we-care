# WE CARE — Private Clinic Website (Demo)

A responsive React + TypeScript clinic website built with Vite, Tailwind CSS, Framer Motion and Lucide React.

## Getting started

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Demo clinic data

The single source of truth for sample contact details, clinic hours, services and demo doctor profiles is `src/data/clinic.ts`.

- Name: WE CARE Healthcare
- Fictional address: 2nd Floor, Sample Wellness Centre, Mavoor Road, Kozhikode, Kerala 673004
- Nonfunctional demo phone: +91 00000 00000
- Reserved example email: hello@wecare.example
- Example hours: Monday–Saturday 9:00 AM–6:00 PM; Sunday closed
- Doctor names, credentials and experience are fictional; portraits are illustrative stock photos.
- Patient testimonials are **fictional**, not genuine patient reviews.

## Before accepting real patients

Replace sample data with verified information. Only add real doctor details and patient reviews with appropriate permission. Connect the appointment form to a secure backend and publish a privacy notice first. The current form does not transmit, store or book anything. Add a verified Google Maps location, real WhatsApp contact and active social profiles before publishing for a real clinic.

## Departments & Treatments

- Visit `/departments` for six patient education guides with search and department filtering.
- Each page at `/departments/:slug` explains symptoms, diagnosis, treatment options, recovery/follow-up and important warning signs.
- Medical information is general education with NHS and MedlinePlus sources, not individual advice. A real clinic should arrange qualified medical editorial review before launch.
- `react-router-dom` handles internal navigation; `vercel.json` handles refreshes and direct links to subpages on Vercel.

## Phase 3 — Fictional appointment demo

- Public booking simulator: `/book`. Choose a fictional clinician, available IST date/time and an example patient, then confirm or cancel the demo booking.
- Staff dashboard **preview**: `/staff-demo`. Browse fictional records, filter, cancel locally created demo bookings and reset local data. The screen is intentionally public, and **must not be used as a real admin interface**.
- Sample records are stored only in the visitor's browser `localStorage`; not shared between users, devices or browsers. **Do not enter real patient details.**
- Duplicate reservations are blocked within the same browser, but this is **not** a cross-device booking system.
- See `docs/PHASE3-BACKEND.md` for the planned private database, server-side validation and authenticated staff-access migration steps.

Production go-live blockers: dedicated database, authenticated and authorised staff accounts, transaction-safe slot constraints, secure patient identity verification, abuse protection, privacy notice, retention/deletion processes, and real-clinic details.
