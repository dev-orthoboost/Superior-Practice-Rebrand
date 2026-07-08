# Superior Orthodontics Real-Data Multi-Page Build — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Superior-Practice-Rebrand static site from a 9-page placeholder-data design spec into the production 16-page site with verified client data, real photos, SEO-sitemap URLs, Dr. Joe voice, and anime.js motion.

**Architecture:** Static multi-page HTML (Tailwind CDN + Bricolage Grotesque + anime.js CDN), folder-per-slug (`<slug>/index.html`) mirroring the client's SEO Sitemap spreadsheet, served from GitHub Pages. Each page is standalone; shared chrome (head/header/footer/scripts) is copied per page with per-depth relative paths.

**Tech Stack:** HTML + Tailwind CSS via CDN, anime.js v3 via CDN, vanilla JS, Python http.server for preview, git/GitHub Pages for deploy.

**Spec:** `docs/superpowers/specs/2026-07-07-real-data-multipage-design.md` — the canonical data block there is LAW.

## Global Constraints

- Phone everywhere: **(248) 313-4899** / `tel:2483134899`. The strings `(586) 555-0123`, `tel:5865550123`, `(248) 555-0987`, `tel:2485550987`, `1234 Gratiot Avenue`, `9876 Telegraph Road` must not exist in the final site.
- Offer everywhere: **from $188/mo · $1,000 down · 0% in-house financing · free consultation ($99 exam value)**. The string `$0 down`/`$0 Down` must not exist.
- Eastpointe: 22770 Kelly Rd, Eastpointe, MI 48021 · Southfield: 26699 W 12 Mile Rd Ste 202, Southfield, MI 48034.
- Hours: Mon–Thu 9:00–5:00 (lunch 1–2) · Closed Fri · open 2nd & 4th Saturdays.
- NEVER the word "Invisalign" or "lingual braces" as offered services; aligners are "clear aligners" (in-house). No Medicaid, no Spanish, no invented credentials. Doctor: **Dr. Kishawn Kole-James** (board-certified, 8+ yrs — these facts only).
- Voice: **/dr-joe** persona (plain, warm, price-first). ALL copy passes the **/humanizer** methodology. **No eyebrow labels** — strip existing eyebrow chips/pills, size headlines up.
- Photos ONLY from Drive `Winners` (`1vnN3JPET4SR3tgZiDxyCBQsJGbuxTMU8`), `Working Web Files` (`1homTnojVZk2sk-LmORmGmC907hHyaBxB`), `Brand Assets` (`1EPLwXg1P-ZA9K2ZwKbIj0r4fX27aPqWm`) — NEVER `Raw` — plus the client's own live-site images (`superiororthodontics.com/wp-content/uploads/...`, listed in Task 1). No ad exports (`Seasonal_*`, `Evergreen_*`, `Kids-Club_*`).
- No Tailwind build step; no second font; keep hero inside `<section id="hero">`; keep `prefers-reduced-motion` catch-all.
- Git identity per commit (never global): `GIT_AUTHOR_NAME/EMAIL` + `GIT_COMMITTER_NAME/EMAIL` = `jules-orthoboost` / `jules-orthoboost@users.noreply.github.com`.
- Repo root: `C:\Users\jules\Desktop\OrthoBoost\Superior-Practice-Rebrand`. Preview: `preview_start "Python HTTP Server"` → http://localhost:8000.

## Final page map (16 pages, from the SEO Sitemap sheet)

| # | URL (folder/index.html) | Source | Nav depth |
|---|---|---|---|
| 1 | `/` (`index.html`) | existing, data pass | 0 |
| 2 | `/services/` | existing `treatments/index.html`, re-slugged | 1 |
| 3 | `/services/braces/` | NEW hub (links kids/teens/adults) | 2 |
| 4 | `/services/braces/braces-for-kids/` | split from `treatments/braces-kids-teens.html` | 3 |
| 5 | `/services/braces/braces-for-teens/` | NEW (split, teen-angled) | 3 |
| 6 | `/services/braces/braces-for-adults/` | existing `treatments/braces-adults.html` | 3 |
| 7 | `/services/clear-aligners/` | existing `treatments/clear-aligners.html` | 2 |
| 8 | `/services/early-orthodontics/` | existing `treatments/early-orthodontics.html` | 2 |
| 9 | `/services/retainers/` | NEW (Hawley + clear; from Notion services) | 2 |
| 10 | `/about/` | existing `about.html` (Dr. Kole-James bio) | 1 |
| 11 | `/about/what-sets-us-apart/` | existing `why-us.html`, re-slugged | 2 |
| 12 | `/locations/` | existing `locations.html`, real data | 1 |
| 13 | `/locations/eastpointe-mi/` | NEW per-office | 2 |
| 14 | `/locations/southfield-mi/` | NEW per-office | 2 |
| 15 | `/resources/faq/` | NEW (homepage FAQ promoted + expanded) | 2 |
| 16 | `/contact-us/` | NEW (both offices + appointment form) | 1 |

**Relative-path rule (GitHub Pages project site — no absolute `/` URLs):** every internal href is relative. Prefix per depth: depth 0 → `services/braces/` etc.; depth 1 → `../`; depth 2 → `../../`; depth 3 → `../../../`. Link *to* a page as `<prefix><slug>/` (trailing slash — GH Pages serves index.html). Logo/home = `<prefix>` alone (or `../` chain). `tel:` links never change.

---

### Task 1: Asset pull — real photos + logo into `images/`

**Files:**
- Create: `images/src-manifest.md` (photo → source → page-slot mapping)
- Create: `images/*.jpg|png|svg` (descriptive kebab-case names)

**Interfaces:**
- Produces: local image paths used by Tasks 3–7, e.g. `images/dr-kole-james.png`, `images/logo-superior.svg`, `images/team-superior.png`, `images/office-southfield.jpg`.

- [ ] **Step 1: Download the client's live-site photos** (already web-optimized, client-owned — fastest wins). From repo root in Git Bash:

```bash
cd images
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/02/dr-kishawn-kole-james-2.png
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/03/dr-kole-james-orthodontist-family.jpeg
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/02/dr-kole-james-family-1.jpg
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/02/Superior-Orthodontics-team.png
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/02/best-orthodontist-in-detroit-mi-team-image-scaled.jpg
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/03/best-orthodontist-eastpointe-mi-cropped.jpeg
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/03/best-orthodontist-southfield-mi.jpeg
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/02/southfield.jpg
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/07/Black-teenager-with-braces-smiling.webp
curl -sLO https://superiororthodontics.com/wp-content/uploads/2024/08/clear-aligners.webp
curl -sLO https://superiororthodontics.com/wp-content/uploads/2024/08/metal-braces.webp
curl -sLO https://superiororthodontics.com/wp-content/uploads/2024/08/early-orthodontic-services.webp
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/03/braces-for-adults-scaled.jpeg
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/02/IMG_2401.jpg
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/03/IMG_2336-scaled.jpg
curl -sLO https://superiororthodontics.com/wp-content/uploads/2025/03/IMG_2364-scaled.jpg
ls -la
```
Expected: each file > 10 KB (verify none are HTML error pages: `file *` shows image types).

- [ ] **Step 2: Download the logo SVG from Drive Brand Assets** — Drive file id `1FPHnKukbPf3xDIbkZxZONN_rKou7A1hO` (`Logo_Superior Orthodontics.svg`) via the Drive MCP `download_file_content` tool (or `read_file_content` for metadata + browser download if binary fetch unsupported). Save as `images/logo-superior.svg`. If MCP download fails, extract the inline logo SVG already embedded in `index.html` (id `Layer_1`) into the file instead.

- [ ] **Step 3: Download 6–10 Winners candid JPGs** (JPG/PNG only — skip HEIC to avoid conversion tooling): Drive ids `1oj0LkVbp7Ia-aYp-yeV9FpKV9VfgTAt4` (AC45E551…jpg), `1xTCYcf0q0Bl3_a_hfw7ixGpEKs7M_PKp` (IMG_9319), `1m8_R41Za9dn9fYzJkE5SsARmNXlmGyyg` (IMG_0179), `1q0YfBV-dEx6_623FHuHhwsm-PJaVzh0_` (IMG_0183), `183Ggs2bdnqJqhc3tW8QoJnLxyIyw-Ftl` (IMG_6599), `1-UNhrJTkGJrSHMQFVi2JEEKJ21rCBpoW` (IMG_3382), `12wz88iN3BpSC6pGnxJgrDi-z0-oX8jPR` (IMG_3289), `1dQFC-6YXR6kFcrYZCI30fsPY_o7bw6VC` (IMG_3538).

- [ ] **Step 4: Visually triage with the Read tool** (each image renders visually). Reject anything blurry, text-baked, or off brand-imagery rules (no cold clinical light, real people preferred). Rename keepers descriptively:

```bash
cd images
mv dr-kishawn-kole-james-2.png dr-kole-james.png
mv Superior-Orthodontics-team.png team-superior.png
mv best-orthodontist-southfield-mi.jpeg office-southfield.jpg
mv best-orthodontist-eastpointe-mi-cropped.jpeg office-eastpointe.jpg
# ...continue for each keeper; kebab-case, content-descriptive
```

- [ ] **Step 5: Write `images/src-manifest.md`** — table: local filename | source (URL or Drive id) | assigned page/slot | alt text draft. Every keeper gets a row; every page slot in the Task 4 map gets a filename.

- [ ] **Step 6: Commit**

```bash
git add images/ && git commit -m "assets: pull real client photos + logo (Winners/live site; per src-manifest)"
```

---

### Task 2: Restructure to SEO-sitemap URLs

**Files:**
- Move: `treatments/index.html` → `services/index.html`; `treatments/braces-kids-teens.html` → `services/braces/braces-for-kids/index.html`; `treatments/braces-adults.html` → `services/braces/braces-for-adults/index.html`; `treatments/clear-aligners.html` → `services/clear-aligners/index.html`; `treatments/early-orthodontics.html` → `services/early-orthodontics/index.html`; `about.html` → `about/index.html`; `why-us.html` → `about/what-sets-us-apart/index.html`; `locations.html` → `locations/index.html`
- Create: `scripts/check-links.py` (link checker, reused every task)
- Modify: every moved page + `index.html` — all internal hrefs/srcs re-prefixed per the depth table

**Interfaces:**
- Produces: the folder layout of the Final page map; `python scripts/check-links.py` exits 0 when all internal links/images resolve.

- [ ] **Step 1: Write the failing test — `scripts/check-links.py`:**

```python
import re, sys, pathlib
root = pathlib.Path(__file__).resolve().parents[1]
errors = []
for page in root.rglob('index.html'):
    if any(p in page.parts for p in ('.git', 'docs', 'node_modules')): continue
    html = page.read_text(encoding='utf-8', errors='ignore')
    for attr, target in re.findall(r'(href|src)="([^"#]+)"', html):
        if target.startswith(('http', 'tel:', 'mailto:', 'data:', '//')): continue
        t = target.split('?')[0].split('#')[0]
        if not t: continue
        resolved = (page.parent / t).resolve()
        if resolved.is_dir(): resolved = resolved / 'index.html'
        if not resolved.exists():
            errors.append(f'{page.relative_to(root)}: {attr}="{target}"')
# forbidden strings gate (Global Constraints)
FORBIDDEN = ['555-0123', '555-0987', '5865550123', '2485550987',
             '1234 Gratiot', '9876 Telegraph', '$0 down', '$0 Down',
             'Invisalign', 'placehold.co', 'lh3.googleusercontent']
for page in root.rglob('*.html'):
    if any(p in page.parts for p in ('.git', 'docs', 'node_modules')): continue
    html = page.read_text(encoding='utf-8', errors='ignore')
    for f in FORBIDDEN:
        if f in html: errors.append(f'{page.relative_to(root)}: FORBIDDEN "{f}"')
print('\n'.join(errors) or 'ALL LINKS + CONTENT GATES PASS')
sys.exit(1 if errors else 0)
```

- [ ] **Step 2: Run it — expect FAIL** (`python scripts/check-links.py`) listing the current placeholder phones, `$0 Down`, placehold.co, and googleusercontent hits. This is the RED baseline; it stays red until Tasks 3–4 and goes green page-group by page-group.

- [ ] **Step 3: `git mv` the pages into the new folders** (exact moves in Files above), then rewrite internal links in ALL pages per the depth table (old `treatments/…`, `about.html`, `why-us.html`, `locations.html` refs → new folder slugs with correct `../` prefixes; moved pages' asset paths gain `../` levels, e.g. depth-3 pages reference `../../../images/...`).

- [ ] **Step 4: Add FAQ + Contact to nav/footer on every page** (desktop nav, mobile strip, footer Practice list) pointing at `resources/faq/` and `contact-us/` with correct prefixes — the pages don't exist until Task 5, so `check-links.py` will flag them: acceptable interim state, note it.

- [ ] **Step 5: Verify structure** — run `python scripts/check-links.py`; the ONLY acceptable failures now are (a) forbidden-content strings (fixed in Task 3), (b) links to the six not-yet-built pages. Zero broken links among moved pages.

- [ ] **Step 6: Commit** — `git add -A && git commit -m "structure: adopt SEO-sitemap folder URLs + link checker"`

---

### Task 3: Real-data pass on all 9 existing pages

**Files:**
- Modify: `index.html`, `services/index.html`, `services/braces/braces-for-adults/index.html`, `services/braces/braces-for-kids/index.html`, `services/clear-aligners/index.html`, `services/early-orthodontics/index.html`, `about/index.html`, `about/what-sets-us-apart/index.html`, `locations/index.html`

**Interfaces:**
- Consumes: canonical data block (Global Constraints).
- Produces: pages whose NAP/offer/hours are real; forbidden-strings gate passes except image hosts (Task 4).

- [ ] **Step 1: Site-wide replacements** (in each file):
  - `(586) 555-0123` → `(248) 313-4899`; `tel:5865550123` → `tel:2483134899`; same for the 248-555 pair.
  - `1234 Gratiot Avenue, Eastpointe MI 48021` → `22770 Kelly Rd, Eastpointe, MI 48021`; `9876 Telegraph Road, Southfield MI 48033` → `26699 W 12 Mile Rd Ste 202, Southfield, MI 48034`.
  - Any `$0 Down`/`$0 down payment options` → `$1,000 down · 0% in-house financing` (badge form: `0% In-House Financing`).
  - Hours lines → `Mon–Thu 9–5 · Closed Fri · Open 2nd & 4th Saturdays`.
- [ ] **Step 2: Locations page real content** — Eastpointe card gains "On 9 Mile & Kelly" + Macomb County service note; Southfield card gains "12 Mile & Northwestern — Amazing Smiles building, 2nd floor" + Oakland County; both link to the (Task 5) per-office pages via `eastpointe-mi/`, `southfield-mi/`.
- [ ] **Step 3: Doctor name** — where bio text appears use "Dr. Kishawn Kole-James"; keep credentials to board-certified + 8+ years + community-clinic background already on the page.
- [ ] **Step 4: Verify** — `python scripts/check-links.py`: no phone/address/`$0` forbidden hits remain (`Invisalign`, image hosts may still fail → Tasks 4). Load http://localhost:8000 pages in preview; confirm rendered NAP by DOM read, not screenshot.
- [ ] **Step 5: Commit** — `git commit -am "data: real NAP, hours, offer across existing pages"`

---

### Task 4: Real photos into pages

**Files:**
- Modify: all 9 pages — every `<img src="https://lh3.googleusercontent...">` and `placehold.co` swapped to `images/*` per `images/src-manifest.md`

**Slot map (minimum):** hero → best family/patient candid; doctor bio + about → `dr-kole-james.png`; treatments cards → `metal-braces`, `clear-aligners`, teen smile, `early-orthodontic-services` images; before/after slider → two real patient smiles from Winners (labeled "actual patient" only if manifest marks them as such — otherwise neutral alt); locations → `office-eastpointe.jpg` / `office-southfield.jpg`; testimonials/team band → `team-superior.png`.

- [ ] **Step 1: Swap every remote/placeholder `src`** to the local file per manifest, with correct `../` depth prefix, and write descriptive `alt` (pattern: "what's happening + Superior Orthodontics + city, MI" — e.g. `alt="Dr. Kishawn Kole-James with a young patient at Superior Orthodontics in Eastpointe, MI"`). Update the logo `<img>`/inline SVG usage to `images/logo-superior.svg` where a file reference is cleaner.
- [ ] **Step 2: Verify** — `python scripts/check-links.py` passes the `placehold.co` + `googleusercontent` gates and all image paths resolve; spot-check pages in preview via DOM (`preview_snapshot`) for missing-image icons; check natural-size vs display-size sanity on the largest hero image.
- [ ] **Step 3: Commit** — `git commit -am "assets: real client photos + descriptive alt site-wide"`

---

### Task 5: Build the 7 new pages

**Files:**
- Create: `services/braces/index.html`, `services/braces/braces-for-teens/index.html`, `services/retainers/index.html`, `locations/eastpointe-mi/index.html`, `locations/southfield-mi/index.html`, `resources/faq/index.html`, `contact-us/index.html`

**Interfaces:**
- Consumes: shared chrome copied from `index.html` (head/header/footer/scripts) with depth-correct paths; design system classes from the 2026-05-29 specs; photos from manifest.
- Produces: pages the Task 2 nav already links to; `check-links.py` fully green on links.

Structure per page (matches existing detail-page pattern: breadcrumb → `#hero` → content sections → CTA band → footer):

- [ ] **Step 1: `services/braces/` hub** — H1 "Braces in Metro Detroit", intro (metal/ceramic/accelerated, from $188/mo), three cards linking `braces-for-kids/`, `braces-for-teens/`, `braces-for-adults/`, mini-FAQ, CTA band.
- [ ] **Step 2: `services/braces/braces-for-teens/`** — teen-angled split of the old kids-teens content (sports/mouthguards, color options, confidence, monitoring); kids page correspondingly trims to kids/Phase-1 focus.
- [ ] **Step 3: `services/retainers/`** — Hawley + clear retainers (Notion: both offered), why retention matters, replacement pricing honesty (no invented prices — "call for retainer pricing"), CTA.
- [ ] **Step 4: Per-office pages** — unique H1 ("Orthodontist in Eastpointe, MI" / "…Southfield, MI"), full NAP + hours block, directions paragraph (9 Mile & Kelly / 12 Mile & Northwestern Amazing Smiles bldg 2nd fl), service-area copy (Macomb / Oakland County), office photo, embedded-map placeholder (`<div>` labeled `MAP EMBED — Google Maps iframe for <address>`), local FAQ (parking, first visit), CTA.
- [ ] **Step 5: `resources/faq/`** — promote the homepage `<details>` accordion; expand to 10–12 Q&As covering: cost ($188/mo · $1,000 down · 0%), free consult ($99 value), braces vs clear aligners, ages (kids 7+/teens/adults), treatment length, insurance/HSA/FSA (accepts most major plans — from USPs), emergencies (same-day; after-hours for existing patients), retainers, two locations, no-Medicaid answered plainly.
- [ ] **Step 6: `contact-us/`** — both office cards (NAP/hours/click-to-call), appointment-request form (name/phone/email/preferred office/preferred time, `action="#"` + HTML comment `<!-- TODO(Jules): wire form backend — no CMS -->`), map placeholders.
- [ ] **Step 7: All copy on these pages is written in /dr-joe voice and passed through /humanizer before it lands in the file.** No eyebrows anywhere. Headline bar: plain + price-first (e.g. FAQ hero: "Straight answers about braces." / Contact: "Come say hi. First visit's free.").
- [ ] **Step 8: Verify** — `python scripts/check-links.py` = `ALL LINKS + CONTENT GATES PASS` (first fully-green run); preview-load each new page, console clean.
- [ ] **Step 9: Commit** — `git commit -am "pages: braces hub, teens, retainers, per-office, FAQ, contact"`

---

### Task 6: Voice + eyebrow pass on the 9 existing pages

**Files:**
- Modify: all 9 existing pages' copy blocks

- [ ] **Step 1: Strip every eyebrow** (the `bg-secondary/10 text-secondary` pill spans and small-caps kicker labels above H1/H2s) on all pages; bump the following headline one size step where the removal leaves a gap.
- [ ] **Step 2: Rewrite copy in /dr-joe voice via /humanizer** — homepage hero, section leads, treatment intros, about bio framing, CTA bands. Keep verified facts; price-first where natural ("Braces from $188 a month. $1,000 down, 0% interest, no surprises."). Ban list respected (no "seamless", "elevate", "state-of-the-art", no it's-not-X-it's-Y).
- [ ] **Step 3: Verify** — grep zero remaining eyebrow-pill classes adjacent to headings; read every page's rendered text top-to-bottom once for slop patterns; `check-links.py` still green.
- [ ] **Step 4: Commit** — `git commit -am "copy: dr-joe voice + humanizer pass, eyebrows removed"`

---

### Task 7: anime.js motion

**Files:**
- Create: `js/motion.js` (single shared file, referenced with depth-correct relative path from every page)
- Modify: all 16 pages — add `<script src=".../anime.min.js">` + `<script src=".../js/motion.js" defer>`; remove the superseded inline observer/count-up JS

- [ ] **Step 1: Add CDN + port the motion vocabulary** to anime.js in `js/motion.js`:

```html
<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js"></script>
```

```javascript
// js/motion.js — Superior Orthodontics shared motion (anime.js v3)
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
// 1. Hero load stagger (replaces .hero-reveal-N CSS delays)
if (!reduced) anime({ targets: '#hero [data-reveal]', translateY: [24, 0], opacity: [0, 1],
  delay: anime.stagger(110), duration: 700, easing: 'easeOutCubic' });
else document.querySelectorAll('#hero [data-reveal]').forEach(el => el.style.opacity = 1);
// 2. Scroll section reveal (replaces .animate-fade-in-up observer)
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return; io.unobserve(e.target);
  if (reduced) { e.target.style.opacity = 1; return; }
  anime({ targets: e.target, translateY: [28, 0], opacity: [0, 1], duration: 650, easing: 'easeOutCubic' });
}), { threshold: 0.12 });
document.querySelectorAll('main section:not(#hero)').forEach(s => { s.style.opacity = 0; io.observe(s); });
// 3. Stats count-up (replaces hand-rolled easeOutCubic loop)
const statIO = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return; statIO.unobserve(e.target);
  const end = +e.target.dataset.count, suffix = e.target.dataset.suffix || '';
  if (reduced) { e.target.textContent = end.toLocaleString() + suffix; return; }
  const o = { n: 0 };
  anime({ targets: o, n: end, round: 1, duration: 1600, easing: 'easeOutCubic',
    update: () => e.target.textContent = o.n.toLocaleString() + suffix });
}), { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => statIO.observe(el));
```

- [ ] **Step 2: Wire per page** — hero children get `data-reveal` (replacing `hero-reveal-N` classes); remove the old inline `<script>` blocks for the observer + count-up (keep the before/after slider + nav-shadow inline JS — those are interaction, not motion). Keep hover-lift CSS untouched.
- [ ] **Step 3: Verify** — preview: homepage hero staggers on load, sections reveal on scroll, stats count up once, before/after slider still drags; console zero errors; toggle `prefers-reduced-motion` emulation → everything visible instantly with no animation.
- [ ] **Step 4: Commit** — `git commit -am "motion: anime.js shared motion system (stagger/reveal/count-up)"`

---

### Task 8: SEO layer

**Files:**
- Create: `sitemap.xml`, `robots.txt`, `scripts/check-seo.py`
- Modify: `<head>` of all 16 pages

- [ ] **Step 1: Write the failing test — `scripts/check-seo.py`:**

```python
import re, sys, pathlib, json
root = pathlib.Path(__file__).resolve().parents[1]
BASE = 'https://jules-orthoboost.github.io/Superior-Practice-Rebrand/'
pages = [p for p in root.rglob('index.html') if not any(x in p.parts for x in ('.git','docs','node_modules'))]
titles, descs, errors = {}, {}, []
for p in pages:
    h = p.read_text(encoding='utf-8', errors='ignore'); rel = str(p.relative_to(root))
    t = re.search(r'<title>(.*?)</title>', h, re.S); d = re.search(r'name="description" content="([^"]+)"', h)
    if not t: errors.append(f'{rel}: no <title>')
    elif t.group(1).strip() in titles: errors.append(f'{rel}: duplicate title of {titles[t.group(1).strip()]}')
    else: titles[t.group(1).strip()] = rel
    if not d: errors.append(f'{rel}: no meta description')
    elif d.group(1) in descs: errors.append(f'{rel}: duplicate description of {descs[d.group(1)]}')
    else: descs[d.group(1)] = rel
    if 'rel="canonical"' not in h: errors.append(f'{rel}: no canonical')
    if 'property="og:title"' not in h: errors.append(f'{rel}: no og:title')
    for m in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        try: json.loads(m)
        except Exception as e: errors.append(f'{rel}: invalid JSON-LD ({e})')
    for img in re.findall(r'<img(?![^>]*alt=)[^>]*>', h): errors.append(f'{rel}: img missing alt')
if not (root/'sitemap.xml').exists(): errors.append('missing sitemap.xml')
if not (root/'robots.txt').exists(): errors.append('missing robots.txt')
print('\n'.join(errors) or 'SEO GATES PASS'); sys.exit(1 if errors else 0)
```

- [ ] **Step 2: Run — expect FAIL** on most pages (no meta descriptions/canonicals/OG today).
- [ ] **Step 3: Per-page head block** — unique `<title>` + description keyed to the SEO sheet's intent (home: `Orthodontist in Eastpointe & Southfield, MI | Superior Orthodontics`; braces hub: `Braces in Metro Detroit | From $188/mo | Superior Orthodontics`; per-office: `Orthodontist in Eastpointe, MI | Superior Orthodontics` etc. — every one unique), `<link rel="canonical" href="<BASE><slug>/">`, `og:title/og:description/og:image` (og:image = hero photo absolute URL), `og:url`.
- [ ] **Step 4: JSON-LD** — on `locations/index.html` and each per-office page, one `Orthodontist` node per office:

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Orthodontist",
 "name":"Superior Orthodontics — Eastpointe",
 "telephone":"+12483134899","email":"info@superiororthodontics.com",
 "url":"https://jules-orthoboost.github.io/Superior-Practice-Rebrand/locations/eastpointe-mi/",
 "image":"https://jules-orthoboost.github.io/Superior-Practice-Rebrand/images/office-eastpointe.jpg",
 "priceRange":"$188/mo",
 "address":{"@type":"PostalAddress","streetAddress":"22770 Kelly Rd","addressLocality":"Eastpointe","addressRegion":"MI","postalCode":"48021","addressCountry":"US"},
 "areaServed":["Macomb County MI","Oakland County MI"],
 "openingHoursSpecification":[
   {"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday"],"opens":"09:00","closes":"17:00"}]}
</script>
```
(Southfield node mirrors with its address/photo/URL. Saturday's 2nd-and-4th pattern can't be expressed in openingHoursSpecification — state it in visible text only.)

- [ ] **Step 5: `sitemap.xml`** (all 16 canonical URLs) **+ `robots.txt`** (`User-agent: *\nAllow: /\nSitemap: <BASE>sitemap.xml`).
- [ ] **Step 6: Verify** — `python scripts/check-seo.py` → `SEO GATES PASS`; `python scripts/check-links.py` still green.
- [ ] **Step 7: Commit** — `git commit -am "seo: titles/meta/canonical/OG, Orthodontist JSON-LD, sitemap+robots"`

---

### Task 9: Full QA + deploy

- [ ] **Step 1: Run both gates** — `check-links.py` + `check-seo.py` both exit 0.
- [ ] **Step 2: Preview sweep** — load all 16 pages at http://localhost:8000; console error-free; nav works from a depth-3 page (braces-for-kids → home, FAQ, contact); mobile viewport (preview_resize 375) nav strip + hero legible; reduced-motion emulation OK.
- [ ] **Step 3: Copy slop-check** — run the /humanizer skill over the final rendered text of the 5 highest-traffic pages (home, braces hub, clear-aligners, FAQ, contact); fix flags.
- [ ] **Step 4: Push** — env-var identity, `git push origin main`; wait ~1 min; verify 3 spot URLs live on `jules-orthoboost.github.io/Superior-Practice-Rebrand/` (home, `services/braces/`, `locations/eastpointe-mi/`) return the new content.
- [ ] **Step 5: Update `CLAUDE.md`** — rewrite Quick facts/File structure/Page sections for the 16-page layout, anime.js motion, no-WordPress status; note form-backend TODO. Commit + push.

---

## Deferred (explicitly out of scope this build)
- `/services/braces/ceramic-braces/`, `/cost-of-braces/`, `/clear-braces-vs-metal/`, `/services/clear-aligners/for-kids/`, `/resources/patient-reviews/`, `/resources/before-and-after/`, blog — later content passes per the SEO sheet.
- Real map embeds (need decision on Google Maps embed keys), form backend, custom domain cutover (superiororthodontics.com DNS is SiteGround/GoDaddy — separate op).
- HEIC Winners photos (need conversion tooling decision).
