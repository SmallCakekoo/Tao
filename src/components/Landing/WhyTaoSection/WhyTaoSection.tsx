import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/all';
import { IconCircleCheck } from '@tabler/icons-react';
import './WhyTaoSection.css';

gsap.registerPlugin(ScrollTrigger, Draggable);

const comparison = [
  { label: 'METRIC', tao: 'Wellness', traditional: 'Tasks' },
  { label: 'APPROACH', tao: 'Proactive', traditional: 'Reactive' },
  { label: 'DATA', tao: 'Energy', traditional: 'Deadlines' },
  { label: 'GOAL', tao: 'Sustainable', traditional: 'Short-term' },
  { label: 'FOCUS', tao: 'Deepwork', traditional: 'Multitasking' },
];

export const WhyTaoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for the entrance of components
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Row reordering logic using Draggable
      const rowElements = Array.from(
        document.querySelectorAll('.comparison-row')
      ) as HTMLDivElement[];
      if (rowElements.length === 0) return;
      const rowHeight = rowElements[0].offsetHeight;

      rowElements.forEach((el, i) => {
        Draggable.create(el, {
          type: 'y',
          bounds: '.comparison-table',
          edgeResistance: 0.8,
          onPress: function () {
            gsap.to(this.target, {
              scale: 1.04,
              backgroundColor: '#ffffff',
              boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
              zIndex: 100,
            });
          },
          onDrag: function () {
            const dragY = this.y;
            const currentIndex = i;
            const targetIndex = Math.round(dragY / (rowHeight + 4)) + currentIndex; // factor in margin

            if (
              targetIndex !== currentIndex &&
              targetIndex >= 0 &&
              targetIndex < rowElements.length
            ) {
              const diff = targetIndex - currentIndex;
              // Push other rows
              rowElements.forEach((other, j) => {
                if (other === this.target) return;

                let yOffset = 0;
                if (diff > 0 && j > currentIndex && j <= targetIndex) {
                  yOffset = -(rowHeight + 4);
                } else if (diff < 0 && j < currentIndex && j >= targetIndex) {
                  yOffset = rowHeight + 4;
                }

                gsap.to(other, { y: yOffset, duration: 0.3, ease: 'power2.out' });
              });
            }
          },
          onRelease: function () {
            gsap.to(this.target, {
              scale: 1,
              backgroundColor: '#ffffff',
              boxShadow: 'none',
              zIndex: 1,
            });
            gsap.to(rowElements, { y: 0, duration: 0.4, ease: 'power2.inOut' });
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="landing-why" ref={sectionRef}>
      <div className="landing-why-inner">
        <div className="landing-why-left" ref={leftRef}>
          <h2>Why tao?</h2>
          <p className="landing-why-subtitle">
            Most productivity apps focus solely on output. Tao focuses on the human engine
            behind the output. Zero guilt, zero friction.
          </p>
          <ul className="landing-why-list">
            <li>
              <IconCircleCheck size={22} className="check-icon" />
              Holistic tracking of energy and burnout
            </li>
            <li>
              <IconCircleCheck size={22} className="check-icon" />
              Personalized wellness interventions
            </li>
            <li>
              <IconCircleCheck size={22} className="check-icon" />
              Privacy-first, student-focused design
            </li>
            <li>
              <IconCircleCheck size={22} className="check-icon" />
              Integrated academic load analysis
            </li>
          </ul>
        </div>
        <div className="landing-why-right" ref={tableRef}>
          <div className="comparison-card">
            <div className="comparison-header">
              <h4 className="comparison-title">Tao vs. Traditional</h4>
              <p className="comparison-hint">Try dragging the items!</p>
            </div>
            <div className="comparison-table">
              {comparison.map((row) => (
                <div key={row.label} className="comparison-row">
                  <span className="row-label">{row.label}</span>
                  <span className="cell-tao">{row.tao}</span>
                  <span className="cell-trad">{row.traditional}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
