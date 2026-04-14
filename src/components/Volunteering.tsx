import { VOLUNTEER_SECTION, VOLUNTEER_ITEMS } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './Volunteering.css';

export default function Volunteering() {
  const { ref: headerRef, revealed: headerRevealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const { ref: listRef,   revealed: listRevealed   } = useReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="volunteering" className="vol">
      <CubeBackground />

      <div
        ref={headerRef}
        className={`section-header vol__header ${headerRevealed ? 'is-revealed' : ''}`}
      >
        <span
          data-reveal="fade"
          style={{ '--delay': 0 } as React.CSSProperties}
          className={`section-tag ${headerRevealed ? 'is-revealed' : ''}`}
        >
          {VOLUNTEER_SECTION.tag}
        </span>
        <h2 className="section-title">
          <span className="reveal-line">
            <span className="reveal-line__inner" style={{ '--delay': 80 } as React.CSSProperties}>
              {VOLUNTEER_SECTION.title}
            </span>
          </span>
        </h2>
      </div>

      <div ref={listRef} className="vol__list">
        {VOLUNTEER_ITEMS.map((item, i) => (
          <div
            key={i}
            data-reveal="up"
            style={{ '--delay': i * 120 } as React.CSSProperties}
            className={`vol__item ${listRevealed ? 'is-revealed' : ''}`}
          >
            <span className="vol__icon" aria-hidden="true">{item.icon}</span>
            <div className="vol__info">
              <div className="vol__top">
                <h3 className="vol__org">{item.org}</h3>
                <span className="vol__period">{item.period}</span>
              </div>
              <span className="vol__role">{item.role}</span>
              <p className="vol__desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
