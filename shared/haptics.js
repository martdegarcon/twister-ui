/* UI Twists — haptics
   Android (Chrome, Firefox): Vibration API with patterns, works for any event.
   iPhone: Safari has no Vibration API. Since iOS 26.5 the system haptic tick only plays when a
   finger directly taps a real native <input type="checkbox" switch>, so addTapHaptics() lays an
   invisible one over a tappable control. Typing and timers can't vibrate on iPhone.
   Desktop: nothing happens. */
(() => {
  const HAS_VIBRATE = typeof navigator.vibrate === 'function';
  const IOS_TAP_HAPTICS = !HAS_VIBRATE && matchMedia('(pointer: coarse)').matches;

  const haptic = pattern => { try { if (HAS_VIBRATE) navigator.vibrate(pattern); } catch (e) {} };

  function addTapHaptics(container){
    if (!IOS_TAP_HAPTICS) return null;
    const sw = document.createElement('input');
    sw.type = 'checkbox';
    sw.setAttribute('switch', '');
    sw.className = 'haptic-switch';
    sw.tabIndex = -1;
    sw.setAttribute('aria-hidden', 'true');
    container.appendChild(sw);
    return sw;
  }

  window.Haptics = { haptic, addTapHaptics, HAS_VIBRATE, IOS_TAP_HAPTICS };
})();

/* crossfade helper for .swap-stack: show the child with data-k = key */
window.swapTo = (stack, key) => {
  [...stack.children].forEach(c => {
    const was = c.classList.contains('on'), now = c.dataset.k === key;
    c.classList.toggle('on', now);
    c.classList.toggle('out', was && !now);
    if (now) c.classList.remove('out');
  });
};
