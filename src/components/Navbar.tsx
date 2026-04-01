import { useEffect, useState } from 'react';
import { SITE, NAV_LINKS } from '../constants/content';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a href="#home" className="nav__logo" data-hover onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        {SITE.name}<span>.</span>
      </a>

      <nav className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
        {NAV_LINKS.map(link => (
          <button
            key={link.href}
            className="nav__link"
            data-hover
            onClick={() => handleNavClick(link.href)}
          >
            {link.label}
          </button>
        ))}
        <a href="#contact" className="nav__cta" data-hover onClick={() => handleNavClick('#contact')}>
          Let's Talk
        </a>
        <ThemeToggle />
      </nav>

      <button
        className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </header>
  );
}
