import { useState } from 'react';
import { EXPERIENCE_SECTION, EXPERIENCE_ITEMS } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './Experience.css';

export default function Experience() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref: headerRef, revealed: headerRevealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const { ref: tableRef, revealed: tableRevealed } = useReveal<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section className="exp">
      <CubeBackground />
      <div
        ref={headerRef}
        className={`section-header exp__header ${headerRevealed ? 'is-revealed' : ''}`}
      >
        <span
          data-reveal="fade"
          style={{ '--delay': 0 } as React.CSSProperties}
          className={`section-tag ${headerRevealed ? 'is-revealed' : ''}`}
        >
          {EXPERIENCE_SECTION.tag}
        </span>
        <div className="exp__title-row">
          <h2 className="section-title exp__title">
            <span className="reveal-line">
              <span className="reveal-line__inner" style={{ '--delay': 80 } as React.CSSProperties}>
                {EXPERIENCE_SECTION.title}
              </span>
            </span>
          </h2>
          <a
            href={EXPERIENCE_SECTION.downloadHref}
            data-reveal="fade"
            style={{ '--delay': 200 } as React.CSSProperties}
            className={`btn btn--ghost exp__cv ${headerRevealed ? 'is-revealed' : ''}`}
            data-hover
            download
          >
            {EXPERIENCE_SECTION.downloadLabel}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M3 9l4 4 4-4M1 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <div ref={tableRef} className="exp__table">
        <div
          data-reveal="fade"
          style={{ '--delay': 0 } as React.CSSProperties}
          className={`exp__table-head ${tableRevealed ? 'is-revealed' : ''}`}
        >
          <span>Role</span>
          <span>Company</span>
          <span>Period</span>
        </div>
        {EXPERIENCE_ITEMS.map((item, i) => (
          <div
            key={i}
            data-reveal="up"
            style={{ '--delay': i * 110 } as React.CSSProperties}
            className={`exp__row ${tableRevealed ? 'is-revealed' : ''} ${hovered !== null && hovered !== i ? 'exp__row--dim' : ''} ${hovered === i ? 'exp__row--active' : ''}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            data-hover
          >
            <span className="exp__role">{item.role}</span>
            <span className="exp__company">{item.company}</span>
            <span className="exp__period">
              {item.from} <span className="exp__arrow">→</span> {item.to}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

