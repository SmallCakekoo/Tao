import { useRef, useCallback, useState, useEffect } from 'react';
import gsap from 'gsap';
import type { CSSProperties, PointerEvent } from 'react';
import './DraggableSticker.css';

export interface DraggableStickerProps {
  emotionSrc: string;
  size?: number;
  hasGravity?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const DraggableSticker = ({
  emotionSrc,
  size = 56,
  hasGravity = false,
  className = '',
  style,
}: DraggableStickerProps) => {
  const elRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  const getGroundY = useCallback(() => {
    const el = elRef.current;
    const parent = el?.parentElement;
    if (!el || !parent) return null;

    const hillHeight = Math.max(150, parent.clientHeight * 0.25);
    const groundY = parent.clientHeight - hillHeight;
    const elTop = el.offsetTop;

    return groundY - elTop - size + 20;
  }, [size]);

  const setPosition = useCallback((x: number, y: number) => {
    const el = elRef.current;
    if (!el) return;

    gsap.set(el, { x, y });
    posRef.current = { x, y };
  }, []);

  useEffect(() => {
    if (!hasGravity || !elRef.current) return;

    const targetY = getGroundY();
    if (targetY == null) return;

    gsap.fromTo(
      elRef.current,
      { scale: 0, rotation: -180, y: targetY - 400 },
      {
        scale: 1,
        rotation: 0,
        y: targetY,
        duration: 2,
        ease: 'bounce.out',
        delay: Math.random() * 0.4 + 0.4,
      }
    );

    posRef.current = { x: 0, y: targetY };
  }, [hasGravity, getGroundY]);

  const handlePointerDown = useCallback((e: PointerEvent<HTMLSpanElement>) => {
    const el = elRef.current;
    if (!el) return;

    e.preventDefault();

    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: posRef.current.x,
      originY: posRef.current.y,
    };

    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLSpanElement>) => {
      if (!dragRef.current.isDragging) return;

      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      setPosition(dragRef.current.originX + dx, dragRef.current.originY + dy);
    },
    [setPosition]
  );



  const handlePointerUp = useCallback(
    (e: PointerEvent<HTMLSpanElement>) => {
      const el = elRef.current;
      if (!el) return;

      if (el.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
      }

      if (!dragRef.current.isDragging) return;

      dragRef.current.isDragging = false;
      setIsDragging(false);

      if (hasGravity) {
        let targetY = getGroundY();
        if (targetY == null) return;

        if (targetY < posRef.current.y) {
          targetY = posRef.current.y;
        }

        gsap.to(el, {
          x: posRef.current.x,
          y: targetY,
          duration: 1.5,
          ease: 'bounce.out',
        });

        posRef.current = { x: posRef.current.x, y: targetY };
        return;
      }

      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });

      posRef.current = { x: 0, y: 0 };
    },
    [hasGravity, getGroundY]
  );

  return (
    <span
      ref={elRef}
      className={`draggable-sticker ${className}`}
      aria-hidden
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        cursor: isDragging ? 'grabbing' : 'grab',
        ...style,
      }}
    >
      <img src={emotionSrc} alt="" aria-hidden />
    </span>
  );
};