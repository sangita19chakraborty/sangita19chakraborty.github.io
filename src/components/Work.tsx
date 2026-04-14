import { useState, useEffect } from 'react';
import { WORK_SECTION, PROJECTS } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './Work.css';

export default function Work() {
  const [hovered, setHovered]     = useState<number | null>(null);
  const [activeEmbed, setActive]  = useState<typeof PROJECTS[0] | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { ref: headerRef, revealed: headerRevealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const { ref: listRef,   revealed: listRevealed   } = useReveal<HTMLDivElement>({ threshold: 0.08 });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeEmbed) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [activeEmbed]);

  // Reset iframe state and open embed
  const openEmbed = (p: typeof PROJECTS[0]) => { setIframeLoaded(false); setActive(p); };
  const closeEmbed = () => { setActive(null); setIframeLoaded(false); };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
            onClick={() => openEmbed(p)}
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

      {/* ── Canva embed modal ──────────────────────────────────────── */}
      {activeEmbed && (
        <div className="work__modal" onClick={closeEmbed}>
          <div className="work__modal-inner" onClick={e => e.stopPropagation()}>
            <div className="work__modal-header">
              <div>
                <span className="work__modal-client">{activeEmbed.client}</span>
                <h3 className="work__modal-title">{activeEmbed.title}</h3>
              </div>
              <button className="work__modal-close" onClick={closeEmbed} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="work__embed-wrap">
              {!iframeLoaded && (
                <div className="work__embed-spinner">
                  <div className="work__embed-orb" />
                  <span className="work__embed-loading">Loading presentation…</span>
                </div>
              )}
              {/* Transparent shield re-emits mousemove to window when cursor exits iframe */}
              <div className="work__embed-shield" />
              <iframe
                loading="lazy"
                src={activeEmbed.canvaEmbed}
                allowFullScreen
                allow="fullscreen"
                title={activeEmbed.title}
                className="work__embed-frame"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
            <div className="work__modal-footer">
              {activeEmbed.tags.map(t => <span key={t} className="work__tag">{t}</span>)}
              <span className="work__modal-year">{activeEmbed.year}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

