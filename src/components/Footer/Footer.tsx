import { Link } from 'react-router-dom';
import { IconBrandGithub, IconHeart } from '@tabler/icons-react';
import logoFull from '../../assets/logo-full.svg';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="landing-footer">
      {/* Main content area */}
      <div className="landing-footer-main">
        {/* Left: brand */}
        <div className="landing-footer-brand">
          <Link to="/" className="landing-footer-logo">
            <img src={logoFull} alt="Tao Logo" />
          </Link>
          <p className="landing-footer-tagline">
            Empowering students to thrive through intelligent energy and mood management.
            Built with intention for the academic community.
          </p>
          <a
            href="https://github.com/SmallCakekoo/Tao"
            target="_blank"
            className="landing-footer-social"
            aria-label="GitHub"
          >
            <IconBrandGithub size={18} stroke={1.5} />
          </a>
        </div>

        {/* Right: link columns */}
        <div className="landing-footer-links">
          <div className="landing-footer-col">
            <h4>Product</h4>
            <a href="/#price">Price</a>
            <a href="/#features">Features</a>
            <a href="/#how-it-works">How it works</a>
          </div>
          <div className="landing-footer-col">
            <h4>Company</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/legal">Legal Notice</Link>
            <Link to="/terms">Terms</Link>
          </div>
          <div className="landing-footer-col">
            <h4>Support</h4>
            <a
              href="https://github.com/SmallCakekoo/tAO"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <a
              href="https://github.com/SmallCakekoo/tAO"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contributions
            </a>
          </div>
        </div>
      </div>

      {/* Copyright and signature */}
      <div className="landing-footer-bottom">
        <p>© {new Date().getFullYear()} Tao Labs Inc. All rights reserved.</p>
        <p>
          Made with{' '}
          <span className="footer-heart-icon">
            <IconHeart size={16} stroke={2} fill="currentColor" />
          </span>{' '}
          for the world.
        </p>
      </div>
    </footer>
  );
};
