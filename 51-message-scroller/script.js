
const { haptic } = window.Haptics;
const scr = document.getElementById('scr'), jump = document.getElementById('jump'), drum = document.getElementById('drum');
drum.innerHTML = Array.from({ length:10 }, (_, i) => `<b>${i}</b>`).join('');
const OLD = ['Morning!','Morning ☀️','Did you see the new tokens?','Yes, the curve is much calmer','Same for the fades','Can we ship today?','After the review','16:00 works','Bring the prototype','Will do','Also the README','On it','Thanks!','👍'];
const NEW = ['Review moved to 16:30','Room B instead of A','Coffee is on me'];
let unread = [], k = 0;
OLD.forEach((t, i) => add(t, i % 3 === 1));
scr.style.scrollBehavior = 'auto'; scr.scrollTop = scr.scrollHeight; scr.style.scrollBehavior = '';
function add(t, me){ const d = document.createElement('div'); d.className = 'm' + (me ? ' me' : ''); d.textContent = t; scr.appendChild(d); return d; }
const atBottom = () => scr.scrollHeight - scr.scrollTop - scr.clientHeight < 40;
function setCount(n){ drum.querySelectorAll('b').forEach(b => b.style.setProperty('--n', Math.min(n, 9))); jump.classList.toggle('on', n > 0); }
document.getElementById('recv').addEventListener('click', async () => {
  if (atBottom()){ scr.scrollTop = 0; await new Promise(r => setTimeout(r, 500)); }   // demo: read history first
  for (let i = 0; i < 3; i++){
    await new Promise(r => setTimeout(r, 450));
    const d = add(NEW[k++ % NEW.length], false); unread.push(d);
    setCount(unread.length); haptic([8]);
  }
});
jump.addEventListener('click', () => {
  scr.scrollTop = scr.scrollHeight; haptic([12]);
  // when you land, the new ones glow for a moment
  setTimeout(() => { unread.forEach((d, i) => setTimeout(() => { d.classList.add('fresh'); setTimeout(() => d.classList.remove('fresh'), 1200); }, i * 120)); unread = []; setCount(0); }, 450);
});
scr.addEventListener('scroll', () => { if (atBottom() && unread.length){ unread.forEach(d => { d.classList.add('fresh'); setTimeout(() => d.classList.remove('fresh'), 1200); }); unread = []; setCount(0); } });
