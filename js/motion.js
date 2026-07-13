// js/motion.js — Superior Orthodontics shared motion (anime.js v3)
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
// anime v3 pauses its RAF engine whenever the tab loses focus (suspendWhenDocumentHidden
// defaults to true). That silently freezes count-ups mid-run, so turn it off.
if (typeof anime !== 'undefined') anime.suspendWhenDocumentHidden = false;
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
// 4. Infinite marquees — clone the set enough times to always cover the viewport,
// then scroll by the measured pixel distance between set 1 and set 2 (a -50%
// keyframe jumps on subpixel widths, and a single clone leaves a blank gap when
// the viewport is wider than one set). Without JS the single set just sits still.
document.querySelectorAll('[data-marquee]').forEach(m => {
  const track = m.querySelector('.mq-track'), set = m.querySelector('.mq-set');
  if (!track || !set || reduced) return;
  const size = () => {
    const setW = set.getBoundingClientRect().width;
    if (!setW) return;
    const need = Math.max(2, Math.ceil(m.clientWidth / setW) + 1);
    for (let i = track.querySelectorAll('.mq-set').length; i < need; i++) {
      const clone = set.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }
    const sets = track.querySelectorAll('.mq-set');
    const period = sets[1].getBoundingClientRect().left - sets[0].getBoundingClientRect().left;
    track.style.setProperty('--mq-shift', -period + 'px');
    track.classList.add('is-cloned');
  };
  size();
  // Re-measure whenever the set or viewport actually changes size — the Tailwind
  // CDN compiles styles after this script runs, so the first measurement can be
  // wrong; a bare resize listener misses that.
  if (window.ResizeObserver) { const ro = new ResizeObserver(size); ro.observe(m); ro.observe(set); }
  else addEventListener('resize', size);
  if (document.fonts) document.fonts.ready.then(size);
});
// 5. Price math toggle — same $188/mo plan, shown per month/week/day
const pm = document.querySelector('[data-price-math]');
if (pm) {
  const views = {
    month: { n: 188, dec: 0, unit: '/month', note: '$1,000 down, 0% interest, no hidden fees.' },
    week:  { n: 43,  dec: 0, unit: '/week',  note: 'About what a family pizza night runs.' },
    day:   { n: 6.18, dec: 2, unit: '/day',  note: 'Less than lunch.' }
  };
  const valEl = pm.querySelector('[data-price-value]'), unitEl = pm.querySelector('[data-price-unit]'),
        noteEl = pm.querySelector('[data-price-note]'), chips = pm.querySelectorAll('.price-chip');
  let current = 188, raf = null;
  // Self-contained rAF count-up — no anime dependency, and the final value is
  // always set (instantly when reduced-motion or the tab is hidden), so the
  // number can never get stuck partway.
  const tween = (from, to, dec) => {
    if (raf) cancelAnimationFrame(raf);
    if (reduced || document.hidden) { valEl.textContent = '$' + to.toFixed(dec); return; }
    const dur = 500, start = performance.now();
    const step = now => {
      const t = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - t, 3);
      valEl.textContent = '$' + (from + (to - from) * e).toFixed(dec);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  chips.forEach(chip => chip.addEventListener('click', () => {
    const v = views[chip.dataset.per];
    if (!v) return;
    chips.forEach(c => { const on = c === chip; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', on); });
    unitEl.textContent = v.unit; noteEl.textContent = v.note;
    tween(current, v.n, v.dec);
    current = v.n;
  }));
}
// 6. Photo carousel — native scroll-snap track with prev/next controls.
// Buttons scroll by one card; native smooth-scroll needs no anime, so this
// works regardless of the animation engine.
document.querySelectorAll('[data-carousel]').forEach(track => {
  const scope = track.closest('[data-carousel-scope]') || track.parentElement;
  const prev = scope.querySelector('[data-carousel-prev]');
  const next = scope.querySelector('[data-carousel-next]');
  const stepBy = () => {
    const slide = track.querySelector('.carousel-slide');
    const gap = parseFloat(getComputedStyle(track).columnGap || '24') || 24;
    return slide ? slide.getBoundingClientRect().width + gap : track.clientWidth;
  };
  const sync = () => {
    const atStart = track.scrollLeft <= 4;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (prev) { prev.disabled = atStart; prev.setAttribute('aria-disabled', atStart); }
    if (next) { next.disabled = atEnd; next.setAttribute('aria-disabled', atEnd); }
  };
  if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -stepBy(), behavior: reduced ? 'auto' : 'smooth' }));
  if (next) next.addEventListener('click', () => track.scrollBy({ left: stepBy(), behavior: reduced ? 'auto' : 'smooth' }));
  track.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
  sync();
});
