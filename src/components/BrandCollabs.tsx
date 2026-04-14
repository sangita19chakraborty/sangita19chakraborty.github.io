import { BRANDS_SECTION, BRANDS } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './BrandCollabs.css';

export default function BrandCollabs() {
  const { ref: headerRef, revealed: headerRevealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const { ref: gridRef,   revealed: gridRevealed   } = useReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="collabs" className="collabs">
      <CubeBackground />

      <div
        ref={headerRef}
        className={`section-header ${headerRevealed ? 'is-revealed' : ''}`}
      >
        <span
          data-reveal="fade"
          style={{ '--delay': 0 } as React.CSSProperties}
          className={`section-tag ${headerRevealed ? 'is-revealed' : ''}`}
        >
          {BRANDS_SECTION.tag}
        </span>
        <h2 className="section-title">
          <span className="reveal-line">
            <span className="reveal-line__inner" style={{ '--delay': 80 } as React.CSSProperties}>
              {BRANDS_SECTION.title}
            </span>
          </span>
        </h2>
      </div>

      <p
        data-reveal="up"
        style={{ '--delay': 100 } as React.CSSProperties}
        className={`collabs__body ${headerRevealed ? 'is-revealed' : ''}`}
      >
        {BRANDS_SECTION.body}
      </p>

      <div ref={gridRef} className="collabs__grid">
        {BRANDS.map((brand, i) => (
          <div
            key={brand.name}
            data-reveal="blur-up"
            style={
              {
                '--delay': i * 80,
                '--brand-color': brand.color,
              } as React.CSSProperties
            }
            className={`collabs__card ${gridRevealed ? 'is-revealed' : ''}`}
          >
            <span className="collabs__abbr">{brand.abbr}</span>
            <span className="collabs__name">{brand.name}</span>
            <div className="collabs__glow" />
          </div>
        ))}
      </div>

      <div
        data-reveal="up"
        style={{ '--delay': 200 } as React.CSSProperties}
        className={`collabs__instagram ${headerRevealed ? 'is-revealed' : ''}`}
      >
        <span className="collabs__ig-label">Follow the journey</span>
        <a
          href="https://www.instagram.com/sani.seoulscapes/"
          target="_blank"
          rel="noopener noreferrer"
          className="collabs__ig-link"
          data-hover
        >
          <span className="collabs__ig-handle">@sani.seoulscapes</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6"/>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
