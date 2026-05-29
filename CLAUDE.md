# Superior Practice Rebrand — project memory

Landing page for **Superior Orthodontics** (an orthodontist practice in the Detroit area). Single-file static HTML site, built from a Figma design as a reference/handoff deliverable. A WordPress + Elementor build is the final target for the client; this HTML serves as the design spec / preview, not production code.

---

## Quick facts

| | |
|---|---|
| **Main file** | `index.html` (~80 KB, single-file site) |
| **Local preview** | http://localhost:8000 (via `preview_start "Python HTTP Server"`) |
| **GitHub repo** | https://github.com/jules-orthoboost/Superior-Practice-Rebrand (public) |
| **Live site** | https://jules-orthoboost.github.io/Superior-Practice-Rebrand/ |
| **gh CLI user** | `jules-orthoboost` (Figma email: `creative@startorthoboost.com`) |
| **Figma file** | `figma.com/design/jMgMdOgcvB7H6JeaQ23KAy/Untitled` (was edited via Figma MCP; MCP currently disconnected per last system reminder) |

---

## File structure

```
figma-export/
├── index.html         # The site (everything: markup, styles, scripts)
├── images/            # 52 placeholder PNGs (Figma asset UUIDs as filenames)
├── CLAUDE.md          # This file
├── .gitignore         # excludes Page.jsx + image-urls.txt
├── Page.jsx           # raw Figma React export — NOT used, kept for reference, gitignored
├── image-urls.txt     # expired Figma CDN URLs from initial export, gitignored
└── .claude/launch.json # dev server config (Python http.server / npx serve / npx http-server)
```

**Important**: `preview_start` looks for `.claude/launch.json` in CWD (`C:\Program Files\TiXL`), not the project. A copy lives in both places; the CWD one has absolute paths to the project baked in via `-d` / positional args. If editing one, edit both.

---

## Tech stack

- **Tailwind CSS** via CDN (`cdn.tailwindcss.com`) — dev-only setup; not production-ready. Custom config inline at top of file: brand colors (primary `#143953`, secondary `#D45C84`, surface `#f9f9ff`, navy-50/100/200, paper-50/100, ink-700) and headline/body font tokens.
- **Bricolage Grotesque** (Google Fonts variable, axes `opsz 12..96`, `wdth 75..100`, `wght 200..800`) — used for **all** text. No second font family.
- **Material Symbols Outlined** for icons.
- **Vanilla JS** at bottom of file: scroll observer for section fade-in, IntersectionObserver count-up for stats, pointer-event before/after slider drag.

---

## Page sections (in order)

1. **Header** — glass nav, sticky. On `md+`: logo + nav links + phone + Schedule CTA in one row. On mobile: row 1 = logo + Schedule CTA; row 2 = nav links (`.md:hidden`), still sticky.
2. **Hero** — `id="hero"`, asymmetric 1.4fr/1fr grid (text-heavy), image capped at `max-w-[400px]`. Buttons: pink Schedule + outlined phone (`tel:2483134899`).
3. **Stats Bar** — navy full-width bg, 4 counts with `data-count` count-up. Numbers are `text-surface` (off-white `#F9F9FF`), labels are `text-white/60`.
4. **Why Us** — 4 service cards, pink (`bg-secondary`) icon tiles with white icons, `.service-card` hover lift + `.icon-tile` rotate.
5. **Treatments** — 4 image cards with hover scale on `.group-hover img`. "Clear Aligners" has "Most Popular" badge.
6. **Doctor Bio** (`#about`) — asymmetric image-left/text-right.
7. **Before/After Gallery** (NEW from boss feedback pass) — asymmetric 5fr/7fr, wider container (max-w-1440), interactive slider with `data-ba-slider`. **Placeholder images via `placehold.co`** — must be replaced with real client photos. Slider knob shows the brand **S logomark** (extracted from main logo SVG, 3 paths, `viewBox="-40 -15 310 420"`, `h-9`).
8. **Testimonials** — asymmetric 4fr/8fr split. Left: eyebrow + heading + Google chip. Right: 1 featured testimonial (`md:col-span-2`) + 2 smaller. Bg: `bg-navy-50/30`. Cards: `bg-white`.
9. **Pricing CTA** — full-bleed `bg-primary` (no inner rounded box). Wider container (max-w-1440). Decorative blobs anchored to section corners. Left: heading + Schedule + $0 Down badge (stacked vertically). Right: pricing card with "from $188 /mo" + checklist.
10. **What to Expect** — `bg-paper-50` for visual variation. 4 numbered steps replaced with Material icons (`stethoscope`, `dentistry`, `receipt_long`, `forum`) in navy circles.
11. **FAQ** (`#faq`) — `<details>` accordion. Summary kept default (question left, chevron right). Answer text inside is `text-center` with full `p-6` padding (no `pt-0`).
12. **Locations** (`#locations`) — 2 clinic cards. Hours line is `text-[15px]`.
13. **Footer** — navy bg, logo via SVG with `brightness-0 invert` (turns navy+pink paths white).

---

## Animation system

| Class | What |
|---|---|
| `.hero-reveal-1..5` | Hero load stagger (page-load only, no scroll trigger). On `<section id="hero">` itself there is no `opacity-0` — the JS skips `#hero` from the section observer. |
| `.opacity-0 .animate-fade-in-up` | Section-level scroll fade (every section except hero). JS IntersectionObserver adds `.animate-fade-in-up` and removes `.opacity-0` on intersection. |
| `data-count` + `data-suffix` | Stats bar count-up. Animates 0 → target over 1.6s with easeOutCubic. Initial text should be `0` or `0+` to avoid flicker. |
| `.hero-bob` `.hero-twinkle` `.hero-dot-pulse` `.hero-ken-burns` | Infinite loop accents in hero (rating chip, star, badge dot, patient image). Different periods so they desync. |
| `.service-card` `.testimonial-card` `.location-card` `.step-circle` `.icon-tile` `.nav-link` | Hover refinements (lift, scale, underline). All use the same `cubic-bezier(0.165, 0.84, 0.44, 1)` ease. |
| `.ba-slider` + JS | Before/after drag. Pointer events. Clip-path on `.ba-after`. Handle position updated via `style.left`. |
| `@media (prefers-reduced-motion: reduce)` | Catch-all that disables every animation/transition. |

---

## Working with git/GitHub from this project

- `gh` CLI installed via winget at `C:\Program Files\GitHub CLI\gh.exe`. Add to PATH per session: `$env:PATH += ';C:\Program Files\GitHub CLI'`.
- **Git identity not in any config.** Every commit must set identity via env vars to avoid touching global config:
  ```powershell
  $env:GIT_AUTHOR_NAME='jules-orthoboost'
  $env:GIT_AUTHOR_EMAIL='jules-orthoboost@users.noreply.github.com'
  $env:GIT_COMMITTER_NAME='jules-orthoboost'
  $env:GIT_COMMITTER_EMAIL='jules-orthoboost@users.noreply.github.com'
  ```
- After push, GitHub Pages auto-rebuilds in ~30s–1min. Cache: hard-refresh with Ctrl+Shift+R.
- PowerShell wraps git's stderr as red errors — the "exit code" noise around `git push` is cosmetic. Look for `* [new branch]` or `xxxxx..yyyyy main -> main` to confirm success.

---

## Known placeholders / things to replace later

- **Before/After slider images** — both use `placehold.co` URLs with `BEFORE / AFTER — Replace with client photo` labels. Swap the two `src=""` on `.ba-before` and `.ba-after` `<img>` tags.
- **Location phone numbers** — Eastpointe `(586) 555-0123` and Southfield `(248) 555-0987` look like placeholders. The hero/nav/footer use `(248) 313-4899` which appears to be the real number.
- **All hero/treatments/doctor/testimonial photos** — `lh3.googleusercontent.com/aida-public/...` Google-hosted Figma exports; may expire. Should be re-hosted before client launch.
- **All `href="#schedule"` `#virtual` `#why-us` etc anchors** — point to in-page IDs only. Will need real booking flow / form URLs from Elementor build.

---

## Recent direction & boss feedback

- Boss originally said "the layout doesn't feel like a homepage" but couldn't articulate why. Resolved via a layout pass:
  - Full-bleed Pricing CTA (flattened the inner navy box)
  - Asymmetric Testimonials (heading-left, cards-right)
  - New Before/After Gallery section as a second focal point
  - Hero image column shrunk (1fr → 0.71fr relative to text)
  - What to Expect bg changed to `paper-50` for variety
- **Do NOT** add SEO body copy or new content sections without explicit ask — content is being mapped separately.
- All images should remain clearly-labeled placeholders that are easy to swap.

---

## Don'ts / gotchas

- Don't move the hero out of `<section id="hero">` — JS specifically excludes `#hero` from the section fade observer because hero has its own load stagger.
- Don't add `text-pt-0` back to FAQ answer divs (we removed it on purpose for breathing room).
- Don't replace the brand logomark SVG in the slider knob with a Material icon — boss/brand connection is intentional.
- Don't bump Tailwind to a build setup unless explicitly asked — current CDN approach is fine for this handoff deliverable; production build is Elementor's job.
- Don't `git config --global` anything — we deliberately keep this repo's commits using env-var identity so the user's machine-wide git config stays untouched.
