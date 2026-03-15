import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DraggableSticker } from '../DraggableSticker/DraggableSticker';
import { Button } from '../../Button/Button';
import fieldImg from '../../../assets/field-landing.svg';
import './HeroSection.css';

import badIcon from '../../../assets/stickers/bad.svg';
import goodIcon from '../../../assets/stickers/good.svg';
import neutralIcon from '../../../assets/stickers/neutral.svg';
import awfulIcon from '../../../assets/stickers/awful.svg';
import greatIcon from '../../../assets/stickers/great.svg';

gsap.registerPlugin(ScrollTrigger);

const stickers = [
  { emotionSrc: badIcon, size: 74, left: '12%', top: '18%' },
  { emotionSrc: goodIcon, size: 74, left: '78%', top: '22%' },
  { emotionSrc: neutralIcon, size: 74, left: '8%', top: '65%' },
  { emotionSrc: awfulIcon, size: 74, left: '82%', top: '58%' },
  { emotionSrc: greatIcon, size: 74, left: '45%', top: '12%' },
];

/**
 * Rough profile of the top edge of the field SVG.
 * Coordinates based on viewbox: 1920 x 238
 */
const fieldViewbox = { width: 1920, height: 238 };

const fieldProfile = [
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

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const HeroSection = () => {
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hillRef = useRef<HTMLDivElement>(null);

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
    }, sectionRef.current!);

    return () => ctx.revert();
  }, []);

  const getGroundY = useCallback((centerX: number) => {
    const section = sectionRef.current;
    const hill = hillRef.current;

    if (!section || !hill) return 0;

    const sectionWidth = section.clientWidth;
    const sectionHeight = section.clientHeight;
    const hillHeight = hill.clientHeight;

    const svgW = fieldViewbox.width;
    const svgH = fieldViewbox.height;

    // Calculation to match object-fit: cover + object-position: bottom center
    const scale = Math.max(sectionWidth / svgW, hillHeight / svgH);
    const renderedW = svgW * scale;
    const renderedH = svgH * scale;

    const offsetX = (sectionWidth - renderedW) / 2;
    const offsetY = sectionHeight - renderedH;

    const svgX = (centerX - offsetX) / scale;

    // clamp
    const clampedX = Math.max(0, Math.min(svgW, svgX));

    let svgY = fieldProfile[fieldProfile.length - 1].y;

    for (let i = 0; i < fieldProfile.length - 1; i++) {
      const a = fieldProfile[i];
      const b = fieldProfile[i + 1];

      if (clampedX >= a.x && clampedX <= b.x) {
        const t = (clampedX - a.x) / (b.x - a.x);
        svgY = lerp(a.y, b.y, t);
        break;
      }
    }

    return offsetY + svgY * scale;
  }, []);

  return (
    <section className="landing-hero" ref={sectionRef}>
      <div className="landing-hero-stickers">
        {stickers.map((sticker, index) => (
          <DraggableSticker
            key={index}
            emotionSrc={sticker.emotionSrc}
            size={sticker.size}
            hasGravity
            className="landing-sticker-hero"
            getGroundY={getGroundY}
            style={{
              left: sticker.left,
              top: sticker.top,
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

      <div className="landing-hero-hill" ref={hillRef} aria-hidden>
        <img src={fieldImg} alt="" className="landing-hero-hill-img" />
      </div>
    </section>
  );
};