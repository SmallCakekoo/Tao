import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoFull from '../../../assets/logo-full.svg';
import './HomeNavbar.css';

const navItems = [
  { path: '/home', label: 'Home' },
  { path: '/diary', label: 'Diary' },
  { path: '/agenda', label: 'Agenda' },
  { path: '/profile', label: 'Profile' },
] as const;

const resolveDesktopActivePath = (pathname: string) => {
  const isProfileRelatedRoute =
    pathname === '/profile' ||
    pathname === '/editprofile' ||
    pathname === '/form' ||
    pathname.startsWith('/form/') ||
    pathname === '/edit-feelings' ||
    pathname.startsWith('/edit-feelings/');

  if (isProfileRelatedRoute) return '/profile';
  if (pathname === '/home' || pathname.startsWith('/home/')) return '/home';
  if (pathname === '/diary' || pathname.startsWith('/diary/')) return '/diary';
  if (pathname === '/agenda' || pathname.startsWith('/agenda/')) return '/agenda';

  return null;
};

export const HomeNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const activePath = resolveDesktopActivePath(location.pathname);

  return (
    <nav className={`home-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="home-navbar-container">
        <Link to="/" className="home-nav-logo" aria-label="Tao home">
          <img src={logoFull} alt="Tao logo" />
        </Link>
        <div className="home-nav-actions">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`home-nav-link ${activePath === item.path ? 'active' : ''}`}
              aria-current={activePath === item.path ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
