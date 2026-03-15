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
  getGroundY?: (centerX: number) => number;
}

export const DraggableSticker = ({
  emotionSrc,
  size = 56,
  hasGravity = false,
  className = '',
  style,
  getGroundY,
}: {
  emotionSrc: string;
  size?: number;
  hasGravity?: boolean;
  className?: string;
  style?: CSSProperties;
  getGroundY?: (centerX: number) => number;
}) => {
  const elRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragRef = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  const getTargetY = useCallback(() => {
    const el = elRef.current;
    if (!el) return null;

    if (getGroundY) {
      const centerX = el.offsetLeft + posRef.current.x + size / 2;
      const groundYAbs = getGroundY(centerX);

      // groundYAbs is the actual Y coordinate inside the hero section
      // offsetTop is the base position of the sticker before translate
      return groundYAbs - el.offsetTop - size + 6;
    }

    const parent = el.parentElement;
    if (!parent) return null;

    const hillHeight = Math.max(150, parent.clientHeight * 0.25);
    const groundY = parent.clientHeight - hillHeight;

    return groundY - el.offsetTop - size + 20;
  }, [getGroundY, size]);

  const setPosition = useCallback((x: number, y: number) => {
    const el = elRef.current;
    if (!el) return;

    gsap.set(el, { x, y });
    posRef.current = { x, y };
  }, []);

  useEffect(() => {
    if (!hasGravity || !elRef.current) return;

    const targetY = getTargetY();
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
  }, [hasGravity, getTargetY]);

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
        const targetY = getTargetY();
        if (targetY == null) return;

        gsap.to(el, {
          x: posRef.current.x,
          y: targetY,
          duration: 1.2,
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
    [hasGravity, getTargetY]
  );

  return (
    <span
      ref={elRef}
      className={`draggable-sticker ${className}`}
      aria-hidden
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
        ...style,
      }}
    >
      <img src={emotionSrc} alt="" aria-hidden draggable={false} />
    </span>
  );
};