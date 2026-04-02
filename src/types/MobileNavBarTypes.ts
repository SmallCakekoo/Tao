import type { ComponentType } from 'react';

export type MobileNavItem = {
  path: '/home' | '/diary' | '/agenda' | '/profile';
  label: string;
  aria: string;
  icon: ComponentType<{ size?: number | string; stroke?: number | string }>;
};
