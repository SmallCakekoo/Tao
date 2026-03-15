import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cursorImg from '../../../assets/cursor.png';
import './HowItWorksSection.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Daily Check',
    description:
      'Small reflections on your mood and energy levels. Tao learns your unique rhythms.',
    type: 'check'
  },
  {
    num: '02',
    title: 'Sync Load',
    description:
      'Share your schedule, ideas, and tasks. Tao will act according to your workload',
    type: 'sync'
  },
  {
    num: '03',
    title: 'Balance',
    description:
      'Small reflections on your mood and energy levels. Tao learns your unique rhythms.',
    type: 'balance'
  },
];

export const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.15 * i,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleCardMouseEnter = (type: string, el: HTMLElement) => {
    if (type === 'check') {
      const cursor = el.querySelector('.cursor-mock');
      const dots = el.querySelectorAll('.dot');
      const bars = el.querySelectorAll('.bar-small');

      gsap.to(cursor, { x: -30, y: -15, duration: 0.4, ease: 'power2.out' });
      gsap.to(dots, { scale: 1.1, stagger: 0.05, duration: 0.3 });
      gsap.to(bars, { opacity: 0.7, x: 5, stagger: 0.05, duration: 0.4 });
    }

    if (type === 'sync') {
      const path = el.querySelector('.chart-svg path');
      const circles = el.querySelectorAll('.chart-svg circle');
      if (path instanceof SVGPathElement) {
        const length = path.getTotalLength();
        gsap.fromTo(path,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' }
        );
      }
      gsap.fromTo(circles,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(2)', delay: 0.3 }
      );
    }

    if (type === 'balance') {
      const stickies = el.querySelectorAll('.sticky');
      const notebook = el.querySelector('.balance-notebook');

      gsap.to(notebook, { scale: 1.05, rotation: 1, duration: 0.4 });
      gsap.to(stickies, {
        y: -8,
        rotation: (i) => (i === 0 ? -12 : 12),
        stagger: 0.1,
        duration: 0.4,
        ease: 'back.out(2)'
      });
    }
  };

  const handleCardMouseLeave = (type: string, el: HTMLElement) => {
    if (type === 'check') {
      const cursor = el.querySelector('.cursor-mock');
      const dots = el.querySelectorAll('.dot');
      const bars = el.querySelectorAll('.bar-small');

      gsap.to(cursor, { x: 0, y: 0, duration: 0.6, ease: 'power2.inOut' });
      gsap.to(dots, { scale: 1, stagger: 0.02, duration: 0.4, ease: 'power2.inOut' });
      gsap.to(bars, { opacity: 1, x: 0, stagger: 0.02, duration: 0.5, ease: 'power2.inOut' });
    }

    if (type === 'sync') {
      const circles = el.querySelectorAll('.chart-svg circle');
      gsap.to(circles, {
        scale: 1,
        opacity: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.inOut'
      });
    }

    if (type === 'balance') {
      const stickies = el.querySelectorAll('.sticky');
      const notebook = el.querySelector('.balance-notebook');

      gsap.to(notebook, { scale: 1, rotation: 0, duration: 0.6, ease: 'power2.inOut' });
      gsap.to(stickies, {
        y: 0,
        rotation: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }
  };


  return (
    <section id="how-it-works" className="landing-how" ref={sectionRef}>
      <h2 ref={headingRef} className="landing-how-title">How it works.</h2>
      <p className="landing-how-sub" ref={subRef}>
        A minimalist framework designed to optimize your performance without compromising your health.
      </p>
      <div className="landing-how-cards">
        {steps.map((step, i) => (
          <article
            key={step.num}
            className="landing-how-card"
            ref={(el) => { cardsRef.current[i] = el; }}
            onMouseEnter={(e) => handleCardMouseEnter(step.type, e.currentTarget)}
            onMouseLeave={(e) => handleCardMouseLeave(step.type, e.currentTarget)}
          >
            <div className="landing-how-card-content">
              <h3>
                <span className="landing-how-card-num">{step.num}.</span> {step.title}
              </h3>
              <p>{step.description}</p>
            </div>

            <div className={`landing-how-illustration-box type-${step.type}`}>
              {step.type === 'check' && (
                <div className="illustration-check">
                  <div className="check-bars-top">
                    <span className="bar-small active"></span>
                    <span className="bar-small active"></span>
                    <span className="bar-small active"></span>
                    <span className="bar-small"></span>
                    <span className="bar-small"></span>
                  </div>
                  <div className="check-placeholders">
                    <div className="placeholder-long thick"></div>
                    <div className="placeholder-long thin"></div>
                  </div>
                  <div className="check-dots">
                    <span className="dot d1"></span>
                    <span className="dot d2"></span>
                    <span className="dot d3"></span>
                    <span className="dot d4"></span>
                    <span className="dot d5"></span>
                  </div>
                  <div className="check-line-bottom"></div>
                  <img src={cursorImg} className="cursor-mock" alt="cursor" />
                </div>
              )}
              {step.type === 'sync' && (
                <div className="illustration-sync">
                  <div className="sync-header">
                    <div className="header-left">
                      <div className="header-rect"></div>
                      <div className="header-line"></div>
                    </div>
                    <div className="header-right">
                      <span></span><span></span>
                    </div>
                  </div>
                  <div className="sync-chart-area">
                    <div className="chart-axes"></div>
                    <svg viewBox="0 0 200 120" className="chart-svg">
                      <path d="M30,60 L60,95 L90,65 L125,100 L155,40 L185,105" fill="none" stroke="#ADC2FF" strokeWidth="2.5" />
                      <circle cx="30" cy="60" r="5" fill="#FFEB95" />
                      <circle cx="60" cy="95" r="5" fill="#ADC2FF" />
                      <circle cx="90" cy="65" r="5" fill="#E5E7F5" />
                      <circle cx="125" cy="100" r="5" fill="#ADC2FF" />
                      <circle cx="155" cy="40" r="5" fill="#FFD444" />
                      <circle cx="185" cy="105" r="5" fill="#6E8FFF" />
                    </svg>
                  </div>
                  <div className="sync-footer">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                </div>
              )}
              {step.type === 'balance' && (
                <div className="illustration-balance">
                  <div className="balance-notebook">
                    <div className="notebook-left">
                      <div className="nb-rect"></div>
                      <div className="nb-lines">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                    <div className="notebook-right">
                      <div className="nb-lines-full">
                        <span></span><span></span><span></span><span></span>
                      </div>
                      <div className="nb-stickies">
                        <span className="sticky orange"></span>
                        <span className="sticky purple"></span>
                      </div>
                    </div>
                    <div className="notebook-spine">
                      <span></span><span></span><span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
