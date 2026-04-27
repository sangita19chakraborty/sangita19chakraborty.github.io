import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../constants/theme';
import './Loader.css';

/* ── Particle type ── */
interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  layer: number; // 0 = orbit, 1 = float
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

function initParticles(w: number, h: number): Particle[] {
  const cx = w / 2, cy = h / 2;
  const baseR = Math.min(w, h) * 0.46;
  const list: Particle[] = [];

  // Multiple orbital rings at different tilt angles (yRatio controls ellipse squash)
  const rings = [
    { count: 20, radiusOffset: -60, speed: 0.0032, yRatio: 0.52, dir:  1 }, // near inner
    { count: 28, radiusOffset:  -8, speed: 0.0025, yRatio: 0.20, dir: -1 }, // near-horizontal
    { count: 24, radiusOffset:   0, speed: 0.0028, yRatio: 0.90, dir:  1 }, // near-vertical/circular
    { count: 32, radiusOffset:  40, speed: 0.0020, yRatio: 0.38, dir: -1 }, // mid tilt
    { count: 18, radiusOffset:  90, speed: 0.0015, yRatio: 0.65, dir:  1 }, // outer ring
    { count: 14, radiusOffset: -44, speed: 0.0040, yRatio: 0.12, dir:  1 }, // flat horizontal
    { count: 22, radiusOffset:  60, speed: 0.0022, yRatio: 0.75, dir: -1 }, // medium tilt
  ];

  for (const ring of rings) {
    const ringR = baseR + ring.radiusOffset;
    for (let i = 0; i < ring.count; i++) {
      list.push({
        angle: (i / ring.count) * Math.PI * 2 + Math.random() * 0.3,
        radius: ringR + (Math.random() - 0.5) * 20,
        speed: (ring.speed + Math.random() * 0.002) * ring.dir,
        size: 0.8 + Math.random() * 2.2,
        opacity: 0.2 + Math.random() * 0.65,
        layer: 0,
        x: cx, y: cy, vx: 0, vy: 0,
        life: 0,
        maxLife: ring.yRatio, // repurposed: stores ellipse yRatio for orbital particles
      });
    }
  }

  // Ambient floating particles
  for (let i = 0; i < 60; i++) {
    const life = Math.random() * 200;
    list.push({
      angle: 0, radius: 0, speed: 0, size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.5,
      layer: 1,
      x: Math.random() * w, y: h + Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(0.4 + Math.random() * 0.8),
      life, maxLife: 160 + Math.random() * 120,
    });
  }

  return list;
}

export default function Loader({ onDone }: { onDone: () => void }) {
  const { theme } = useTheme();
  const accentRef = useRef(themes[theme].accent);
  const [pct, setPct] = useState(0);
  // intro = doors closing; count = orb counting; hold = doors closed+scan; out = doors opening
  const [phase, setPhase] = useState<'intro' | 'count' | 'hold' | 'out'>('intro');
  const raf = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const orbPulse = useRef(0);
  const canvasRaf = useRef<number>(0);
  const pctRef = useRef(0);

  // Keep accent ref in sync with theme
  useEffect(() => {
    accentRef.current = themes[theme].accent;
  }, [theme]);

  /* ── Canvas orb + particles ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const accent = accentRef.current;
      const w = canvas.width, h = canvas.height;
      const cx = w / 2, cy = h / 2;
      orbPulse.current += 0.018;
      const pulse = Math.sin(orbPulse.current) * 0.03;

      ctx.clearRect(0, 0, w, h);

      // === HOLLOW ORB — skeletal track + progress arc ===
      const orbR = (Math.min(w, h) * 0.46) * (1 + pulse);
      const startAngle = -Math.PI / 2; // top
      const progress = pctRef.current / 100;
      const endAngle = startAngle + progress * Math.PI * 2;

      // Track ring (dim full circle)
      ctx.beginPath();
      ctx.arc(cx, cy, orbR, 0, Math.PI * 2);
      ctx.strokeStyle = accent + '22';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Progress arc (bright, grows thicker as loading progresses)
      if (progress > 0) {
        const arcWidth = 1.5 + progress * 10; // 1.5px → 11.5px as pct goes 0→100
        ctx.beginPath();
        ctx.arc(cx, cy, orbR, startAngle, endAngle);
        ctx.strokeStyle = accent + 'ee';
        ctx.lineWidth = arcWidth;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glowing dot at the tip of the progress arc
        const tipX = cx + Math.cos(endAngle) * orbR;
        const tipY = cy + Math.sin(endAngle) * orbR;
        const glowSize = 8 + progress * 10;
        const dotGlow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, glowSize);
        dotGlow.addColorStop(0, accent + 'ff');
        dotGlow.addColorStop(0.4, accent + '88');
        dotGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(tipX, tipY, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = dotGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(tipX, tipY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.fill();
      }

      // === PARTICLES ===
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (p.layer === 0) {
          // Orbital — p.maxLife holds the yRatio (ellipse tilt) for this ring
          p.angle += p.speed;
          const yRatio = p.maxLife; // repurposed field
          const px = cx + Math.cos(p.angle) * p.radius;
          const py = cy + Math.sin(p.angle) * (p.radius * yRatio);
          const dist = Math.hypot(px - cx, py - cy);
          const fade = Math.max(0, 1 - dist / (Math.min(w, h) * 0.72));
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = accent + Math.round(p.opacity * fade * 255).toString(16).padStart(2, '0');
          ctx.fill();
        } else {
          // Float
          p.x += p.vx;
          p.y += p.vy;
          p.life++;
          if (p.life > p.maxLife) {
            p.x = Math.random() * w;
            p.y = h + 10;
            p.life = 0;
            p.maxLife = 160 + Math.random() * 120;
          }
          const t = p.life / p.maxLife;
          const a = p.opacity * (t < 0.15 ? t / 0.15 : t > 0.8 ? (1 - t) / 0.2 : 1);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = accent + Math.round(a * 200).toString(16).padStart(2, '0');
          ctx.fill();
        }
      }

      canvasRaf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(canvasRaf.current);
    };
  }, []);

  /* ── Progress counter ── */
  useEffect(() => {
    if (phase !== 'count') return; // wait for intro doors to finish

    const start = performance.now();
    const duration = 2400;

    const tick = (now: number) => {
      const p = Math.min(((now - start) / duration) * 100, 100);
      pctRef.current = p;
      setPct(Math.round(p));
      if (p < 100) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setPhase('hold');
        setTimeout(() => {
          setPhase('out');
          setTimeout(onDone, 1000);
        }, 700);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [phase, onDone]);

  /* ── Intro: doors close then reveal orb ── */
  useEffect(() => {
    // Wait for doors to slam shut (matches 0.85s CSS transition) then start counting
    const t = setTimeout(() => setPhase('count'), 950);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`loader loader--${phase}`}>
      {/* Orb + particle canvas — full background */}
      <canvas ref={canvasRef} className="loader__canvas" />

      {/* Elevator doors — close on intro, open on exit */}
      <div className="loader__curtain loader__curtain--top" />
      <div className="loader__curtain loader__curtain--bottom" />

      {/* Scan line + label shown while doors are closed (hold phase) */}
      <div className="loader__curtain-center">
        <span className="loader__scan" />
        <p className="loader__hold-label">Portfolio</p>
      </div>

      {/* Content layer */}
      <div className="loader__content">
        <div className="loader__strip loader__strip--top">
          <span className="loader__mono">&#123;&nbsp;LOADING&nbsp;&#125;</span>
          <span className="loader__mono">Portfolio</span>
        </div>

        <div className="loader__center">
          <span className="loader__center-pct">{String(pct).padStart(3, '0')}<span className="loader__center-sign">%</span></span>
        </div>

        <div className="loader__strip loader__strip--bottom">
          <span className="loader__mono">Sangita Chakraborty</span>
          <span className="loader__mono">Portfolio</span>
        </div>
      </div>

    </div>
  );
}
