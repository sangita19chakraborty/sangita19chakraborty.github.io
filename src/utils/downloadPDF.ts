export async function downloadPortfolioPDF() {
  // Each section is captured individually so page height matches content exactly.
  // This avoids blank pages caused by min-height: 100vh and ensures canvas
  // cube animations (which run via rAF, not CSS) are removed before capture.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [h2cMod, jsPDFMod]: [any, any] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html2canvas: (el: HTMLElement, opts: Record<string, any>) => Promise<HTMLCanvasElement> = h2cMod.default ?? h2cMod;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsPDF: new (opts: Record<string, any>) => any = jsPDFMod.jsPDF ?? jsPDFMod.default;

  // ── 1. CSS overrides: reveal animations, hide decorations, auto section heights ──
  const style = document.createElement('style');
  style.id = 'pdf-override';
  style.textContent = `
    [data-reveal] { opacity: 1 !important; transform: none !important; filter: blur(0) !important; transition: none !important; }
    .reveal-line__inner, .hero__line-inner { transform: translateY(0) !important; transition: none !important; }
    *, *::before, *::after { transition: none !important; animation: none !important; }
    .nav, .cursor-dot, .cursor-ring { display: none !important; }
    html { scroll-snap-type: none !important; }
    section { scroll-snap-align: none !important; scroll-snap-stop: unset !important; min-height: auto !important; }
  `;
  document.head.appendChild(style);

  // ── 2. Physically remove canvas elements so rAF pixel buffers are not captured ──
  type CanvasEntry = { c: HTMLCanvasElement; parent: Element; before: ChildNode | null };
  const removedCanvases: CanvasEntry[] = [];
  document.querySelectorAll<HTMLCanvasElement>('canvas').forEach(c => {
    removedCanvases.push({ c, parent: c.parentElement!, before: c.nextSibling as ChildNode | null });
    c.remove();
  });

  // ── 3. Force hero inline-animated elements visible (set via JS timeouts) ──
  type Saved = { el: HTMLElement; opacity: string; transform: string; transition: string };
  const saved: Saved[] = [];
  document.querySelectorAll<HTMLElement>('[data-hero-reveal], .hero__line-inner').forEach(el => {
    saved.push({ el, opacity: el.style.opacity, transform: el.style.transform, transition: el.style.transition });
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.transition = 'none';
  });

  const prevScroll = window.scrollY;
  window.scrollTo(0, 0);
  // Wait for layout reflow after min-height change and canvas removal
  await new Promise<void>(r => setTimeout(r, 200));

  const restore = () => {
    saved.forEach(s => {
      s.el.style.opacity = s.opacity;
      s.el.style.transform = s.transform;
      s.el.style.transition = s.transition;
    });
    removedCanvases.forEach(({ c, parent, before }) => {
      if (before) { parent.insertBefore(c, before); } else { parent.appendChild(c); }
    });
    document.getElementById('pdf-override')?.remove();
    window.scrollTo(0, prevScroll);
  };

  try {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section'));
    const vw = window.innerWidth;
    const PX_MM = 0.264583;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let pdf: any = null;

    for (const sec of sections) {
      const h = sec.scrollHeight;
      const wMm = +(vw * PX_MM).toFixed(2);
      const hMm = +(h * PX_MM).toFixed(2);
      const orient: 'l' | 'p' = wMm >= hMm ? 'l' : 'p';

      const cvs = await html2canvas(sec, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        width: vw,
        height: h,
        windowWidth: vw,
        windowHeight: h,
        backgroundColor: '#080808',
        logging: false,
      });

      if (!pdf) {
        pdf = new jsPDF({ unit: 'mm', format: [wMm, hMm], orientation: orient, compress: true });
      } else {
        pdf.addPage([wMm, hMm], orient);
      }
      pdf.addImage(cvs.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, wMm, hMm);
    }

    pdf?.save('portfolio.pdf');
  } finally {
    restore();
  }
}
