import './AnimatedLine.css';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export const AnimatedLine = () => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    path.style.strokeDasharray = length.toString();
    path.style.strokeDashoffset = length.toString();

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className="line-contain">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1172"
        height="352"
        viewBox="0 0 1172 352"
        fill="none"
      >
        <path
          ref={pathRef}
          opacity="0.1"
          d="M12.0007 15.4949C151.334 121.434 493.601 309.869 748.001 216.099C1066 98.888 644.501 -287.718 544.001 108.111C463.601 424.774 924.501 349.708 1165 272.591"
          stroke="#668DFF"
          strokeWidth="24"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
