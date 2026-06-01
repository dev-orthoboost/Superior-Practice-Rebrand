# Nav Pages — design spec (addendum to treatment-pages spec)

Date: 2026-05-29
Project: Superior Orthodontics Rebrand (`figma-export/`)

Builds the 4 nav-item pages and repoints navigation site-wide. Reuses the same
shared chrome rules and design system as the treatment-pages spec
(`2026-05-29-treatment-pages-design.md`) — read that first.

## Pages to build

| File | Page | Based on homepage section |
|---|---|---|
| `why-us.html` (root) | Why Choose Superior | Why-Us cards `index.html:305–347` |
| `about.html` (root) | About / Meet Dr. Kole-James | Doctor Bio `index.html:397–432` |
| `locations.html` (root) | Our Locations | Locations `index.html:672–729` |
| `treatments/index.html` | Treatments overview/landing | Treatments grid `index.html:349–396` |

Decisions: realistic placeholder copy; nav repointed to these pages everywhere
but the homepage KEEPS its existing sections; flat root files; Treatments landing
at `treatments/index.html`.

## CANONICAL NAVIGATION SCHEME (apply to EVERY page, new and existing)

Logical targets (site-root-relative): logo→`index.html`, Why Us→`why-us.html`,
Treatments→`treatments/index.html`, About→`about.html`, Locations→`locations.html`,
Schedule CTA→`index.html#schedule`, phone→`tel:2483134899`.

Because pages sit at two depths, prefix the targets per page location:

### Root-level pages (`index.html`, `why-us.html`, `about.html`, `locations.html`)
- Logo → `index.html`
- Why Us → `why-us.html`
- Treatments → `treatments/index.html`
- About → `about.html`
- Locations → `locations.html`
- Schedule CTA → `index.html#schedule`

### `treatments/` pages (`treatments/index.html` + the 4 detail pages)
- Logo → `../index.html`
- Why Us → `../why-us.html`
- Treatments → `index.html`   ← same folder = the treatments landing page
- About → `../about.html`
- Locations → `../locations.html`
- Schedule CTA → `../index.html#schedule`

### Active state
Give the nav item matching the current page the secondary (pink) color: add
`text-secondary`, remove `text-primary`, on BOTH the desktop nav link and the
mobile nav-strip link. (Homepage = no item active.)

### Footer link scheme (every page)
- Footer "Services" list → the 4 detail pages. Root pages:
  `treatments/braces-kids-teens.html`, `treatments/braces-adults.html`,
  `treatments/clear-aligners.html`, `treatments/early-orthodontics.html`.
  `treatments/` pages: bare filenames (same folder).
- Footer "Practice": Meet the Doctor → `about.html` (root) / `../about.html`
  (treatments); Locations → `locations.html` / `../locations.html`;
  FAQ → `index.html#faq` / `../index.html#faq`; Book Exam →
  `index.html#schedule` / `../index.html#schedule`.
- Footer logo → `index.html` / `../index.html`.
- Social / Pay Online / Privacy / Terms → leave `href="#"`.

## Page structures

All pages: shared `<head>` (copy `index.html:1–204`, change `<title>`), `<body>`
tag (`index.html:205`), shared header (paths per scheme above, correct active
item), `<main>` content, shared footer (paths per scheme), shared scripts
(`index.html:792–864`). Every `<section>` except any `#hero` gets
`opacity-0 animate-fade-in-up`.

### why-us.html — `<title>` "Why Choose Us | Superior Orthodontics", Why Us active
1. Page header band (eyebrow + H1 "Why Superior Orthodontics?" + lead).
2. The 4 value props expanded into `.service-card` + pink `.icon-tile` cards
   (Affordable Payments, 100% Free Exam, No Hidden Fees, Trusted Expertise —
   reuse icons payments/health_and_safety/visibility_off/verified) with a
   sentence or two more depth each.
3. A "what makes us different" supporting section (e.g. patient-first approach,
   modern tech / 3D scans, two convenient locations) — asymmetric image/text,
   reuse a homepage photo.
4. Stats strip optional (reuse navy stats bar style, static numbers OK).
5. Full-bleed `bg-primary` Schedule CTA band.

### about.html — `<title>` "Meet Dr. Kole-James | Superior Orthodontics", About active
1. Hero/intro: asymmetric image-left/text-right (reuse doctor photo
   `index.html:404` src verbatim), eyebrow "Clinical Director", H1
   "Dr. Kishawn Kole-James", the 3 bio paragraphs from `index.html:411–413`
   expanded slightly, credential chips (DDS Univ. of Detroit Mercy; Orthodontics
   Howard Univ.).
2. Philosophy / approach section (family-first, accessible care — grounded in
   the existing bio: former Dental Director for community health clinics).
3. Practice values cards (optional, `.service-card` style).
4. Full-bleed `bg-primary` Schedule CTA band.
No invented credentials beyond what the homepage states.

### locations.html — `<title>` "Our Locations | Superior Orthodontics", Locations active
1. Page header (H1 "Our Clinics" + lead).
2. The 2 clinic cards reused/expanded from `index.html:678–727` (Eastpointe
   1234 Gratiot Avenue, Eastpointe MI 48021, tel 5865550123; Southfield 9876
   Telegraph Road, Southfield MI 48033, tel 2485550987 — keep these EXACT,
   they're existing placeholders). Add hours detail, parking/accessibility note
   (clearly placeholder), Directions buttons keep `href="#"`.
3. Optional "what to expect at your visit" reassurance band.
4. Full-bleed `bg-primary` Schedule CTA band.
NOTE: clinic phone numbers (586/248)…555… are KNOWN placeholders — keep as-is.

### treatments/index.html — `<title>` "Treatments | Superior Orthodontics", Treatments active
1. Page header (eyebrow "Treatment Options" + H1 + lead).
2. The 4 treatment cards (reuse the grid from `index.html:356–394`, same images
   & "Most Popular" badge on Clear Aligners) — each card's image + title +
   description + "Learn More" linking to the sibling detail page
   (`braces-kids-teens.html`, `clear-aligners.html`, `braces-adults.html`,
   `early-orthodontics.html`).
3. A short "how to choose / not sure which is right" helper section linking to
   Schedule (free exam).
4. Full-bleed `bg-primary` Schedule CTA band.

## Existing files to repoint (done by main agent, not the builders)
- `index.html`: desktop nav (4 links), mobile nav strip (4 links), footer
  Practice "Meet the Doctor"→`about.html` & "Locations"→`locations.html`.
  Keep all homepage sections. Why Us/Treatments/About/Locations nav now go to
  the standalone pages.
- The 4 existing detail pages (`treatments/*.html`): repoint desktop + mobile
  nav to the `treatments/` scheme above (Why Us→`../why-us.html`,
  Treatments→`index.html`, About→`../about.html`, Locations→`../locations.html`),
  and footer Practice Meet-the-Doctor→`../about.html`, Locations→`../locations.html`.
  Keep Treatments active styling on detail pages.

## Don'ts
Same as treatment-pages spec: no Tailwind build step, no second font, don't move
hero out of `#hero`, reuse existing placeholder images, no invented
credentials/medical guarantees.
