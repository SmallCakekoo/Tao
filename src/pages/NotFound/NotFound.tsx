import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './NotFound.css';

// Import stickers
import awful from '../../assets/stickers/awful.svg';
import bad from '../../assets/stickers/bad.svg';
import good from '../../assets/stickers/good.svg';
import great from '../../assets/stickers/great.svg';
import neutral from '../../assets/stickers/neutral.svg';

export const NotFound: React.FC = () => {
  const floating404Ref = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Entrada triunfal para el texto 404 con un ligero escalado y movimiento vertical.
    gsap.fromTo(
      floating404Ref.current,
      { y: 50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' }
    );

    // Entrance and floating loop for stickers from assets
    stickersRef.current.forEach((sticker, i) => {
      if (sticker) {
        gsap.fromTo(
          sticker,
          { scale: 0, opacity: 0, rotation: -30 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out(1.7)',
          }
        );

        // Bucle infinito de flotación aleatoria para que los stickers parezcan vivos.
        gsap.to(sticker, {
          y: 'random(-25, 25)',
          x: 'random(-20, 20)',
          rotation: 'random(-15, 15)',
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !floating404Ref.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Parallax text
      const xPercent = (clientX / innerWidth - 0.5) * 50;
      const yPercent = (clientY / innerHeight - 0.5) * 50;

      // Efecto de paralaje: el texto 404 se mueve ligeramente siguiendo el ratón.
      gsap.to(floating404Ref.current, {
        x: xPercent,
        y: yPercent,
        duration: 1,
        ease: 'power2.out',
      });

      // Stickers reaction
      stickersRef.current.forEach((sticker) => {
        if (sticker) {
          const rect = sticker.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const distance = Math.hypot(clientX - centerX, clientY - centerY);
          const influenceRange = 250;

          if (distance < influenceRange) {
            // Calculamos el ángulo para "empujar" el sticker lejos del cursor.
            const angle = Math.atan2(clientY - centerY, clientX - centerX);
            const moveX = Math.cos(angle) * (1 - distance / influenceRange) * -40;
            const moveY = Math.sin(angle) * (1 - distance / influenceRange) * -40;

            gsap.to(sticker, {
              x: `+=${moveX * 0.15}`,
              y: `+=${moveY * 0.15}`,
              overwrite: 'auto',
              duration: 0.6,
            });
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stickers = [
    { src: awful, className: 'sticker-1' },
    { src: bad, className: 'sticker-2' },
    { src: good, className: 'sticker-3' },
    { src: great, className: 'sticker-4' },
    { src: neutral, className: 'sticker-5' },
  ];

  return (
    <div className="not-found-container" ref={containerRef}>
      {stickers.map((s, i) => (
        <div
          key={i}
          className={`sticker ${s.className}`}
          ref={(el) => {
            stickersRef.current[i] = el;
          }}
        >
          <img src={s.src} alt="sticker" className="sticker-img" draggable="false" />
        </div>
      ))}

      <h1 className="floating-404" ref={floating404Ref}>
        404
      </h1>

      <div className="not-found-content">
        <h2 className="not-found-title">Oops! You're lost</h2>
        <p className="not-found-text">
          Don't worry, even the best travelers lose their way sometimes.
        </p>

        <Link to="/" className="back-home-button">
          <button>Take me home</button>
        </Link>
      </div>
    </div>
  );
};
