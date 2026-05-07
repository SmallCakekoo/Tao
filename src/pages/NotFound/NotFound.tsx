import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './NotFound.css';

// Import stickers
import { NOT_FOUND_STICKERS } from '../../data/stickers';

export const NotFound: React.FC = () => {
  const floating404Ref = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Entrance for the 404 text with slight scaling and vertical movement.
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

        // Infinite random floating loop to make stickers feel alive.
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

      // Parallax effect: the 404 text moves slightly following the mouse.
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
            // Calculate the angle to "push" the sticker away from the cursor.
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



  return (
    <div className="not-found-container" ref={containerRef}>
      {NOT_FOUND_STICKERS.map((s, i) => (
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
