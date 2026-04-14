import { LANGUAGES_SECTION, LANGUAGES } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './Languages.css';

export default function Languages() {
  const { ref: headerRef, revealed: headerRevealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const { ref: listRef,   revealed: listRevealed   } = useReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="languages" className="langs">
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
          {LANGUAGES_SECTION.tag}
        </span>
        <h2 className="section-title">
          {LANGUAGES_SECTION.title.split('\n').map((l, i) => (
            <span key={i} className="reveal-line">
              <span className="reveal-line__inner" style={{ '--delay': 80 + i * 80 } as React.CSSProperties}>{l}</span>
            </span>
          ))}
        </h2>
      </div>

      <p
        data-reveal="up"
        style={{ '--delay': 100 } as React.CSSProperties}
        className={`langs__body ${headerRevealed ? 'is-revealed' : ''}`}
      >
        {LANGUAGES_SECTION.body}
      </p>

      <div ref={listRef} className="langs__list">
        {LANGUAGES.map((lang, i) => (
          <div
            key={lang.lang}
            data-reveal="up"
            style={{ '--delay': i * 100 } as React.CSSProperties}
            className={`langs__item ${listRevealed ? 'is-revealed' : ''}`}
          >
            <div className="langs__item-top">
              <div className="langs__left">
                <span className="langs__script">{lang.script}</span>
                <div>
                  <h3 className="langs__name">{lang.lang}</h3>
                  <span className="langs__level">{lang.level}</span>
                </div>
              </div>
              <span className="langs__pct">{lang.proficiency}%</span>
            </div>
            <div className="langs__bar-track">
              <div
                className={`langs__bar-fill ${listRevealed ? 'langs__bar-fill--animate' : ''}`}
                style={{ '--width': `${lang.proficiency}%`, '--delay': i * 100 + 200 } as React.CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
