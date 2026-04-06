import { Link, useLocation } from 'react-router-dom';
import { IconBook, IconBookmark, IconHome, IconUser } from '@tabler/icons-react';
import type { MobileNavItem } from '../../../types/MobileNavBarTypes';
import './MobileNavBar.css';

const navItems: MobileNavItem[] = [
  { path: '/home', label: 'home', aria: 'Go to home', icon: IconHome },
  { path: '/diary', label: 'diary', aria: 'Go to diary', icon: IconBookmark },
  { path: '/agenda', label: 'agenda', aria: 'Go to agenda', icon: IconBook },
  { path: '/profile', label: 'profile', aria: 'Go to profile', icon: IconUser },
];

const resolveActivePath = (pathname: string): MobileNavItem['path'] | null => {
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

export const MobileNavBar = () => {
  const location = useLocation();
  const activePath = resolveActivePath(location.pathname);

  return (
    <nav className="mobile-nav" aria-label="Main mobile navigation">
      {navItems.map((item) => {
        const isCurrent = item.path === activePath;
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
