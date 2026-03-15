import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../../Button/Button';
import meditationImg from '../../../assets/meditation.png';
import awfulIcon from '../../../assets/stickers/awful.svg';
import badIcon from '../../../assets/stickers/bad.svg';
import goodIcon from '../../../assets/stickers/good.svg';
import greatIcon from '../../../assets/stickers/great.svg';
import neutralIcon from '../../../assets/stickers/neutral.svg';
import './FindAcademicSection.css';

gsap.registerPlugin(ScrollTrigger);

const stickerIcons = [awfulIcon, badIcon, goodIcon, greatIcon, neutralIcon, greatIcon, goodIcon, neutralIcon, badIcon, awfulIcon];
const stickerSizes = Array(35).fill(74);

const stickers = stickerSizes.map((size, i) => ({
  id: i,
  src: stickerIcons[i % stickerIcons.length],
  size,
}));

const gravity = 1600;
const bounce = 0.3;
const friction = 0.8;

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  dragging: boolean;
  dragOffX: number;
  dragOffY: number;
  prevX: number;
  prevY: number;
}

export const FindAcademicSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);

  const stickerElsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const bodiesRef = useRef<Body[]>([]);
  const rafRef = useRef<number>(0);
  const lastTRef = useRef<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const loop = useCallback((now: number) => {
    const arena = arenaRef.current;
    if (!arena) return;

    const dt = Math.min((now - lastTRef.current) / 1000, 0.05);
    lastTRef.current = now;

    const W = arena.clientWidth;
    const H = arena.clientHeight;
    const bodies = bodiesRef.current;

    for (const body of bodies) {
      body.prevX = body.x;
      body.prevY = body.y;
    }

    for (const body of bodies) {
      if (body.dragging) continue;
      body.vy += gravity * dt;
      body.x += body.vx * dt;
      body.y += body.vy * dt;
    }

    for (const body of bodies) {
      if (body.dragging) continue;

      if (body.y + body.r > H) {
        body.y = H - body.r;
        body.vy = -Math.abs(body.vy) * bounce;
        body.vx *= friction;

        if (Math.abs(body.vy) < 15) body.vy = 0;
        if (Math.abs(body.vx) < 5) body.vx = 0;
      }

      if (body.x - body.r < 0) {
        body.x = body.r;
        body.vx = Math.abs(body.vx) * bounce;
      }

      if (body.x + body.r > W) {
        body.x = W - body.r;
        body.vx = -Math.abs(body.vx) * bounce;
      }

      if (body.y - body.r < 0) {
        body.y = body.r;
        body.vy = Math.abs(body.vy) * bounce;
      }
    }

    for (let iter = 0; iter < 5; iter++) {
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i];
          const b = bodies[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const min = a.r + b.r;

          if (d >= min) continue;

          const nx = dx / d;
          const ny = dy / d;
          const overlap = (min - d) * 0.52;

          if (!a.dragging) {
            a.x -= nx * overlap;
            a.y -= ny * overlap;
          }

          if (!b.dragging) {
            b.x += nx * overlap;
            b.y += ny * overlap;
          }

          const relVx = b.vx - a.vx;
          const relVy = b.vy - a.vy;
          const dot = relVx * nx + relVy * ny;

          if (dot >= 0) continue;

          const impulse = dot * 0.75;

          if (!a.dragging) {
            a.vx += impulse * nx;
            a.vy += impulse * ny;
          }

          if (!b.dragging) {
            b.vx -= impulse * nx;
            b.vy -= impulse * ny;
          }
        }
      }
    }

    for (let i = 0; i < bodies.length; i++) {
      const el = stickerElsRef.current[i];
      const body = bodies[i];
      if (!el) continue;

      el.style.transform = `translate(${body.x - body.r}px, ${body.y - body.r}px)`;
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    const W = arena.clientWidth || window.innerWidth;
    const bodies: Body[] = stickers.map((sticker) => {
      const r = sticker.size / 2;

      return {
        x: r + Math.random() * Math.max(0, W - sticker.size),
        y: -r - Math.random() * 500,
        vx: (Math.random() - 0.5) * 80,
        vy: Math.random() * 50,
        r,
        dragging: false,
        dragOffX: 0,
        dragOffY: 0,
        prevX: 0,
        prevY: 0,
      };
    });

    bodiesRef.current = bodies;
    lastTRef.current = performance.now();
    rafRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafRef.current);
  }, [loop]);

  const handlePointerDown = useCallback((index: number, e: React.PointerEvent<HTMLSpanElement>) => {
    const body = bodiesRef.current[index];
    const arena = arenaRef.current;
    const el = stickerElsRef.current[index];

    if (!body || !arena || !el) return;

    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);

    const rect = arena.getBoundingClientRect();
    body.dragging = true;
    body.dragOffX = e.clientX - rect.left - body.x;
    body.dragOffY = e.clientY - rect.top - body.y;
    body.vx = 0;
    body.vy = 0;

    el.style.zIndex = '50';
  }, []);

  const handlePointerMove = useCallback((index: number, e: React.PointerEvent<HTMLSpanElement>) => {
    const body = bodiesRef.current[index];
    const arena = arenaRef.current;

    if (!body || !arena || !body.dragging) return;

    const rect = arena.getBoundingClientRect();
    body.x = e.clientX - rect.left - body.dragOffX;
    body.y = e.clientY - rect.top - body.dragOffY;
  }, []);

  const handlePointerUp = useCallback((index: number, e: React.PointerEvent<HTMLSpanElement>) => {
    const body = bodiesRef.current[index];
    const el = stickerElsRef.current[index];

    if (!body) return;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    body.vx = ((body.x - body.prevX) / 0.016) * 0.6;
    body.vy = ((body.y - body.prevY) / 0.016) * 0.6;
    body.dragging = false;

    if (el) el.style.zIndex = '';
  }, []);

  return (
    <section className="find-academic-section" ref={sectionRef}>
      <div className="find-academic-cta">
        <h2 ref={headingRef}>Find your academic rhythm.</h2>
        <p>Be part of the students building a healthier way to succeed.</p>
        <Button ref={ctaRef} type="button">
          Start Now
        </Button>
      </div>

      <div className="find-academic-arena" ref={arenaRef}>
        <div className="find-academic-character">
          <img src={meditationImg} alt="Person meditating" />
        </div>

        {stickers.map((sticker, i) => (
          <span
            key={sticker.id}
            ref={(el) => {
              stickerElsRef.current[i] = el;
            }}
            aria-hidden
            className="find-academic-sticker"
            style={{ width: sticker.size, height: sticker.size, touchAction: 'none' }}
            onPointerDown={(e) => handlePointerDown(i, e)}
            onPointerMove={(e) => handlePointerMove(i, e)}
            onPointerUp={(e) => handlePointerUp(i, e)}
            onPointerCancel={(e) => handlePointerUp(i, e)}
          >
            <img src={sticker.src} alt="" draggable={false} />
          </span>
        ))}
      </div>
    </section>
  );
};