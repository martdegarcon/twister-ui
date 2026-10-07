
const { haptic } = window.Haptics;
const TASKS = ['Ask Atlas a question', 'Draft with Atlas', 'Create a stack', 'Invite a teammate', 'Download the desktop app'];
const list = document.getElementById('list'), drum = document.getElementById('drum');
const ROW = 52, SEP = 34;
const items = TASKS.map((t, i) => {
  const d = document.createElement('div'); d.className = 'it';
  d.innerHTML = `<span class="dot"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span class="tx">${t}</span><i class="chev"></i>`;
  d._i = i; d.addEventListener('click', () => { d.classList.toggle('done'); haptic(d.classList.contains('done') ? [12] : [6]); setTimeout(layout, 260); });
  list.appendChild(d); return d;
});
const sep = document.createElement('div'); sep.className = 'sep'; sep.textContent = 'Done'; list.appendChild(sep);
function layout(){
  const todo = items.filter(x => !x.classList.contains('done')), done = items.filter(x => x.classList.contains('done'));
  let y = 0;
  todo.forEach(x => { x.style.transform = `translateY(${y}px)`; y += ROW; });
  sep.style.opacity = done.length ? 1 : 0; sep.style.transform = `translateY(${y}px)`;
  if (done.length) y += SEP;
  done.forEach(x => { x.style.transform = `translateY(${y}px)`; y += ROW; });
  list.style.height = y + 'px';
  drum.querySelectorAll('b').forEach(b => b.style.setProperty('--n', done.length));
  if (done.length === items.length) haptic([15, 50, 30]);
}
items[0].classList.add('done');
layout();
