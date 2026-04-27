import { SKILLS_SECTION, SKILLS } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './Skills.css';

export default function Skills() {
  const { ref: headerRef, revealed: headerRevealed } = useReveal<HTMLDivElement>();
  const { ref: gridRef, revealed: gridRevealed } = useReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="skills" id="skills">
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
          {SKILLS_SECTION.tag}
        </span>
        <h2 className="section-title">
          <span className="reveal-line">
            <span className="reveal-line__inner" style={{ '--delay': 80 } as React.CSSProperties}>
              {SKILLS_SECTION.title.split(' ').slice(0, 1).join(' ')}
            </span>
          </span>
          <span className="reveal-line">
            <span className="reveal-line__inner" style={{ '--delay': 160 } as React.CSSProperties}>
              {SKILLS_SECTION.title.split(' ').slice(1).join(' ')}
            </span>
          </span>
        </h2>
      </div>

      <p
        data-reveal="up"
        style={{ '--delay': 100 } as React.CSSProperties}
        className={`skills__body ${headerRevealed ? 'is-revealed' : ''}`}
      >
        {SKILLS_SECTION.body}
      </p>

      <div ref={gridRef} className="skills__grid">
        {SKILLS.map((s, i) => (
          <div
            key={s.number}
            data-reveal="blur-up"
            style={{ '--delay': i * 100 } as React.CSSProperties}
            className={`skills__card ${gridRevealed ? 'is-revealed' : ''}`}
            data-hover
          >
            <span className="skills__num">{s.number}</span>
            <h3 className="skills__label">{s.label}</h3>
            <div className="skills__hover-line" />
          </div>
        ))}
      </div>
    </section>
  );
}
