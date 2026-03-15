import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AnimatedLine.css';

gsap.registerPlugin(ScrollTrigger);

const firstPath =
  'M1959 12.0004C1959 12.0004 1850.61 102 1677.5 306.5C1504.4 511 1434 879.5 1581 947.5C1728 1015.5 1795 877 1795 820C1795 763 1736.5 685.5 1607.5 685.5C1478.5 685.5 1161.9 902.5 953.503 1018C700.003 1158.5 369.003 1412 16.0029 1319';
const secondPath =
  'M1456 1220C1456 1080 1289.35 980 1054 991C818.651 1002 787.739 1120 825.739 1180C863.739 1240 982.978 1270 1066.24 1180C1149.5 1080 935.501 990.5 824.501 924.001C713.501 857.501 564.501 746.501 497.501 687.001C443.854 639.359 357.501 567 270.501 441.001C183.501 315.001 178.501 113.001 290.001 57.5007C401.501 2.00073 461.001 133.001 435.001 193.501C383.203 314.03 241.001 260.001 126.501 136.001C88.9449 95.3289 45.3341 14.6674 16.0007 12.0007';

export interface AnimatedLineProps {
  variant?: 'first' | 'second';
  className?: string;
  triggerSelector?: string;
}

export const AnimatedLine = ({
  variant = 'first',
  className = '',
  triggerSelector,
}: {
  variant?: 'first' | 'second';
  className?: string;
  triggerSelector?: string;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const trigger = triggerSelector ? document.querySelector(triggerSelector) : document.body;
    if (!path || !trigger) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'none',
    });

    const st = ScrollTrigger.create({
      trigger,
      start: variant === 'first' ? 'top bottom' : 'top 75%',
      end: variant === 'first' ? 'bottom top' : 'center 30%',
      scrub: variant === 'first' ? 1.2 : 0.6,
      animation: tween,
    });

    return () => {
      st.kill();
      tween.kill();
    };
  }, [variant, triggerSelector]);

  const viewBox = variant === 'first' ? '0 0 1975 1360' : '0 0 1472 1292';
  const d = variant === 'first' ? firstPath : secondPath;
  const wrapperClass = variant === 'second' ? `animated-line-how ${className}` : `animated-line ${className}`;

  return (
    <div className={wrapperClass.trim()} ref={svgRef} aria-hidden>
      <svg
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio={variant === 'second' ? 'xMidYMin slice' : 'xMinYMin slice'}
        style={{ width: '100%', height: '100%' }}
      >
        <g opacity="0.35" style={{ filter: 'drop-shadow(0 4px 2px rgba(0,0,0,0.1))' }}>
          <path
            ref={pathRef}
            d={d}
            stroke="#668DFF"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};
