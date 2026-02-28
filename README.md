# MedPrestige

MedPrestige is a modern clinic website and admin interface built with Next.js (App Router). It provides a polished public-facing experience for patients and a clean internal dashboard UI for clinic staff. The project focuses on frontend structure, visual design, and reusable components, with placeholders ready for backend integration.

## Highlights
- Patient‑facing marketing pages with strong visual sections and CTAs
- Dynamic service and doctor detail pages
- Admin dashboard UI with KPIs, tables, and recent appointment summaries
- Auth/login UI (frontend only)
- Modular component and feature folders for scalable growth

---

## Screens & Sections (Public Site)
- **Home**: Hero, about, services, support groups, doctors, and contact CTA
- **About**: Clinic story, impact, stats, and reasons to choose the clinic
- **Services**: Service listing with descriptions and detail pages
- **Doctors**: Doctors listing and individual profile view
- **Contact**: Contact cards, embedded map, and consultation call‑to‑action

---

## Admin Area (UI)
- **Dashboard**: KPIs, recent appointments, and top doctors
- **Doctors**: Admin doctors view
- **Services**: Admin services view
- **Appointments**: Admin appointments view
- **Settings**: Admin settings page

> The admin area is UI‑only at the moment and can be wired to real data later.

---

## Tech Stack
- **Next.js** (App Router)
- **React**
- **Tailwind CSS v4**
- **ESLint**

---

## Getting Started

### 1. Install dependencies
```bash
npm install
2. Run the dev server
npm run dev
3. Build for production
npm run build
4. Start production server
npm run start
Project Structure
src/
  app/
    (home)/
    (marketing)/
    (admin)/
    (auth)/
    api/
  components/
  features/
public/
Notes
src/app uses route groups:
(home) for the landing page
(marketing) for public pages
(admin) for the dashboard area
(auth) for login
src/components contains shared UI elements.
src/features contains feature‑specific blocks.
Route Overview
/ — Home
/about — About
/services — Services list
/services/[serviceID] — Service details
/doctors — Doctors list
/doctors/[doctorID] — Doctor profile
/contact — Contact
/login — Login (UI only)
/admin — Admin dashboard
Data & API Status
Currently, the project uses static data within pages.
API route files exist but are empty placeholders and ready for backend integration.

Deployment
Vercel
