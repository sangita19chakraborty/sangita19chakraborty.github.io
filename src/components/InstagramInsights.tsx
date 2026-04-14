import { INSTAGRAM_SECTION, INSTAGRAM_STATS } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './InstagramInsights.css';

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="ig__icon">
    <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.7"/>
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7"/>
    <circle cx="17.6" cy="6.4" r="1.3" fill="currentColor"/>
  </svg>
);

export default function InstagramInsights() {
  const { ref: heroRef,  revealed: heroRevealed  } = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const { ref: statsRef, revealed: statsRevealed } = useReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="instagram" className="ig">
      <CubeBackground />

      {/* ── Ambient glow backdrop ── */}
      <div className="ig__backdrop" aria-hidden="true">
        <div className="ig__glow ig__glow--1" />
        <div className="ig__glow ig__glow--2" />
        <div className="ig__glow ig__glow--3" />
      </div>

      {/* ── Header ─────────────────────────────────────── */}
      <div
        ref={heroRef}
        className={`ig__header ${heroRevealed ? 'is-revealed' : ''}`}
      >
        <span
          data-reveal="fade"
          style={{ '--delay': 0 } as React.CSSProperties}
          className={`section-tag ig__tag ${heroRevealed ? 'is-revealed' : ''}`}
        >
          {INSTAGRAM_SECTION.tag}
        </span>
        <h2 className="section-title ig__title">
          {INSTAGRAM_SECTION.title.split('\n').map((l, i) => (
            <span key={i} className="reveal-line">
              <span className="reveal-line__inner" style={{ '--delay': 80 + i * 80 } as React.CSSProperties}>{l}</span>
            </span>
          ))}
        </h2>
      </div>

      {/* ── Profile hero card ──────────────────────────── */}
      <div
        data-reveal="blur-up"
        style={{ '--delay': 100 } as React.CSSProperties}
        className={`ig__profile ${heroRevealed ? 'is-revealed' : ''}`}
      >
        <div className="ig__profile-left">
          <div className="ig__avatar-wrap">
            <div className="ig__avatar">
              <span>SC</span>
            </div>
            <div className="ig__avatar-ring" />
          </div>
          <div className="ig__profile-info">
            <a
              href={INSTAGRAM_SECTION.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ig__handle"
              data-hover
            >
              <InstagramIcon />
              {INSTAGRAM_SECTION.handle}
            </a>
            <span className="ig__followers">
              <strong>{INSTAGRAM_SECTION.followers}</strong> followers
            </span>
            <span className="ig__period">
              {INSTAGRAM_SECTION.period} · {INSTAGRAM_SECTION.days}
            </span>
          </div>
        </div>
        <a
          href={INSTAGRAM_SECTION.href}
          target="_blank"
          rel="noopener noreferrer"
          className="ig__follow-btn"
          data-hover
        >
          View Profile ↗
        </a>
      </div>

      {/* ── Stats grid ─────────────────────────────────── */}
      <div ref={statsRef} className="ig__stats">
        {INSTAGRAM_STATS.map((stat, i) => (
          <div
            key={stat.label}
            data-reveal="blur-up"
            style={{ '--delay': i * 70 } as React.CSSProperties}
            className={`ig__stat ${statsRevealed ? 'is-revealed' : ''}`}
          >
            <span className="ig__stat-value">{stat.value}</span>
            <span className="ig__stat-label">{stat.label}</span>
            <span className="ig__stat-sub">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* ── Footer CTA ─────────────────────────────────── */}
      <div
        data-reveal="up"
        style={{ '--delay': 300 } as React.CSSProperties}
        className={`ig__footer-cta ${statsRevealed ? 'is-revealed' : ''}`}
      >
        <span className="ig__footer-label">Content about Korean culture, beauty &amp; campus life</span>
        <a
          href={INSTAGRAM_SECTION.href}
          target="_blank"
          rel="noopener noreferrer"
          className="ig__big-link"
          data-hover
        >
          <span className="ig__big-link-text">Follow @sani.seoulscapes</span>
          <span className="ig__big-link-arrow">→</span>
        </a>
      </div>
    </section>
  );
}
