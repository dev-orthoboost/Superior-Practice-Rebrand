# Superior Orthodontics — Real-Data + Multi-Page Tailoring Spec

Date: 2026-07-07
Project: Superior Orthodontics Rebrand (`Superior-Practice-Rebrand/`)

## Goal

The site scaffold (9 pages) and design system are already built (see the
2026-05-29 treatment-pages and nav-pages specs). But those pages were
intentionally built with **placeholder data and the old offer**. This pass
replaces all placeholder data with **verified client data from Notion + Google
Drive**, corrects the financing offer, swaps in **real client photos**, adds an
**on-page SEO layer**, and adds **4 new pages** to complete the sitemap.

Design system, animation classes, nav/path scheme, and "don'ts" from the
two 2026-05-29 specs still apply verbatim — this spec only changes *data,
content, imagery, SEO, and the page count*. Do not restyle or re-architect.

This remains a static design/handoff deliverable; the production build is
WordPress + Elementor + RankMath Pro on SiteGround. On-page SEO here is a
design spec the Elementor build mirrors.

---

## SOURCE OF TRUTH — canonical data block (verified from Notion + Drive)

Apply these EXACT values everywhere. Never invent, never keep a placeholder.

| Field | Value |
|---|---|
| Practice | Superior Orthodontics |
| Doctor | **Dr. Kole-James** ("Dr. KJ") — board-certified · 8 yrs |
| Public phone (both offices) | **(248) 313-4899** → `tel:2483134899` |
| Email | info@superiororthodontics.com |
| Web | superiororthodontics.com |
| **Eastpointe office** | **22770 Kelly Rd, Eastpointe, MI 48021** · at 9 Mile & Kelly · Macomb County |
| **Southfield office** | **26699 W 12 Mile Rd Ste 202, Southfield, MI 48034** · at 12 Mile & Northwestern (Amazing Smiles bldg, 2nd fl) · Oakland County |
| Hours (both) | Mon–Thu 9:00–5:00 (lunch 1–2) · **Closed Fri** · Open **2nd & 4th Sat** |
| Time zone / service area | America/New_York · Macomb & Oakland County, metro Detroit |
| Proof stats | **170+** 5-star reviews · **5,000+** patients served · **8+ yrs** |
| Financing | from **$188/mo** (tiers $188 / $196 / $203) · **$1,000 down** · **0% in-house financing** · free consultation ($99 exam value) |
| Not offered | No Medicaid · English only (no Spanish) · **No Invisalign, no lingual braces** (in-house clear aligners only) · no digital monitoring |
| Brand | Navy `#143953` · Rose `#D45C84` · Bricolage Grotesque (already in code) |

### Known placeholder strings to KILL (from the old build)
- Addresses: `1234 Gratiot Avenue`, `9876 Telegraph Road`
- Phones: `(586) 555-0123` / `tel:5865550123`, `(248) 555-0987` / `tel:2485550987`
- Offer: any `$0 Down` / `$0 down payment` → replace with `$1,000 down · 0% in-house financing`
- Before/After `placehold.co` images → real client photos

---

## Services (Superior's real menu — from Notion client record)

Keep treatment pages to what they actually offer:
- **Braces** — metal, ceramic, accelerated orthodontics, kids/Phase 1, adults
- **Clear Aligners** — **in-house aligners** (NOT Invisalign — never name Invisalign)
- **Early Orthodontics** — interceptive, expanders, space maintainers, corrective
  appliances, pediatric aligners, Phase 1
- **Adult Orthodontics** — complex bite correction
- **Retainers** — Hawley, clear
- Additional (mention only, not primary): implants, oral surgery
- **Free consultation**: digital scans & imaging, bite/jaw assessment, growth
  eval, treatment planning
- **Emergency**: same-day / after-hours / weekend (existing patients only)

Ads currently run on: Braces + Clear Aligners.

---

## Page inventory

### Existing 9 — real-data + photo + SEO pass (no structural change)
`index.html`, `why-us.html`, `about.html`, `locations.html`,
`treatments/index.html`, `treatments/braces-kids-teens.html`,
`treatments/clear-aligners.html`, `treatments/braces-adults.html`,
`treatments/early-orthodontics.html`

### New 4 — build to match the design system + nav/path scheme
| File | Page | Notes |
|---|---|---|
| `faq.html` (root) | Orthodontic FAQ | Promote homepage `<details>` accordion into standalone page; expand with cost/insurance/age/financing Q&As. Root-level nav paths. |
| `contact.html` (root) | Contact & Appointment | Both offices (real NAP), hours, click-to-call, appointment-request form section (form posts nowhere yet — `action="#"`, labeled for Elementor wiring), map placeholders labeled for embed. |
| `locations/eastpointe.html` | Eastpointe office | Unique H1/title, real NAP, hours, directions ("9 Mile & Kelly"), per-office schema, service-area copy (Macomb County). Uses `treatments/`-style depth paths (one level deep). |
| `locations/southfield.html` | Southfield office | Same pattern; "12 Mile & Northwestern, Amazing Smiles bldg, 2nd fl"; Oakland County. |

`locations.html` stays the hub and links to both per-office pages.

### Nav / path scheme for the new `locations/` depth
`locations/*.html` sit one level deep → use the SAME relative-prefix rule as
`treatments/` pages (`../index.html`, `../why-us.html`,
`../treatments/index.html`, `../about.html`, `../locations.html`,
`../index.html#schedule`, `tel:2483134899`). Active nav item = Locations.
Add "FAQ" and "Contact" to the nav/footer on EVERY page (root + subpages),
with correct depth prefixes.

---

## SEO layer (every page)
1. Unique `<title>` and `<meta name="description">` (location + service intent).
2. `<link rel="canonical">` + OpenGraph (`og:title/description/image/url`) tags.
3. **JSON-LD** `@type` `Orthodontist` (LocalBusiness) — one node per real office
   on `locations.html` + the two per-office pages: name, full address, `(248)
   313-4899`, `openingHoursSpecification`, `areaServed` (Macomb/Oakland),
   `priceRange`. `MedicalBusiness`/`Dentist` acceptable if cleaner.
4. Real photos get descriptive `alt` (e.g. "Dr. Kole-James with a patient at
   Superior Orthodontics in Eastpointe, MI").
5. Preserve one `<h1>` per page; keep heading order logical.
6. Optional: `sitemap.xml` + `robots.txt` at root (low priority; Elementor
   regenerates in prod — build only if quick).

---

## Photos (pull real, from Drive)
Source folders (Superior Assets → Production Library / All Uploads):
- `Raw - Superior Orthodontics` (1HCvMoP_x9xlSMYlQPks3a968TjV4HrYN)
- `All Uploads - Superior Orthodontics` (1oN8NIYoqChH7HlmtrngjAnlcwDpmFGdv)
- `Working Web Files - Superior Orthodontics` (1homTnojVZk2sk-LmORmGmC907hHyaBxB)
- `Brand Assets - Superior Orthodontics` (1EPLwXg1P-ZA9K2ZwKbIj0r4fX27aPqWm) — logo SVG/PNG

Rules:
- **Avoid** the `Seasonal_*` / `Evergreen_*` / `Kids-Club_*` ad graphics for
  site imagery — they have baked-in marketing text.
- Prefer clean candid photos (office, team, doctor, patients) per brand imagery
  rules: real people, natural daylight, no cold clinical light, no tooth-macros.
- Download into `Superior-Practice-Rebrand/images/` with descriptive filenames;
  update `src` + `alt`. Localize the real logo SVG too.
- Where no suitable real photo exists (e.g. before/after pairs), keep a
  clearly-labeled local placeholder rather than a broken/expiring link.

## Content-accuracy don'ts
- No Invisalign, no lingual braces, no Spanish-language claims, no Medicaid.
- No invented doctor credentials/first name. Use verified facts only
  ("Dr. Kole-James, board-certified, 8+ years serving metro Detroit").
  Flag full bio + headshot as client-confirm items; do not fabricate.
- No medical outcome guarantees.
- Design-system don'ts from the 2026-05-29 specs still hold (no Tailwind build
  step, no second font, don't move hero out of `#hero`).

## Build approach
1. Main agent downloads/selects real photos from Drive into `images/`.
2. Data-correction pass across the 9 existing pages (NAP, offer, photos, SEO).
3. Build the 4 new pages to the design system + nav scheme, then repoint
   nav/footer on all pages to include FAQ + Contact + per-location links.
4. Verify in preview server (console clean, links resolve, NAP/offer correct on
   every page). Commit with the project's env-var git identity.
