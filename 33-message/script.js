
const { haptic } = window.Haptics;
const A = {
  'What makes motion feel premium?':'Restraint. Use one easing curve everywhere, keep durations short, and let things decelerate into place instead of bouncing. Premium motion explains what changed and then gets out of the way.',
  'How long should a fade be?':'About a third of a second. Position changes can take half a second because the eye follows them; opacity and blur should resolve faster so the interface never feels foggy.',
};
const thread = document.getElementById('thread'), asks = document.getElementById('asks');
const wait = ms => new Promise(r => setTimeout(r, ms));
asks.querySelectorAll('button').forEach(b => b.addEventListener('click', () => ask(b.textContent)));
async function ask(q){
  asks.classList.add('busy'); haptic([10]);
  const me = document.createElement('div'); me.className = 'm me'; me.textContent = q; thread.appendChild(me);
  me.animate([{ opacity:0, transform:'translateY(10px)' }, { opacity:1, transform:'none' }], { duration:350, easing:'cubic-bezier(.25,1,.5,1)' });
  await wait(450);
  const ai = document.createElement('div'); ai.className = 'm ai'; thread.appendChild(ai);
  const cur = document.createElement('span'); cur.className = 'cur'; ai.appendChild(cur);
  thread.scrollTop = thread.scrollHeight;
  await wait(500);
  // stream words with an uneven rhythm; each word dries ~600ms after it lands
  for (const word of A[q].split(' ')){
    const w = document.createElement('span'); w.className = 'w'; w.textContent = word + ' ';
    ai.insertBefore(w, cur);
    requestAnimationFrame(() => w.classList.add('in'));
    setTimeout(() => w.classList.add('dry'), 600);
    thread.scrollTop = thread.scrollHeight;
    await wait(40 + Math.random() * 90 + (/[.,]$/.test(word) ? 180 : 0));
  }
  await wait(500); cur.remove(); asks.classList.remove('busy');
}
