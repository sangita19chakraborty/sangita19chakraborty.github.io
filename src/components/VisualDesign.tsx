import { useState, useEffect } from 'react';
import { VISUAL_DESIGN_SECTION } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './VisualDesign.css';

type Post = { imageFile: string; postUrl: string };

export default function VisualDesign() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    fetch('/ig-posts.json')
      .then(r => r.json())
      .then(setPosts)
      .catch(() => {}); // ponytail: silently falls back to placeholder skeleton
  }, []);

  const items = posts.length ? posts : Array<null>(8).fill(null);

  return (
    <section id="visual-design" className="vd">
      <CubeBackground />

      <div ref={ref} className={`vd__header ${revealed ? 'is-revealed' : ''}`}>
        <span
          data-reveal="fade"
          style={{ '--delay': 0 } as React.CSSProperties}
          className={`section-tag ${revealed ? 'is-revealed' : ''}`}
        >
          {VISUAL_DESIGN_SECTION.tag}
        </span>
        <h2 className="section-title vd__title">
          {VISUAL_DESIGN_SECTION.title.split('\n').map((l, i) => (
            <span key={i} className="reveal-line">
              <span className="reveal-line__inner" style={{ '--delay': 80 + i * 80 } as React.CSSProperties}>
                {l}
              </span>
            </span>
          ))}
        </h2>
      </div>

      <div className="vd__grid">
        {items.map((p, i) => (
          <a
            key={i}
            href={p?.postUrl ?? 'https://www.instagram.com/sani.seoulscapes/'}
            target="_blank"
            rel="noopener noreferrer"
            className={`vd__item ${revealed ? 'is-revealed' : ''}`}
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
