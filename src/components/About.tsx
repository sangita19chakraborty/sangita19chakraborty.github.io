import { ABOUT_SECTION, ABOUT_STATS } from '../constants/content';
import { useReveal } from '../hooks/useReveal';
import CubeBackground from './CubeBackground';
import './About.css';

export default function About() {
  const { ref: leftRef, revealed: leftRevealed } = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const { ref: rightRef, revealed: rightRevealed } = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="about" className="about">
      <CubeBackground />
      <div className="about__inner">
        <div
          ref={leftRef}
          data-reveal="from-left"
          style={{ '--delay': 0 } as React.CSSProperties}
          className={`about__left ${leftRevealed ? 'is-revealed' : ''}`}
        >
          <span className="section-tag about__tag">{ABOUT_SECTION.tag}</span>
          <div className="about__profile-box">
            <span className="about__profile-label">{ABOUT_SECTION.profileTag}</span>
            <div className="about__avatar-row">
              <div className="about__avatar">
                <div className="about__avatar-inner">
                  <img
                    src="/images/coffee cup sangita.png"
                    alt="Sangita Chakraborty"
                    className="about__avatar-photo"
                    draggable={false}
                  />
                </div>
              </div>
              <div className="about__avatar-info">
                <span className="about__avatar-name">Sangita Chakraborty</span>
                <span className="about__avatar-role">Strategy &amp; Marketing</span>
                <span className="about__avatar-location">Seoul, South Korea</span>
              </div>
            </div>
            <div className="about__stats">
              {ABOUT_STATS.map((s, i) => (
                <div key={i} className="about__stat">
                  <span className="about__stat-num">{s.num}</span>
                  <span className="about__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={rightRef}
          data-reveal="from-right"
          style={{ '--delay': 150 } as React.CSSProperties}
          className={`about__right ${rightRevealed ? 'is-revealed' : ''}`}
        >
          <h2 className="about__headline">{ABOUT_SECTION.headline}</h2>
          <div className="about__bio">
            {ABOUT_SECTION.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
