# FlowState — MERN Stack Studio Site

A professional freelance software studio site: AI, ML, DL, web, and mobile
development, built on MongoDB, Express, React, and Node.js.

## Structure

```
flowstate-mern/
  server/   Express + MongoDB API
  client/   React + Vite + Tailwind frontend
```

---

## Quick Start

### 1. Backend

```bash
cd server
cp .env.example .env      # fill in your MongoDB URI and (optionally) SMTP creds
npm install
npm run dev               # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev               # starts on http://localhost:5173
```

The client proxies `/api` requests to `http://localhost:5000` via `vite.config.js`,
so no CORS setup is needed locally.

### 3. Seed the database (optional but recommended)

```bash
cd server
npm run seed              # inserts 6 sample projects with full case-study content
```

---

## Environment Variables

### `server/.env` (copy from `server/.env.example`)

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Port the Express server listens on. Default `5000`. |
| `MONGODB_URI` | **Yes** | MongoDB connection string. E.g. `mongodb://127.0.0.1:27017/flowstate` or a MongoDB Atlas URI. |
| `CORS_ORIGINS` | No | Comma-separated list of allowed request origins. Default `http://localhost:5173`. Set to your Vercel/Netlify URL in production. |
| `SMTP_HOST` | No* | SMTP server hostname. E.g. `smtp.sendgrid.net`. |
| `SMTP_PORT` | No* | SMTP port. `587` (STARTTLS) or `465` (SSL). Default `587`. |
| `SMTP_USER` | No* | SMTP username / email. For SendGrid use `apikey`. |
| `SMTP_PASS` | No* | SMTP password or API key. |
| `NOTIFY_TO` | No* | Email address that receives new contact form notifications. Defaults to `SMTP_USER`. |

\* If `SMTP_HOST` / `SMTP_USER` are not set, email notifications are silently skipped — the contact form still saves to MongoDB.

### `client/.env.local` (create manually if needed)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | No | Full URL of the API in production. E.g. `https://flowstate-api.onrender.com/api`. In development the Vite proxy handles `/api` automatically. |

---

## What's Included

### Content & Credibility
- **Founder section** (`Founder.jsx`) — bio block with photo placeholder, 8-year experience call-out, and the "direct builder, not agency layer" differentiator. Placed between Process and Portfolio.
- **Case study pages** (`/work/:slug`) — full detail page per project: problem, approach, tech stack chips, and outcome metrics. Lazy-loaded via `React.lazy`.
- **Portfolio skeleton** — animated skeleton cards while projects load from the API; friendly empty state if the array is empty.
- **Booking CTAs** — Calendly link (`https://calendly.com/flowstate/intro`) in Hero, Contact, and Case Study pages.

### Functionality & Trust
- **Honeypot spam protection** — hidden `website` field on the contact form. Bots fill it and get a silent 200; humans don't see it.
- **Email notifications** — `nodemailer` sends a plain-text email on every new contact submission. Requires SMTP env vars.
- **`express-validator`** — validates all inputs on `/api/contact` and `/api/projects` before they hit the database.
- **`mongo-sanitize`** — strips `$` and `.` from all request bodies and query params to prevent NoSQL injection.
- **404 page** (`NotFound.jsx`) — on-brand client-side 404 for unmatched routes.
- **JSON error handler** — global Express error middleware returns `{ error: "…" }` JSON for every 4xx/5xx.
- **`ErrorBoundary`** — class component wrapping the entire React app; shows a friendly fallback on any render crash.

### Performance & SEO
- **Sitemap** at `/sitemap.xml` covering home + all 6 case-study URLs.
- **`robots.txt`** referencing the sitemap.
- **OG image** (`/og-image.png`, 1200×630) referenced in `og:image` and `twitter:image` meta tags. `twitter:card` upgraded to `summary_large_image`.
- **Code splitting** — `CaseStudy.jsx` is `React.lazy`-loaded; only fetched when the user navigates to `/work/:slug`.
- **FAQPage JSON-LD** in `index.html` — mirrors the FAQS array in `Faq.jsx`; validated against Schema.org.

### Polish
- **Dark-mode media query** in `index.css` — honours `prefers-color-scheme: dark` by inverting cream/light sections to dark neutrals. No interactive toggle (the design uses per-section colour alternation, making a toggle button a large refactor — see notes below).
- **Spacing audit** — all sections use `py-24`; headings `font-mono text-2xl` (`h2`) / `font-medium text-base` (`h3`); body text `text-sm` or `text-base`. `Testimonials` and `TechStack` updated for consistency.
- **Semantic HTML** — `<dl>/<dt>/<dd>` stat blocks in Hero, `<figure>/<blockquote>/<figcaption>` in Testimonials, `role="list"` on TechStack grid.
- **Descriptive alt text / aria-labels** on all interactive elements and visual components.

### Backend Hardening
- **`helmet`** — security headers on every response.
- **`morgan`** — `combined` format HTTP request logging to stdout.
- **CORS allowlist** — reads `CORS_ORIGINS` env var (comma-separated). Falls back to `http://localhost:5173` in development.
- **DB indexes** — `Project`: `category`, `createdAt`, `slug`. `ContactMessage`: `createdAt`, `status`.
- **`slug` field** on Project model for SEO-friendly case-study URLs.

### Deployment
- **`client/vercel.json`** — SPA rewrites so `/work/:slug` works on direct navigation; cache headers for `og-image.png`.
- **`server/render.yaml`** — Render Web Service definition for the Express API with env var documentation.

---

## Before You Launch

1. **Replace the Founder section** — swap the placeholder bio and photo in `Founder.jsx` with your real name, headshot, and story.
2. **Seed or replace projects** — `npm run seed` in `server/` loads 6 real-looking sample projects; replace them in `projects.seed.js` with your actual case studies.
3. **Set SMTP credentials** — add `SMTP_*` vars to `server/.env` so contact notifications are emailed to you.
4. **Replace testimonials** — real quotes in `Testimonials.jsx` (attributed, or "Client, [industry]" if under NDA).
5. **Update TrustBar** — replace placeholder client names in `TrustBar.jsx` with real ones once you have clearance.
6. **Set your Calendly URL** — search for `calendly.com/flowstate/intro` and replace with your real link.
7. **Update the domain** — `flowstate.dev` appears in `index.html`, `sitemap.xml`, and `robots.txt`. Replace with your domain.
8. **Production CORS** — set `CORS_ORIGINS` on Render to your Vercel URL, e.g. `https://your-site.vercel.app`.

---

## Note on Light/Dark Mode Toggle

The site uses **section-level colour alternation** — dark navy hero, cream services, dark tech stack, cream portfolio — rather than a single background variable. A global toggle button would require replacing ~30 individual Tailwind class strings with CSS custom property references, which is a significant refactor with high visual regression risk. Instead, `index.css` includes a `prefers-color-scheme: dark` media query that inverts cream sections to dark neutrals for users whose OS is in dark mode, without requiring any UI element.

---

## Scripts

| Directory | Command | Description |
|---|---|---|
| `client` | `npm run dev` | Start Vite dev server on port 5173 |
| `client` | `npm run build` | Build production bundle to `dist/` |
| `server` | `npm run dev` | Start Express with nodemon on port 5000 |
| `server` | `npm start` | Start Express (production) |
| `server` | `npm run seed` | Seed 6 sample projects into MongoDB |
