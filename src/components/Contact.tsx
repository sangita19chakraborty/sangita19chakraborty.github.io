import { CONTACT_SECTION, SOCIAL_LINKS, SITE } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './Contact.css';

export default function Contact() {
  const { ref: leftRef, revealed: leftRevealed } = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const { ref: rightRef, revealed: rightRevealed } = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="contact" className="contact">
      <CubeBackground />
      <div className="contact__inner">
        <div ref={leftRef} className="contact__left">
          <span
            data-reveal="fade"
            style={{ '--delay': 0 } as React.CSSProperties}
            className={`section-tag ${leftRevealed ? 'is-revealed' : ''}`}
          >
            {CONTACT_SECTION.tag}
          </span>
          <h2 className="contact__headline">
            {CONTACT_SECTION.headline.split('\n').map((l, i) => (
              <span key={i} className="reveal-line">
                <span
                  className="reveal-line__inner"
                  style={{ '--delay': 80 + i * 100 } as React.CSSProperties}
                >{l}</span>
              </span>
            ))}
          </h2>
          <p
            data-reveal="up"
            style={{ '--delay': 200 } as React.CSSProperties}
            className={`contact__body ${leftRevealed ? 'is-revealed' : ''}`}
          >
            {CONTACT_SECTION.body}
          </p>
          <a
            href={`mailto:${CONTACT_SECTION.email}`}
            data-reveal="up"
            style={{ '--delay': 300 } as React.CSSProperties}
            className={`btn btn--accent contact__cta ${leftRevealed ? 'is-revealed' : ''}`}
            data-hover
          >
            {CONTACT_SECTION.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div ref={rightRef} className="contact__right">
          <div className="contact__details">
            {[{label:'Email', href:`mailto:${CONTACT_SECTION.email}`, value: CONTACT_SECTION.email},
              {label:'Phone', href:`tel:${CONTACT_SECTION.phone}`, value: CONTACT_SECTION.phone}
            ].map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                data-reveal="from-right"
                style={{ '--delay': i * 120 } as React.CSSProperties}
                className={`contact__detail-item ${rightRevealed ? 'is-revealed' : ''}`}
                data-hover
              >
                <span className="contact__detail-label">{item.label}</span>
                <span className="contact__detail-value">{item.value}</span>
              </a>
            ))}
          </div>

          <div className="contact__socials">
            {SOCIAL_LINKS.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal="up"
                style={{ '--delay': 160 + i * 60 } as React.CSSProperties}
                className={`contact__social ${rightRevealed ? 'is-revealed' : ''}`}
                data-hover
              >
                {s.label}
                <span className="contact__social-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="contact__footer">
        <div className="contact__footer-back">
          <button
            className="contact__back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            data-hover
          >
            &#123; BACK TO TOP &#125;
          </button>
        </div>
        <span className="contact__copyright">{SITE.copyright}</span>
      </div>

      <div className="contact__big-name" aria-hidden="true">
        {SITE.name}<span>.</span>
      </div>
    </section>
  );
}
