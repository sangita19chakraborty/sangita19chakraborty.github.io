import { EXTRA_SECTION, EXTRA_ITEMS } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './Extracurricular.css';

export default function Extracurricular() {
  const { ref: headerRef, revealed: headerRevealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const { ref: gridRef,   revealed: gridRevealed   } = useReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="extracurricular" className="extra">
      <CubeBackground />

      <div
        ref={headerRef}
        className={`section-header extra__header ${headerRevealed ? 'is-revealed' : ''}`}
      >
        <span
          data-reveal="fade"
          style={{ '--delay': 0 } as React.CSSProperties}
          className={`section-tag ${headerRevealed ? 'is-revealed' : ''}`}
        >
          {EXTRA_SECTION.tag}
        </span>
        <h2 className="section-title">
          {EXTRA_SECTION.title.split('\n').map((l, i) => (
            <span key={i} className="reveal-line">
              <span className="reveal-line__inner" style={{ '--delay': 80 + i * 80 } as React.CSSProperties}>{l}</span>
            </span>
          ))}
        </h2>
      </div>

      <div ref={gridRef} className="extra__grid">
        {EXTRA_ITEMS.map((item, i) => (
          <div
            key={item.id}
            data-reveal="blur-up"
            style={{ '--delay': i * 100 } as React.CSSProperties}
            className={`extra__card ${gridRevealed ? 'is-revealed' : ''}`}
          >
            <div className="extra__card-top">
              <span className="extra__icon" aria-hidden="true">{item.icon}</span>
              <span className="extra__period">{item.period}</span>
            </div>
            <h3 className="extra__org">{item.org}</h3>
            <span className="extra__role-badge">{item.role}</span>
            <p className="extra__desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
