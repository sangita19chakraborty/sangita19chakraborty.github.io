import { useEffect, useRef } from 'react';
import { SITE, HERO } from '../constants/content';
import './Hero.css';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Staggered entrance on load (hero is always visible so no IntersectionObserver needed)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('[data-hero-reveal]');
    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(32px)';
      setTimeout(() => {
        item.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)`;
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 300 + i * 100);
    });

    // Clip-path reveal for headline lines
    const lines = el.querySelectorAll<HTMLElement>('.hero__line-inner');
    lines.forEach((line, i) => {
      line.style.transform = 'translateY(105%)';
      setTimeout(() => {
        line.style.transition = `transform 0.9s cubic-bezier(0.16,1,0.3,1)`;
        line.style.transform = 'translateY(0)';
      }, 400 + i * 120);
    });
  }, []);

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <div className="hero__meta">
        <span className="tag" data-hero-reveal>{HERO.availableLabel}</span>
        <span className="hero__scroll-label" data-hero-reveal>{HERO.scrollLabel}</span>
      </div>

      <div className="hero__center">
        <p className="hero__role" data-hero-reveal>{SITE.role}</p>
        <h1 className="hero__headline">
          {SITE.tagline.split('\n').map((line, i) => (
            <span key={i} className="hero__line">
              <span className="hero__line-inner">{line}</span>
            </span>
          ))}
        </h1>
        <div className="hero__ctas" data-hero-reveal>
          <a href={HERO.cta.href} className="btn btn--accent" data-hover>
            {HERO.cta.label}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href={HERO.secondaryCta.href} className="btn btn--ghost" data-hover>
            {HERO.secondaryCta.label}
          </a>
        </div>
      </div>

      <div className="hero__footer" data-hero-reveal>
        <div className="hero__footer-left">
          <span className="hero__name-tag">{SITE.fullName}</span>
          <span className="hero__location">Based in London, UK</span>
        </div>
        <div className="hero__scroll-indicator">
          <span className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll</span>
        </div>
      </div>

      <div className="hero__watermark" aria-hidden="true">{SITE.name}</div>
    </section>
  );
}
