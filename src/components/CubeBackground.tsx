import { useEffect, useRef } from 'react';
import './CubeBackground.css';

/* ─── 3-D math helpers ──────────────────────────────────────────────── */
type V3 = [number, number, number];

function rotX(p: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
}
function rotY(p: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
}
function rotZ(p: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]];
}
function project(p: V3, cx: number, cy: number, fov: number): [number, number] {
  const z = p[2] + fov;
  return [cx + (p[0] * fov) / z, cy + (p[1] * fov) / z];
}

// 8 unit-cube vertices (half-size 1)
const VERTS: V3[] = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
];
// 12 edges
const EDGES = [
  [0,1],[1,2],[2,3],[3,0],
  [4,5],[5,6],[6,7],[7,4],
  [0,4],[1,5],[2,6],[3,7],
];
// 6 faces (for solid fill — ordered for back-to-front painter's algo)
const FACES = [
  [4,5,6,7], [0,3,7,4], [1,2,6,5],
  [0,1,5,4], [3,2,6,7], [0,1,2,3],
];

/* ─── Cube state ──────────────────────────────────────────────── */
interface Cube {
  x: number; y: number;
  vy: number;
  rx: number; ry: number; rz: number;   // current rotation
  drx: number; dry: number; drz: number; // angular velocity
  size: number;
  settled: boolean;
  settleY: number;
  wire: boolean;   // wireframe vs solid
  invert: boolean; // accent color vs inverse (bg) color
  alpha: number;
}

function spawnCube(w: number, h: number): Cube {
  const wire = Math.random() > 0.45;
  const invert = Math.random() > 0.5;
  return {
    x: Math.random() * w,
    y: -80 - Math.random() * 400,
    vy: 0.6 + Math.random() * 1.4,
    rx: Math.random() * Math.PI * 2,
    ry: Math.random() * Math.PI * 2,
    rz: Math.random() * Math.PI * 2,
    drx: (Math.random() - 0.5) * 0.025,
    dry: (Math.random() - 0.5) * 0.020,
    drz: (Math.random() - 0.5) * 0.015,
    size: 18 + Math.random() * 46,
    settled: false,
    settleY: h * (0.1 + Math.random() * 0.85),
    wire,
    invert,
    alpha: wire ? 0.18 + Math.random() * 0.35 : 0.06 + Math.random() * 0.14,
  };
}

/* ─── Component ──────────────────────────────────────────────── */
export default function CubeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const CUBE_COUNT = 28;
    let cubes: Cube[] = [];
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w;
      canvas.height = h;
      cubes = Array.from({ length: CUBE_COUNT }, () => spawnCube(w, h));
      // Stagger initial positions so they don't all start at top
      cubes.forEach((c, i) => {
        if (i < CUBE_COUNT * 0.6) {
          c.y = Math.random() * h;
          c.settled = c.y >= c.settleY;
        }
      });
    };
    resize();
    window.addEventListener('resize', resize);

    const getColors = () => {
      const style = getComputedStyle(document.documentElement);
      return {
        accent: style.getPropertyValue('--accent').trim() || '#d4ff00',
        bg:     style.getPropertyValue('--bg').trim()     || '#080808',
        text:   style.getPropertyValue('--text').trim()   || '#f0ede8',
      };
    };

    const drawCube = (c: Cube, colors: ReturnType<typeof getColors>) => {
      const fov  = 320;
      const cx   = c.x;
      const cy   = c.y;
      const s    = c.size;

      // Project all 8 verts
      const pts = VERTS.map(v => {
        let p: V3 = [v[0] * s, v[1] * s, v[2] * s];
        p = rotX(p, c.rx);
        p = rotY(p, c.ry);
        p = rotZ(p, c.rz);
        return project(p, cx, cy, fov);
      });

      const color = c.invert ? colors.bg   : colors.accent;
      const alt   = c.invert ? colors.accent : colors.bg;

      if (c.wire) {
        // Wireframe
        ctx.save();
        ctx.globalAlpha = c.alpha;
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.8;
        for (const [a, b] of EDGES) {
          ctx.beginPath();
          ctx.moveTo(pts[a][0], pts[a][1]);
          ctx.lineTo(pts[b][0], pts[b][1]);
          ctx.stroke();
        }
        ctx.restore();
      } else {
        // Solid faces — compute normal Z to cull back faces
        ctx.save();
        ctx.globalAlpha = c.alpha;
        for (const face of FACES) {
          const [a, b, cc, d] = face;
          // Simple winding-order visibility: cross product Z of projected verts
          const ax = pts[b][0] - pts[a][0], ay = pts[b][1] - pts[a][1];
          const bx = pts[cc][0]- pts[a][0], by = pts[cc][1]- pts[a][1];
          if (ax * by - ay * bx < 0) continue; // back-face cull
          ctx.beginPath();
          ctx.moveTo(pts[a][0], pts[a][1]);
          ctx.lineTo(pts[b][0], pts[b][1]);
          ctx.lineTo(pts[cc][0], pts[cc][1]);
          ctx.lineTo(pts[d][0], pts[d][1]);
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.fill();
          ctx.strokeStyle = alt;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = c.alpha * 0.5;
          ctx.stroke();
          ctx.globalAlpha = c.alpha;
        }
        ctx.restore();
      }
    };

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const colors = getColors();

      for (const c of cubes) {
        if (!c.settled) {
          c.vy += 0.04; // gravity
          c.y  += c.vy;
          c.rx += c.drx;
          c.ry += c.dry;
          c.rz += c.drz;
          if (c.y >= c.settleY) {
            c.y       = c.settleY;
            c.settled = true;
            c.vy      = 0;
            // slow down spin on settle
            c.drx *= 0.05;
            c.dry *= 0.05;
            c.drz *= 0.05;
          }
        } else {
          // gentle idle rotation when settled
          c.rx += c.drx;
          c.ry += c.dry;
          c.rz += c.drz;
        }
        drawCube(c, colors);
      }

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="cube-bg" />;
}
