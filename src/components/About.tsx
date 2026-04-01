import { ABOUT_SECTION } from '../constants/content';
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
            <div className="about__avatar">
              <div className="about__avatar-inner">
                <span>SC</span>
              </div>
            </div>
            <div className="about__stats">
              {[{num:'8+',label:'Years Experience'},{num:'40+',label:'Campaigns Launched'},{num:'15+',label:'Brand Partners'}].map((s,i) => (
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
