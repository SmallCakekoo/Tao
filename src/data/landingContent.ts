import {
  IconChartBar,
  IconStar,
  IconAlarm,
  IconBook,
  IconShield,
  IconLeaf,
} from '@tabler/icons-react';
import awfulIcon from '../assets/stickers/awful.svg';
import badIcon from '../assets/stickers/bad.svg';
import goodIcon from '../assets/stickers/good.svg';
import greatIcon from '../assets/stickers/great.svg';
import neutralIcon from '../assets/stickers/neutral.svg';

export const comparison = [
  { label: 'METRIC', tao: 'Wellness', traditional: 'Tasks' },
  { label: 'APPROACH', tao: 'Proactive', traditional: 'Reactive' },
  { label: 'DATA', tao: 'Energy', traditional: 'Deadlines' },
  { label: 'GOAL', tao: 'Sustainable', traditional: 'Short-term' },
  { label: 'FOCUS', tao: 'Deepwork', traditional: 'Multitasking' },
];

export const steps = [
  {
    num: '01',
    title: 'Daily Check',
    description:
      'Small reflections on your mood and energy levels. Tao learns your unique rhythms.',
    type: 'check',
  },
  {
    num: '02',
    title: 'Sync Load',
    description:
      'Share your schedule, ideas, and tasks. Tao will act according to your workload',
    type: 'sync',
  },
  {
    num: '03',
    title: 'Balance',
    description:
      'Small reflections on your mood and energy levels. Tao learns your unique rhythms.',
    type: 'balance',
  },
];

export const features = [
  {
    id: 'energy',
    title: 'Energy Tracking',
    description:
      'Visualize your emotional peaks and valleys to understand your productivity cycles.',
    icon: IconChartBar,
    color: 'var(--base-orange)',
    bgColor: 'var(--orange-100)',
  },
  {
    id: 'recommendations',
    title: 'Recommendations',
    description:
      "Personalized activities like 'Time to rest' based on your biological data.",
    icon: IconStar,
    color: 'var(--base-violet)',
    bgColor: 'var(--violet-100)',
  },
  {
    id: 'focus',
    title: 'Focus Tracker',
    description: 'Smart tracker that suggests breaks based on real energy levels.',
    icon: IconAlarm,
    color: 'var(--accent-yellow)',
    bgColor: '#fff9e6',
  },
  {
    id: 'confidence',
    title: 'Confidence Journal',
    description:
      'Reflection space to build academic self-efficacy and celebrate small wins.',
    icon: IconBook,
    color: 'var(--accent-yellow)',
    bgColor: '#fff9e6',
  },
  {
    id: 'burnout',
    title: 'Burnout Indicator',
    description:
      'Early warning system that alerts you when load exceeds recovery capacity.',
    icon: IconShield,
    color: 'var(--base-orange)',
    bgColor: 'var(--orange-100)',
  },
  {
    id: 'insights',
    title: 'Insights Dashboard',
    description:
      'Visual correlations between sleep, mood, workload, and academic performance.',
    icon: IconLeaf,
    color: 'var(--base-violet)',
    bgColor: 'var(--violet-100)',
  },
];

export const heroStickers = [
  { emotionSrc: badIcon, size: 74, left: '12%', top: '18%' },
  { emotionSrc: goodIcon, size: 74, left: '78%', top: '22%' },
  { emotionSrc: neutralIcon, size: 74, left: '8%', top: '65%' },
  { emotionSrc: awfulIcon, size: 74, left: '82%', top: '58%' },
  { emotionSrc: greatIcon, size: 74, left: '45%', top: '12%' },
];

export const fieldProfile = [
  { x: 0, y: 62 },
  { x: 120, y: 92 },
  { x: 260, y: 116 },
  { x: 380, y: 98 },
  { x: 540, y: 68 },
  { x: 760, y: 80 },
  { x: 960, y: 140 },
  { x: 1140, y: 84 },
  { x: 1320, y: 66 },
  { x: 1490, y: 108 },
  { x: 1650, y: 72 },
  { x: 1810, y: 60 },
  { x: 1920, y: 70 },
];

export const academicStickerIcons = [
  awfulIcon,
  badIcon,
  goodIcon,
  greatIcon,
  neutralIcon,
  greatIcon,
  goodIcon,
  neutralIcon,
  badIcon,
  awfulIcon,
];

export const academicStickerSizes = Array(35).fill(74);

export const academicStickers = academicStickerSizes.map((size, i) => ({
  id: i,
  src: academicStickerIcons[i % academicStickerIcons.length],
  size,
}));
