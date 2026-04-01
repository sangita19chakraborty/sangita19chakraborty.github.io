import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      if (dot.current) {
        dot.current.style.left = dotX + 'px';
        dot.current.style.top  = dotY + 'px';
      }
      if (ring.current) {
        ring.current.style.left = ringX + 'px';
        ring.current.style.top  = ringY + 'px';
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    // Grow ring on hoverable elements
    const grow = () => ring.current?.classList.add('grow');
    const shrink = () => ring.current?.classList.remove('grow');

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
