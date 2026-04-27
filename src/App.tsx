import { useState, useCallback } from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { PageTransitionProvider } from './context/TransitionContext';
import TransitionOverlay from './components/TransitionOverlay';
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

// Inner component — must live inside PageTransitionProvider to use the context
function PageContent() {
  const [loaded, setLoaded] = useState(false);

  if (typeof history !== 'undefined') history.scrollRestoration = 'manual';

  const handleLoaded = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setLoaded(true);
  }, []);

  return (
    <>
      <TransitionOverlay />
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
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PageTransitionProvider>
        <PageContent />
      </PageTransitionProvider>
    </ThemeProvider>
  );
}

export default App;
