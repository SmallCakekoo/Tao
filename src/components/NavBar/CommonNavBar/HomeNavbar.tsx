import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoFull from '../../../assets/logo-full.svg';
import './HomeNavbar.css';

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

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`home-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="home-navbar-container">
        <Link to="/" className="home-nav-logo" aria-label="Tao home">
          <img src={logoFull} alt="Tao logo" />
        </Link>
        <div className="home-nav-actions">
          <Link
            to="/home"
            className={`home-nav-link ${isActive('/home') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/diary"
            className={`home-nav-link ${isActive('/diary') ? 'active' : ''}`}
          >
            Diary
          </Link>
          <Link
            to="/agenda"
            className={`home-nav-link ${isActive('/agenda') ? 'active' : ''}`}
          >
            Agenda
          </Link>
          <Link
            to="/profile"
            className={`home-nav-link ${isActive('/profile') ? 'active' : ''}`}
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};
