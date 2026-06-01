# Treatment Detail Pages — design spec

Date: 2026-05-29
Project: Superior Orthodontics Rebrand (`figma-export/`)

## Goal

Expand site depth by building the 4 treatment detail pages that the homepage
"Learn More" buttons and footer "Services" links currently dead-link to
(`href="#"`). These are the first branching pages off the single-page homepage.

This is a static handoff/design-spec deliverable (final build is WordPress +
Elementor). Pages must match the existing design system exactly and use
realistic, clearly-swappable placeholder copy. No medical claims stated as fact.

## Pages (this pass)

Built as flat files inside a `treatments/` subfolder:

| File | Treatment | Homepage source photo (reuse same `src`) |
|---|---|---|
| `treatments/braces-kids-teens.html` | Braces for Kids & Teens | `index.html:360` img |
| `treatments/clear-aligners.html` | Clear Aligners (has "Most Popular" badge) | `index.html:370` img |
| `treatments/braces-adults.html` | Braces for Adults | `index.html:379` img |
| `treatments/early-orthodontics.html` | Early Orthodontics | `index.html:388` img |

Out of scope this pass: About bio page, Schedule page, Locations page, legal
pages, Pay Online. Those remain homepage anchors / dead-links for a later pass.

## Shared chrome (copy verbatim from index.html, then fix paths)

Every page is a standalone single-file HTML doc replicating these blocks from
`index.html`:

- **`<head>`** — lines 1–204: charset/viewport, Google Fonts (Bricolage
  Grotesque + Material Symbols), Tailwind CDN + inline `tailwind.config`, and
  the entire inline `<style>` block (animations, glass-nav, card hovers,
  reduced-motion). Copy as-is. Only change the `<title>`.
- **`<body>` tag** — line 205 exactly:
  `<body class="bg-surface text-on-surface font-body-md text-body-md antialiased selection:bg-secondary selection:text-white">`
- **Header** — lines 206–240 (glass sticky nav, desktop + mobile strip).
- **Footer** — lines 731–791.
- **Scripts** — lines 792–864 (nav scroll shadow, section fade-in observer,
  count-up, before/after slider). The count-up + slider code is harmless no-op
  if those elements are absent; keep the whole block for consistency.

### Path adjustments (CRITICAL — pages live one level deep in `treatments/`)

In the copied header AND footer, rewrite every link:

- Logo `href="/"` → `href="../index.html"`
- Nav anchors `href="#why-us"` → `href="../index.html#why-us"` (same for
  `#treatments`, `#about`, `#locations`, `#faq`, `#schedule`)
- `href="tel:2483134899"` → unchanged
- Footer "Services" links → point to sibling pages:
  - Braces for Kids → `braces-kids-teens.html`
  - Braces for Adults → `braces-adults.html`
  - Clear Aligners → `clear-aligners.html`
  - Early Orthodontics → `early-orthodontics.html`
- Footer "Practice" links (`#about`, `#faq`, `#locations`, `#schedule`) →
  `../index.html#...`
- Footer social / Pay Online / Privacy / Terms `href="#"` → unchanged.
- Nav active state: give the current page's nav item (`Treatments` desktop +
  mobile) the secondary color, e.g. add `text-secondary` and drop
  `text-primary`, so the user sees where they are.

The homepage `<head>` includes Tailwind via CDN; all utility classes resolve
identically on subpages. No path issues for CSS/JS (all CDN). Images reused from
homepage are remote `lh3.googleusercontent.com` URLs — copy the `src` verbatim,
no path change.

## Page structure (each treatment page, top → bottom)

1. **Header** (shared, paths fixed, Treatments active).
2. **Breadcrumb** — small bar under the nav:
   `Home / Treatments / [Treatment Name]`. Home → `../index.html`, Treatments →
   `../index.html#treatments`, current = non-link `text-on-surface-variant`.
   Use `max-w-[1280px] mx-auto px-margin-page`, `text-sm`, py-4.
3. **Hero** — `<section id="hero" ...>` so the fade observer skips it (it gets
   the hero-reveal load stagger instead). Asymmetric 2-col like homepage hero
   (`lg:grid-cols-[1.4fr_1fr]`). Left: eyebrow chip (e.g. "TREATMENT" or a
   treatment-specific tag), H1 = treatment name (`font-headline-h1` style),
   lead paragraph, two CTAs (pink "Schedule Free Exam" → `../index.html#schedule`
   + outlined phone `tel:2483134899`). Right: the reused treatment photo in the
   rounded `border-4 border-white shadow-2xl` frame. Apply `hero-reveal
   hero-reveal-N` classes to staggered children.
4. **Overview** — asymmetric image/text section (mirror the Doctor Bio block,
   `index.html:397–432`): "What it is" + "Who it's for". Reuse the
   `bg-secondary/10 text-secondary` eyebrow pill + credential chip styling.
5. **Process / What to Expect** — 3–4 numbered steps reusing the navy
   `.step-circle` pattern (`index.html:600–635`, Material icons in navy
   circles). Tailor step copy per treatment.
6. **Benefits** — grid of `.service-card` + pink `.icon-tile` cards
   (pattern from Why-Us `index.html:305–347`). 3–4 benefit cards.
7. **Mini FAQ** — `<details>` accordion reusing the FAQ pattern
   (`index.html:636–671`): summary question left + chevron right
   (`.expand-icon`), answer `text-center p-6`. 3–4 treatment-specific Q&As.
8. **Cross-links** — "Explore other treatments": link cards/pills to the other
   3 sibling pages (relative filenames, same folder).
9. **CTA band** — full-bleed `bg-primary` Schedule section reusing the Pricing
   CTA styling (`index.html:552–597`, minus the pricing card if simpler).
   Schedule → `../index.html#schedule`.
10. **Footer** (shared, paths fixed).
11. **Scripts** (shared block).

Wrap sections 4–9 in `<main>` and give each `<section>` (except `#hero`)
`class="... opacity-0 animate-fade-in-up"` consistent with homepage so the
scroll observer reveals them.

## Per-treatment copy direction (realistic placeholder)

- **Braces for Kids & Teens** — durable metal/ceramic options, lifestyle-fit
  (sports, mouthguards), growth-stage timing, parent-friendly tone, monitoring.
- **Clear Aligners** — discreet/removable, lifestyle freedom, eat-anything,
  scan-not-molds, ideal-for-adults-and-teens, comparison vs braces. Keep the
  "Most Popular" framing.
- **Braces for Adults** — "never too late", aesthetic ceramic/discreet options,
  professional-life compatible, health benefits of alignment, financing nod
  ($188/mo, $0 down — consistent with homepage).
- **Early Orthodontics** — AAO age-7 screening guidance, interceptive/Phase-1
  benefits, what early treatment prevents, reassuring parent tone.

All financing figures must match homepage: from **$188/month**, **$0 Down**,
free initial exam ($99 value). Real phone: **(248) 313-4899**.

## Build approach

Four parallel sub-agents, one page each, all reading this spec + `index.html`.
Each produces a complete standalone file. After they finish, main agent wires
the homepage links (Learn More + footer Services) and verifies in the preview
server (http://localhost:8000) — load each page, check console for errors,
screenshot desktop + mobile.

## Don'ts

- Don't introduce a Tailwind build step — keep the CDN approach.
- Don't add a second font family.
- Don't move hero out of `<section id="hero">` (observer relies on it).
- Don't invent real patient names/photos — reuse existing placeholder images.
- Don't state treatment outcomes/medical claims as guaranteed fact.
