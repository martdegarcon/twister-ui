
const { haptic } = window.Haptics;
const MENUS = {"File": [["New file", "⌘N"], ["Open…", "⌘O"], ["Save", "⌘S"], ["Save as…", "⇧⌘S"], ["Export", "⌥⌘E"], ["Close window", "⇧⌘W"]], "Edit": [["Undo", "⌘Z"], ["Redo", "⇧⌘Z"], ["Cut", "⌘X"], ["Copy", "⌘C"], ["Paste and match style", "⌥⇧⌘V"], ["Find", "⌘F"]], "View": [["Zoom in", "⌘+"], ["Zoom out", "⌘−"], ["Show grid", "⌥G"], ["Show rulers", "⇧R"], ["Outline mode", "⌘Y"], ["Full screen", "⌃⌘F"]]};
const mb = document.getElementById('mb'), dd = document.getElementById('dd'), ddIn = document.getElementById('ddIn');
const hl = document.createElement('span'); hl.className = 'hl'; mb.appendChild(hl);
const SYM = { cmd:'⌘', shift:'⇧', alt:'⌥', ctrl:'⌃' };
const held = new Set();
let current = null;

const btns = Object.keys(MENUS).map(name => {
  const b = document.createElement('button'); b.textContent = name; b.setAttribute('role', 'menuitem');
  b.addEventListener('click', () => current === name ? close() : open(name));
  b.addEventListener('mouseenter', () => { if (current && current !== name) open(name); });
  mb.appendChild(b); return b;
});

function render(name){
  ddIn.innerHTML = MENUS[name].map(([t, k]) => `<div class="mi" data-k="${k}"><span>${t}</span><kbd>${k}</kbd></div>`).join('');
  applyMods();
}
function open(name){
  const b = btns[Object.keys(MENUS).indexOf(name)];
  const first = !current;
  current = name;
  btns.forEach(x => x.classList.toggle('on', x === b));
  hl.style.width = b.offsetWidth + 'px'; hl.style.transform = `translateX(${b.offsetLeft}px)`;
  mb.classList.add('open');
  // crossfade content while the box glides to the new menu and resizes
  const h0 = dd.offsetHeight;
  render(name);
  dd.style.left = (b.offsetLeft + 6) + 'px';
  if (!first){
    const h1 = ddIn.offsetHeight; dd.style.height = h0 + 'px'; void dd.offsetHeight; dd.style.height = h1 + 'px';
    ddIn.animate([{ opacity:0, filter:'blur(3px)' }, { opacity:1, filter:'blur(0)' }], { duration:260, easing:'cubic-bezier(.25,1,.5,1)' });
  } else dd.style.height = ddIn.offsetHeight + 'px';
  dd.classList.add('on');
  haptic([6]);
}
function close(){ current = null; dd.classList.remove('on'); mb.classList.remove('open'); btns.forEach(x => x.classList.remove('on')); }

function applyMods(){
  dd.classList.toggle('mod', held.size > 0);
  ddIn.querySelectorAll('.mi').forEach(mi => {
    const k = mi.dataset.k;
    mi.classList.toggle('match', held.size > 0 && [...held].every(m => k.includes(SYM[m])));
  });
  document.querySelectorAll('.mods button').forEach(b => b.classList.toggle('on', held.has(b.dataset.m)));
}
const keyMod = e => ({ Meta:'cmd', Shift:'shift', Alt:'alt', Control:'ctrl' })[e.key];
addEventListener('keydown', e => { const m = keyMod(e); if (m){ if (!current) open('File'); held.add(m); applyMods(); } if (e.key === 'Escape') close(); });
addEventListener('keyup', e => { const m = keyMod(e); if (m){ held.delete(m); applyMods(); } });
addEventListener('blur', () => { held.clear(); applyMods(); });
document.querySelectorAll('.mods button').forEach(b => b.addEventListener('click', () => {
  const m = b.dataset.m; held.has(m) ? held.delete(m) : held.add(m);
  if (!current) open('File');
  haptic([8]); applyMods();
}));
document.addEventListener('click', e => { if (!e.target.closest('.app') && !e.target.closest('.mods')) close(); });
open('File');
