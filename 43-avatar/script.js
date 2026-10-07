
const { haptic } = window.Haptics;
const POOL = [['AK', 'Anna'], ['ES', 'Egor'], ['DM', 'Dmitry'], ['MM', 'Marat'], ['KP', 'Kate'], ['IV', 'Ivan']];
const stack = document.getElementById('stack');
const SHOW = 4;
let people = POOL.slice(0, 5), fan = false;
const more = document.createElement('div'); more.className = 'more';
more.innerHTML = '+<span class="drum">' + Array.from({ length:10 }, (_, i) => `<b>${i}</b>`).join('') + '</span>';
stack.appendChild(more);
const els = new Map();
function el(p){
  if (els.has(p[0])) return els.get(p[0]);
  const d = document.createElement('div'); d.className = 'av new'; d.style.setProperty('--h', (p[0].charCodeAt(0) * 37) % 360);
  d.innerHTML = `${p[0]}<span class="nm">${p[1]}</span>`; stack.insertBefore(d, more); els.set(p[0], d);
  return d;
}
function layout(){
  const vis = fan ? people : people.slice(0, SHOW), extra = people.length - vis.length;
  const step = fan ? 64 : 34;                       // overlap when stacked, spread when fanned
  const n = vis.length + (extra > 0 ? 1 : 0);
  stack.style.setProperty('--sw', (56 + (n - 1) * step) + 'px');
  els.forEach((d, k) => { if (!people.find(p => p[0] === k)){ d.style.opacity = 0; setTimeout(() => { d.remove(); els.delete(k); }, 400); } });
  vis.forEach((p, i) => {
    const d = el(p), mid = (vis.length - 1) / 2;
    const rot = fan ? (i - mid) * 6 : 0, lift = fan ? Math.abs(i - mid) * 5 : 0;
    d.style.zIndex = fan ? i : vis.length - i;
    requestAnimationFrame(() => { d.classList.remove('new'); d.style.opacity = 1; d.style.transform = `translateX(${i * step}px) translateY(${lift}px) rotate(${rot}deg)`; });
  });
  people.slice(vis.length).forEach(p => { const d = el(p); d.style.opacity = 0; d.style.transform = `translateX(${(vis.length - 1) * step}px)`; });
  more.style.opacity = extra > 0 ? 1 : 0;
  more.style.transform = `translateX(${vis.length * step}px)`;
  more.querySelectorAll('b').forEach(b => b.style.setProperty('--n', Math.max(extra, 0) % 10));
  stack.classList.toggle('fan', fan);
}
stack.addEventListener('mouseenter', () => { fan = true; layout(); haptic([6]); });
stack.addEventListener('mouseleave', () => { fan = false; layout(); });
stack.addEventListener('click', () => { fan = !fan; layout(); });
document.getElementById('add').addEventListener('click', () => {
  const next = POOL.find(p => !people.includes(p)) || [String.fromCharCode(65 + people.length) + 'X', 'Guest ' + people.length];
  people = [...people, next]; haptic([12]); layout();
});
document.getElementById('rm').addEventListener('click', () => { if (people.length > 1){ people = people.slice(0, -1); haptic([8]); layout(); } });
layout();
