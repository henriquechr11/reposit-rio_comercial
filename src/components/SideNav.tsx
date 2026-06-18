import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'mono';

interface SideNavProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
  onThemeChange: (theme: Theme) => void;
}

const routes = ['home', 'projects', 'experience', 'info', 'contact', 'faq'];

export function SideNav({ activeRoute, onNavigate, onThemeChange }: SideNavProps) {
  const [storedTheme, setStoredTheme] = useState<Theme>('mono');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as Theme | null;
    const theme = saved || 'mono';
    setStoredTheme(theme);
    onThemeChange(theme);
  }, [onThemeChange]);

  const handleThemeClick = (theme: Theme) => {
    setStoredTheme(theme);
    onThemeChange(theme);
    localStorage.setItem('portfolio-theme', theme);
  };

  const renderNavItems = () => {
    return routes.map((route) => {
      let label = '';
      let isActive = false;

      if (activeRoute === 'home') {
        if (route === 'home') {
          label = '•';
          isActive = true;
        } else {
          label = route.charAt(0).toUpperCase() + route.slice(1);
        }
      } else {
        if (route === 'home') {
          label = activeRoute.charAt(0).toUpperCase() + activeRoute.slice(1);
        } else if (route === activeRoute) {
          label = '•';
          isActive = true;
        } else {
          label = route.charAt(0).toUpperCase() + route.slice(1);
        }
      }

      const targetHash = route === 'home' ? '#home' : `#${route}`;

      return (
        <li key={route} className={`nav-item${isActive ? ' active' : ''}`}>
          <a
            className={`nav-link${label === '•' ? ' active-dot' : ''}`}
            href={targetHash}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(route);
            }}
          >
            {label}
          </a>
        </li>
      );
    });
  };

  return (
    <nav id="side-nav">
      <div className="nav-identity">
        <span className="nav-name">Henrique Santos</span>
        <span className="nav-title">Desenvolvedor Full Stack</span>
      </div>

      <ul className="nav-list" id="nav-list">
        {renderNavItems()}
      </ul>

      <div className="theme-controls">
        <button
          className={`theme-toggle-btn ${storedTheme === 'mono' ? 'active' : ''}`}
          id="btn-mono"
          type="button"
          onClick={() => handleThemeClick('mono')}
        >
          <span className="square">{storedTheme === 'mono' ? '■' : '□'}</span> MONOSPACED
        </button>
        <button
          className={`theme-toggle-btn ${storedTheme === 'dark' ? 'active' : ''}`}
          id="btn-dark"
          type="button"
          onClick={() => handleThemeClick('dark')}
        >
          <span className="square">{storedTheme === 'dark' ? '■' : '□'}</span> DARK
        </button>
        <button
          className={`theme-toggle-btn ${storedTheme === 'light' ? 'active' : ''}`}
          id="btn-light"
          type="button"
          onClick={() => handleThemeClick('light')}
        >
          <span className="square">{storedTheme === 'light' ? '■' : '□'}</span> LIGHT
        </button>
      </div>

      <div className="sidebar-footer">
        © Henrique Santos
      </div>
    </nav>
  );
}