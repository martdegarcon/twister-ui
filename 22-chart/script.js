
const { haptic } = window.Haptics;
const DAYS = ['Mo','Tu','We','Th','Fr','Sa','Su'];
const DATA = { this:[3.5,5.2,2.1,6.4,4.8,1.2,0.6], last:[2.4,3.1,4.6,3.9,5.8,2.2,1.4] };
const chart = document.getElementById('chart'), seg = document.getElementById('seg'), total = document.getElementById('total');
const cols = DAYS.map(d => {
  const c = document.createElement('div'); c.className = 'col';
  c.innerHTML = `<span class="v"></span><span class="bar"></span><span class="lbl">${d}</span>`;
  c.addEventListener('mouseenter', () => { chart.classList.add('hov'); cols.forEach(x => x.classList.toggle('hot', x === c)); });
  chart.appendChild(c); return c;
});
chart.addEventListener('mouseleave', () => chart.classList.remove('hov'));
const MAX = 7;
function show(k){
  const vals = DATA[k], hi = Math.max(...vals);
  cols.forEach((c, i) => {
    const v = vals[i];
    c.style.transitionDelay = i * 30 + 'ms';
    c.querySelector('.bar').style.setProperty('--h', (v / MAX * 78) + '%');
    c.querySelector('.bar').style.transitionDelay = i * 35 + 'ms';
    // weight tracks the value: the biggest day is Black, the smallest is Thin
    c.querySelector('.v').style.setProperty('--w', Math.round(150 + (v / hi) * 750));
    c.querySelector('.v').textContent = v.toFixed(1);
  });
  const sum = vals.reduce((a, b) => a + b, 0);
  total.textContent = `${sum.toFixed(1)} hours focused`;
  seg.classList.toggle('last', k === 'last');
  seg.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.k === k));
}
seg.querySelectorAll('button').forEach(b => b.addEventListener('click', () => { haptic([8]); show(b.dataset.k); }));
requestAnimationFrame(() => show('this'));
