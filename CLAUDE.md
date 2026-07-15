# Superior Practice Rebrand — project memory

Static, content-complete 16-page website for **Superior Orthodontics** (Dr. Kishawn Kole-James, Eastpointe & Southfield, MI). This is real client data in the dr-joe voice (budget-friendly, plain, price-first) — **the static site IS production**, not a design handoff. There is no WordPress/Elementor rebuild planned; what's in this repo is what ships.

---

## Quick facts

| | |
|---|---|
| **Local preview** | http://localhost:8000 (or 8001) via `preview_start "Superior Practice Rebrand"` / `"Python HTTP Server"` — check `preview_list` first, a server may already be running |
| **GitHub repo** | https://github.com/jules-orthoboost/Superior-Practice-Rebrand (public) |
| **Live site** | https://jules-orthoboost.github.io/Superior-Practice-Rebrand/ (GitHub Pages serves from `main`) |
| **Doctor** | Dr. Kishawn Kole-James, DDS (Univ. of Detroit Mercy), Orthodontics (Howard Univ.) |
| **Phone** | (248) 313-4899 |
| **Locations** | Eastpointe: 22770 Kelly Rd, Eastpointe, MI 48021 · Southfield: 26699 W 12 Mile Rd Ste 202, Southfield, MI 48034 |
| **Base offer** | from $188/mo, $1,000 down, 0% in-house financing, free exam ($99 value) |

---

## Page map (16 pages, folder-slug routing — every page is `<slug>/index.html`)

```
/                                          Home
/services/                                 Treatments hub
/services/braces/                          Braces hub
/services/braces/braces-for-kids/
/services/braces/braces-for-teens/
/services/braces/braces-for-adults/
/services/clear-aligners/
/services/early-orthodontics/
/services/retainers/
/about/                                    Doctor bio + practice story
/about/what-sets-us-apart/
/locations/                                Locations hub
/locations/eastpointe-mi/
/locations/southfield-mi/
/resources/faq/
/contact-us/
```

`sitemap.xml` lists all 16 URLs; `robots.txt` points at it. Every internal link is folder-relative (`../../` etc.) — always sanity-check depth when copy-pasting nav/breadcrumb markup between pages at different folder depths.

---

## Tech stack

- **Tailwind CSS v3, compiled** (2026-07-15 Lighthouse pass; replaced the old Play CDN). Config lives in `tailwind.config.js` (the former inline config, now shared by all pages), source in `css/input.css`, committed output in `css/styles.css`. **After adding/renaming any Tailwind class in HTML or `js/`, rebuild:** `npm run build:css` (or `npm run watch:css` while iterating). `node_modules/` is gitignored; run `npm i` once per clone.
- **Bricolage Grotesque** — self-hosted variable woff2 in `fonts/` (latin + latin-ext), `@font-face` in `css/input.css`, preloaded in every page head. No Google Fonts requests anymore; no second font family.
- **Material Symbols Outlined** — self-hosted **57-glyph subset** (`fonts/material-symbols-subset.woff2`, 24KB). **Gotcha: using a NEW icon name requires re-subsetting** — re-download from `fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&icon_names=<sorted,csv,of,ALL,used,icons>&display=block` (browser UA header for woff2), else the new icon renders as its ligature text.
- **Images:** page-referenced photos are right-sized WebP (max 1600px long side, q78). Original JPGs stay in `images/` as manifest-tracked sources — new photos should get the same WebP treatment before being referenced. Every `<img>` carries `width`/`height` (CLS); each page's hero image is `<link rel="preload" as="image">`-ed with `fetchpriority="high"`. `og:image` metas intentionally stay `.jpg`.
- **anime.js v3** (`cdn.jsdelivr.net/npm/animejs@3.2.2`) + `js/motion.js` — the shared motion system, loaded on every page:
  - Hero load stagger: elements with `data-reveal` inside `#hero` animate in on page load (translateY + opacity, staggered).
  - Section scroll reveal: an IntersectionObserver applies the same translateY/opacity animation to `main section:not(#hero)` as they scroll into view.
  - Stats count-up: elements with `data-count` (+ optional `data-suffix`) animate from 0 to the target number on scroll into view.
  - Respects `prefers-reduced-motion: reduce` — skips straight to the end state.
  - Nav-shadow-on-scroll and the before/after slider drag are still hand-rolled inline `<script>` blocks per page (not yet migrated into `js/motion.js`).

---

## Images

- All photos live in `images/`, sourced per `images/src-manifest.md` — read that file before adding, replacing, or asking about any photo. It records exactly where each image came from (**Live site** = superiororthodontics.com uploads, **Winners** = an approved Google Drive folder) and why any candidates were rejected.
- **Never** pull from a client's raw/unsorted Drive folder — only images already vetted into the manifest are approved for use.
- Two images are still deliberate placeholders: `images/placeholder-before.svg` / `placeholder-after.svg` in the homepage before/after slider, labeled as such in their alt text. Swap them for real patient photos once the client provides a before/after pair — none was available in the approved source set at build time.

---

## Known gaps / TODOs

- **Contact form has no backend.** `contact-us/index.html` has `<!-- TODO(Jules): wire form backend — no CMS -->` on a `<form action="#">`. Needs a real submit endpoint (Formspree, Netlify Forms, or similar) before launch.
- **Before/after slider** uses placeholder SVGs (see Images above) — swap when client photos arrive.
- **Real map embeds** — location pages have `MAP EMBED —` placeholder text where a Google Maps iframe should go; needs an embed API key decision.
- **Custom domain cutover** (superiororthodontics.com DNS, currently SiteGround/GoDaddy) is a separate op, not part of this repo's scope.
- Deferred content (later pass, not missing by accident): ceramic-braces, cost-of-braces, clear-braces-vs-metal, clear-aligners-for-kids, patient-reviews, before-and-after, blog.

---

## Quality gates

Run both before any deploy — both must exit 0:

```
python scripts/check-links.py   # every internal href/src resolves; forbidden strings (placeholder phones, "Invisalign", placehold.co, etc.) are absent
python scripts/check-seo.py     # meta tags, canonical URLs, sitemap coverage, etc.
```

---

## Copy voice

- Written in **dr-joe voice**: plain, warm, price-first. Lead with the number ($188/mo, $99 exam, $1,000 down), not adjectives.
- **No eyebrows** — headlines lead directly, no small label line above them.
- Before shipping new or edited copy, run it through the `humanizer` skill on the highest-traffic pages (home, braces hub, clear-aligners, FAQ, contact) — check for em dashes, "testament/vibrant/nestled"-style filler, rule-of-three padding, and vague-authority phrasing. This site has been swept clean as of the last QA pass; keep it that way.

---

## Working with git/GitHub from this project

- **Git identity not in any config.** Every commit must set identity via env vars to avoid touching global config:
  ```powershell
  $env:GIT_AUTHOR_NAME='jules-orthoboost'
  $env:GIT_AUTHOR_EMAIL='jules-orthoboost@users.noreply.github.com'
  $env:GIT_COMMITTER_NAME='jules-orthoboost'
  $env:GIT_COMMITTER_EMAIL='jules-orthoboost@users.noreply.github.com'
  ```
- `gh` CLI installed via winget at `C:\Program Files\GitHub CLI\gh.exe`. Add to PATH per session if needed: `$env:PATH += ';C:\Program Files\GitHub CLI'`.
- After push, GitHub Pages auto-rebuilds in ~30s–1min. Cache: hard-refresh with Ctrl+Shift+R.
- PowerShell wraps git's stderr as red errors — the "exit code" noise around `git push` is cosmetic. Look for `* [new branch]` or `xxxxx..yyyyy main -> main` to confirm success.

---

## Don'ts / gotchas

- Don't reintroduce `cdn.tailwindcss.com` or Google Fonts `<link>`s — CSS is compiled (`npm run build:css`) and fonts are self-hosted as of the 2026-07-15 Lighthouse pass. Editing classes without rebuilding `css/styles.css` silently ships unstyled markup.
- Don't add a second font family — Bricolage Grotesque only.
- Don't move any page's hero out of `<section id="hero">` — `js/motion.js` specifically targets `#hero [data-reveal]` for the load-stagger animation and excludes `#hero` from the scroll-reveal observer.
- Don't `git config --global` anything — this repo's commits use env-var identity so the user's machine-wide git config stays untouched.
- Don't source images from a client's raw/unsorted Drive folder — only from `images/src-manifest.md`-approved sources.
