import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { DraggableSticker } from '../DraggableSticker/DraggableSticker';
import { Button } from '../../Button/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { fieldProfile, heroStickers } from '../../../data/landingContent';
import fieldImg from '../../../assets/field-landing.svg';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

// Note: fieldViewbox is a recreation of the original viewbox from the Tao website.
const fieldViewbox = { width: 1920, height: 238 };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hillRef = useRef<HTMLDivElement>(null);

  // Handle CTA click based on authentication status
  const handleGetStartedClick = () => {
    navigate(user ? '/home' : '/signup');
  };

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

  /**
   * Esta función calcula dinámicamente la altura del suelo en un punto X específico.
   * Interpola entre los puntos del 'fieldProfile' teniendo en cuenta el redimensionado
   * del contenedor (object-fit: cover).
   */
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
        // Linear interpolation between two ground profile points
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
        {heroStickers.map((sticker, index) => (
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

      <Button
        ref={ctaRef}
        type="button"
        className="landing-hero-cta"
        onClick={handleGetStartedClick}
      >
        Get started
      </Button>

      <div className="landing-hero-hill" ref={hillRef} aria-hidden>
        <img
          src={fieldImg}
          alt="Green fields and hills background"
          className="landing-hero-hill-img"
        />
      </div>
    </section>
  );
};
