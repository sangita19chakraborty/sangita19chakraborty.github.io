import { useEffect, useRef } from 'react';
import { usePageTransition } from '../context/TransitionContext';

// Maps section id → human-readable label shown during the transition
const SECTION_LABELS: Record<string, string> = {
  home:             'Home',
  work:             'Work',
  about:            'About',
  experience:       'Experience',
  skills:           'Skills',
  extracurricular:  'Activities',
  volunteering:     'Volunteering',
  collabs:          'Brand Partners',
  languages:        'Languages',
  instagram:        'Instagram',
  contact:          'Contact',
};

export function useScrollTransition() {
  const { navigate, phase } = usePageTransition();

  // Keep a ref so the wheel / touch handlers always see the latest phase
  // without needing to re-register addEventListener on every render.
  const phaseRef = useRef(phase);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const lastNavMs = useRef(0);
  const touchStartY = useRef(0);
  // How many consecutive wheel events at the boundary are needed before
  // triggering the page transition. Higher = less sensitive.
  const BOUNDARY_TICKS_REQUIRED = 100;
  const boundaryTicks = useRef(0);
  const boundaryDir   = useRef<1 | -1 | 0>(0);

  useEffect(() => {
    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>('section[id]'));

    const getCurrentIndex = (sections: HTMLElement[]) => {
      let best = 0;
      let bestDist = Infinity;
      sections.forEach((sec, i) => {
        const dist = Math.abs(sec.getBoundingClientRect().top);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    };

    const doNavigate = (direction: 1 | -1) => {
      if (phaseRef.current !== 'idle') return;
      const now = Date.now();
      // Debounce = total transition duration so rapid wheels don't queue up
      if (now - lastNavMs.current < 2300) return;

      const sections = getSections();
      const cur = getCurrentIndex(sections);
      const next = Math.max(0, Math.min(sections.length - 1, cur + direction));
      if (next === cur) return;

      lastNavMs.current = now;
      const sec = sections[next];
      navigate(`#${sec.id}`, SECTION_LABELS[sec.id] ?? sec.id);
    };

    // ── Wheel (desktop) ──────────────────────────────────────────────────────
    const handleWheel = (e: WheelEvent) => {
      // Walk up the DOM from the event target. If we find a scrollable ancestor
      // that still has scroll room in the wheel direction, let the browser
      // handle it natively (don't trigger the page transition).
      let el = e.target as HTMLElement | null;
      while (el && el !== document.documentElement) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        const canScroll = overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';
        if (canScroll && el.scrollHeight > el.clientHeight) {
          const scrollingDown = e.deltaY > 0;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
          const atTop    = el.scrollTop <= 0;
          // Still has room — let browser handle, reset boundary counter
          if ((scrollingDown && !atBottom) || (!scrollingDown && !atTop)) {
            boundaryTicks.current = 0;
            boundaryDir.current   = 0;
            return;
          }
        }
        el = el.parentElement;
      }

      // At boundary (or no inner scroll) — require N ticks in same direction
      e.preventDefault();
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      if (dir !== boundaryDir.current) {
        // User reversed direction — reset counter
        boundaryDir.current   = dir;
        boundaryTicks.current = 1;
        return;
      }
      boundaryTicks.current += 1;
      if (boundaryTicks.current < BOUNDARY_TICKS_REQUIRED) return;

      // Enough ticks accumulated — fire transition and reset
      boundaryTicks.current = 0;
      boundaryDir.current   = 0;
      doNavigate(dir);
    };

    // ── Touch (mobile) ───────────────────────────────────────────────────────
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 48) return; // min swipe threshold
      doNavigate(delta > 0 ? 1 : -1);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate]);
}
