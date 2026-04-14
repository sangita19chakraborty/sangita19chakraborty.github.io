import { useState, useCallback } from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Extracurricular from './components/Extracurricular';
import Volunteering from './components/Volunteering';
import BrandCollabs from './components/BrandCollabs';
import Languages from './components/Languages';
import InstagramInsights from './components/InstagramInsights';
import Contact from './components/Contact';

function App() {
  const [loaded, setLoaded] = useState(false);

  // Prevent browser from restoring scroll position on reload
  if (typeof history !== 'undefined') history.scrollRestoration = 'manual';

  const handleLoaded = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setLoaded(true);
  }, []);

  return (
    <ThemeProvider>
      <Cursor />
      {!loaded && <Loader onDone={handleLoaded} />}
      <div className={`page ${loaded ? 'page--visible' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <Work />
          <About />
          <Experience />
          <Skills />
          <Extracurricular />
          <Volunteering />
          <BrandCollabs />
          <Languages />
          <InstagramInsights />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
