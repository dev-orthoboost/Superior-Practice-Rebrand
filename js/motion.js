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
