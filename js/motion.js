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
// 4. Infinite marquees — clone the set once (aria-hidden) so the CSS loop is seamless.
// Without JS the single set just sits still, so nothing jumps.
document.querySelectorAll('[data-marquee]').forEach(m => {
  const track = m.querySelector('.mq-track'), set = m.querySelector('.mq-set');
  if (!track || !set) return;
  const clone = set.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  track.appendChild(clone);
  track.classList.add('is-cloned');
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
  let current = 188;
  chips.forEach(chip => chip.addEventListener('click', () => {
    const v = views[chip.dataset.per];
    if (!v) return;
    chips.forEach(c => { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-pressed', c === chip); });
    unitEl.textContent = v.unit; noteEl.textContent = v.note;
    if (reduced) { valEl.textContent = '$' + v.n.toFixed(v.dec); current = v.n; return; }
    const o = { n: current };
    anime({ targets: o, n: v.n, duration: 550, easing: 'easeOutCubic',
      update: () => valEl.textContent = '$' + o.n.toFixed(v.dec) });
    current = v.n;
  }));
}
// 6. Polaroid wall — settle in one by one with their resting tilt
const wall = document.querySelector('[data-polaroid-wall]');
if (wall && !reduced) {
  const cards = wall.querySelectorAll('.polaroid');
  cards.forEach(c => c.style.opacity = 0);
  const wallIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return; wallIO.unobserve(e.target);
    // Opacity-only stagger: the resting tilt lives in CSS transforms, which anime must not touch.
    anime({ targets: e.target.querySelectorAll('.polaroid'), opacity: [0, 1],
      delay: anime.stagger(130), duration: 750, easing: 'easeOutCubic' });
  }), { threshold: 0.15 });
  wallIO.observe(wall);
}
