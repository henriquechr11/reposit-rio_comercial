import { useState, useEffect, useCallback } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { SideNav } from './components/SideNav';
import { HomeView, ProjectsView, InfoView, FAQView, ContactView, ExperienceView } from './components/Views';
import './styles/portfolio.css';

type Theme = 'light' | 'dark' | 'mono';
type Route = 'home' | 'projects' | 'info' | 'faq' | 'contact' | 'experience';

const routes: Route[] = ['home', 'projects', 'info', 'faq', 'contact', 'experience'];

function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [isVisible, setIsVisible] = useState(false);
  const [darkValue, setDarkValue] = useState(1.0);

  const getRouteFromHash = useCallback((): Route => {
    const hash = window.location.hash;
    if (!hash || hash === '#/' || hash === '#home') {
      return 'home';
    }
    const route = hash.replace('#', '');
    return routes.includes(route as Route) ? route as Route : 'home';
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = getRouteFromHash();
      if (newRoute !== currentRoute) {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentRoute(newRoute);
          setIsVisible(true);
        }, 300);
      }
    };

    const initialRoute = getRouteFromHash();
    setCurrentRoute(initialRoute);
    setTimeout(() => setIsVisible(true), 100);

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute, getRouteFromHash]);

  const handleNavigate = useCallback((route: string) => {
    window.location.hash = route;
  }, []);

  const handleThemeChange = useCallback((theme: Theme) => {
    if (theme === 'light') {
      document.body.classList.add('light');
      document.body.style.fontFamily = "'DM Sans', sans-serif";
      setDarkValue(0.0);
    } else if (theme === 'dark') {
      document.body.classList.remove('light');
      document.body.style.fontFamily = "'DM Sans', sans-serif";
      setDarkValue(1.0);
    } else if (theme === 'mono') {
      document.body.classList.remove('light');
      document.body.style.fontFamily = "'DM Mono', monospace";
      setDarkValue(1.0);
    }
  }, []);

  return (
    <>
      <BackgroundCanvas darkValue={darkValue} />

      <SideNav
        activeRoute={currentRoute}
        onNavigate={handleNavigate}
        onThemeChange={handleThemeChange}
      />

      <main id="main-content">
        <HomeView isActive={currentRoute === 'home'} isVisible={isVisible && currentRoute === 'home'} />
        <ProjectsView isActive={currentRoute === 'projects'} isVisible={isVisible && currentRoute === 'projects'} />
        <InfoView isActive={currentRoute === 'info'} isVisible={isVisible && currentRoute === 'info'} />
        <FAQView isActive={currentRoute === 'faq'} isVisible={isVisible && currentRoute === 'faq'} />
        <ContactView isActive={currentRoute === 'contact'} isVisible={isVisible && currentRoute === 'contact'} />
        <ExperienceView isActive={currentRoute === 'experience'} isVisible={isVisible && currentRoute === 'experience'} />
      </main>
    </>
  );
}

export default App;