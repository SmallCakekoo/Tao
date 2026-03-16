import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DraggableSticker } from '../DraggableSticker/DraggableSticker';
import { Button } from '../../Button/Button';
import './HeroSection.css';

import badIcon from '../../../assets/stickers/bad.svg';
import goodIcon from '../../../assets/stickers/good.svg';
import neutralIcon from '../../../assets/stickers/neutral.svg';
import awfulIcon from '../../../assets/stickers/awful.svg';
import greatIcon from '../../../assets/stickers/great.svg';

gsap.registerPlugin(ScrollTrigger);

// Draggable emotions stickers for the hero section
const stickers = [
  { emotionSrc: badIcon, size: 52, left: '12%', top: '18%' },
  { emotionSrc: goodIcon, size: 48, left: '78%', top: '22%' },
  { emotionSrc: neutralIcon, size: 44, left: '8%', top: '65%' },
  { emotionSrc: awfulIcon, size: 50, left: '82%', top: '58%' },
  { emotionSrc: greatIcon, size: 46, left: '45%', top: '12%' },
];

export const HeroSection = () => {
  // Use ref to store the references to the DOM elements  
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: 'power2.out' }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: 'power2.out' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="landing-hero" ref={sectionRef}>
      <div className="landing-hero-stickers">
        {stickers.map((s, i) => (
          <DraggableSticker
            key={i}
            emotionSrc={s.emotionSrc}
            size={s.size}
            hasGravity={true}
            className="landing-sticker-hero"
            style={{
              left: s.left,
              top: s.top,
            }}
          />
        ))}
      </div>
      <p className="landing-hero-badge" ref={badgeRef}>
        Redefining academic performance.
      </p>
      <h1 className="landing-hero-title" ref={titleRef}>
        Your personal hub for mental clarity and productivity.
      </h1>
      <Button ref={ctaRef} type="button" className="landing-hero-cta">
        Get started
      </Button>
      <div className="landing-hero-hill" aria-hidden />
    </section>
  );
};
