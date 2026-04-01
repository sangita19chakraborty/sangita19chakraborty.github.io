import { useState } from 'react';
import { WORK_SECTION, PROJECTS } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './Work.css';

export default function Work() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref: headerRef, revealed: headerRevealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const { ref: listRef, revealed: listRevealed } = useReveal<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section id="work" className="work">
      <CubeBackground />
      <div
        ref={headerRef}
        className={`section-header ${headerRevealed ? 'is-revealed' : ''}`}
      >
        <span data-reveal="fade" style={{ '--delay': 0 } as React.CSSProperties}
          className={`section-tag ${headerRevealed ? 'is-revealed' : ''}`}>
          {WORK_SECTION.tag}
        </span>
        <h2 className="section-title">
          {WORK_SECTION.title.split('\n').map((l, i) => (
            <span key={i} className="reveal-line">
              <span
                className="reveal-line__inner"
                style={{ '--delay': 100 + i * 80 } as React.CSSProperties}
              >{l}</span>
            </span>
          ))}
        </h2>
      </div>

      <div ref={listRef} className="work__list">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            data-reveal="blur-up"
            style={{ '--delay': i * 110 } as React.CSSProperties}
            className={`work__item
              ${listRevealed ? 'is-revealed' : ''}
              ${hovered !== null && hovered !== p.id ? 'work__item--dim' : ''}
              ${hovered === p.id ? 'work__item--active' : ''}
            `}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            data-hover
          >
            <div className="work__item-left">
              <span className="work__index">0{i + 1}</span>
              <div className="work__info">
                <span className="work__client">{p.client}</span>
                <h3 className="work__title">{p.title}</h3>
                <p className="work__outcome">{p.outcome}</p>
              </div>
            </div>

            <div className="work__item-right">
              <div className="work__tags">
                {p.tags.map(t => (
                  <span key={t} className="work__tag">{t}</span>
                ))}
              </div>
              <span className="work__year">{p.year}</span>
              <span className="work__arrow">↗</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

