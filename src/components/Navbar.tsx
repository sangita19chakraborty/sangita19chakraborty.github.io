import { useEffect, useState } from 'react';
import { SITE, NAV_LINKS } from '../constants/content';
import ThemeToggle from './ThemeToggle';
import { downloadPortfolioPDF } from '../utils/downloadPDF';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadPortfolioPDF();
    } finally {
      setDownloading(false);
    }
  };

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
        <button
          className="nav__pdf-btn"
          onClick={handleDownload}
          disabled={downloading}
          data-hover
          title="Download portfolio as PDF"
          aria-label="Download portfolio as PDF"
        >
          {downloading ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="nav__pdf-spin">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="31.4" strokeDashoffset="10"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v12M7 11l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
          <span>{downloading ? 'Generating…' : 'PDF'}</span>
        </button>
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
