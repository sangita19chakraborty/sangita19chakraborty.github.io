import { useState, useEffect } from 'react';
import { VISUAL_DESIGN_SECTION } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './VisualDesign.css';

type Post = { imageFile: string; postUrl: string };

export default function VisualDesign() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { ref: headerRef, revealed: headerRevealed } = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const { ref: gridRef,   revealed: gridRevealed   } = useReveal<HTMLDivElement>({ threshold: 0.05 });

  useEffect(() => {
    fetch('/ig-posts.json')
      .then(r => r.json())
      .then(setPosts)
      .catch(() => {});
  }, []);

  const items = posts.length ? posts : Array<null>(12).fill(null);

  return (
    <section id="visual-design" className="vd">
      <CubeBackground />

      {/* ── Ambient glow backdrop ── */}
      <div className="vd__backdrop" aria-hidden="true">
        <div className="vd__glow vd__glow--1" />
        <div className="vd__glow vd__glow--2" />
        <div className="vd__glow vd__glow--3" />
      </div>

      {/* ── Header ── */}
      <div ref={headerRef} className={`vd__header ${headerRevealed ? 'is-revealed' : ''}`}>
        <span
          data-reveal="fade"
          style={{ '--delay': 0 } as React.CSSProperties}
          className={`section-tag vd__tag ${headerRevealed ? 'is-revealed' : ''}`}
        >
          {VISUAL_DESIGN_SECTION.tag}
        </span>
        <h2 className="section-title vd__title">
          <span className="reveal-line">
            <span className="reveal-line__inner" style={{ '--delay': 80 } as React.CSSProperties}>
              {VISUAL_DESIGN_SECTION.title}
            </span>
          </span>
        </h2>
      </div>

      {/* ── Grid ── */}
      <div ref={gridRef} className="vd__grid">
        {items.map((p, i) => (
          <a
            key={i}
            href={p?.postUrl ?? 'https://www.instagram.com/sani.seoulscapes/'}
            target="_blank"
            rel="noopener noreferrer"
            className={`vd__item ${gridRevealed ? 'is-revealed' : ''}`}
            style={{ '--delay': i * 60 } as React.CSSProperties}
            data-hover
          >
            {p
              ? <img src={`/${p.imageFile}`} alt={`Post ${i + 1}`} loading="lazy" />
              : <div className="vd__placeholder" />
            }
          </a>
        ))}
      </div>
    </section>
  );
}
