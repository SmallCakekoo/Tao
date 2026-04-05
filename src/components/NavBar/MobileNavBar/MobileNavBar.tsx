import { Link, useLocation } from 'react-router-dom';
import { IconBook, IconBookmark, IconHome, IconUser } from '@tabler/icons-react';
import type { MobileNavItem } from '../../../types/MobileNavBarTypes';
import './MobileNavBar.css';

export const MobileNavBar = () => {
  const location = useLocation();

  const navItems: MobileNavItem[] = [
    { path: '/home', label: 'home', aria: 'Go to home', icon: IconHome },
    { path: '/diary', label: 'diary', aria: 'Go to diary', icon: IconBookmark },
    { path: '/agenda', label: 'agenda', aria: 'Go to agenda', icon: IconBook },
    { path: '/profile', label: 'profile', aria: 'Go to profile', icon: IconUser },
  ];

  const isActive = (path: string) => {
    const pathname = location.pathname;
    const isFormRoute = pathname === '/form' || pathname.startsWith('/form/');
    const isEditFeelingsRoute = pathname.startsWith('/edit-feelings/');

    if (path === '/profile') {
      return isFormRoute || isEditFeelingsRoute;
    }

    // If we're in /edit-feelings/*, check if it matches the form version
    // We have to improve this later to handle better the cases not only form
    if (isEditFeelingsRoute && path !== '/home') {
      return false;
    }
    // Normal path matching
    return pathname === path || pathname === `/form/${path.split('/')[1]}`;
  };

  return (
    <nav className="mobile-nav" aria-label="Main mobile navigation">
      {navItems.map((item) => {
        const isCurrent = isActive(item.path);
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`mobile-nav-link ${isCurrent ? 'active' : ''}`}
            aria-label={item.aria}
            aria-current={isCurrent ? 'page' : undefined}
          >
            <Icon size={24} stroke={1.8} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
