import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../Button/Button';
import { supabase } from '../../../lib/supabaseClient';
import logoFull from '../../../assets/logo-full.svg';
import './Navbar.css';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [ctaTo, setCtaTo] = useState('/signup');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Check if user is logged in to set the CTA destination
  useEffect(() => {
    const setCtaDestination = async () => {
      const { data } = await supabase.auth.getSession();
      setCtaTo(data.session ? '/home' : '/signup');
    };

    void setCtaDestination();
  }, []);

  return (
    <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="landing-nav-logo" aria-label="Tao home">
        <img src={logoFull} alt="Tao logo" aria-hidden />
      </Link>
      <div className="landing-nav-actions">
        <Link to="/login" className="landing-nav-link">
          Login
        </Link>
        <Button to={ctaTo} variant="nav">
          Get Started
        </Button>
      </div>
    </nav>
  );
};
