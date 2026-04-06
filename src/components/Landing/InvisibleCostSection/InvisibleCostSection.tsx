import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedLine } from '../AnimatedLine/AnimatedLine';
import relaxPerson from '../../../assets/relax-person.png';
import './InvisibleCostSection.css';

gsap.registerPlugin(ScrollTrigger);

export const InvisibleCostSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const boxRef = useRef<HTMLDivElement>(null);
  const boxTextRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Invisible Cost animations
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // MoreThanGpa animations
      gsap.fromTo(
        boxRef.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: boxRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        boxTextRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: 0.2,
          scrollTrigger: {
            trigger: boxRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: 0.25,
          scrollTrigger: {
            trigger: boxRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="price" className="landing-invisible-cost" ref={sectionRef}>
      <AnimatedLine
        variant="first"
        triggerSelector=".landing-invisible-cost"
        className="bg-curve-invisible"
      />
      <AnimatedLine
        variant="second"
        triggerSelector=".landing-invisible-cost"
        className="bg-responsive-line-scnd"
      />

      <div className="landing-invisible-top">
        <h2 ref={headingRef}>
          The <span className="highlight-purple">invisible</span> cost of
          <br />
          academic excellence.
        </h2>
        <p ref={textRef}>
          Modern academic systems reward output, but ignore the
          <br />
          biological rhythms that sustain it.
        </p>
      </div>

      <div className="landing-more-than-gpa-box" ref={boxRef}>
        <div ref={boxTextRef}>
          <h2 className="landing-more-than-gpa-title">You are more than a GPA.</h2>
          <p className="landing-more-than-gpa-text">
            Tao was built by students, for students. We understand that
            <br />
            your mental state is the fuel for your learning. When your fuel
            <br />
            is low, your progress stalls.
          </p>
        </div>
        <img
          ref={imgRef}
          src={relaxPerson}
          alt="Person relaxing on boxes"
          className="landing-more-than-gpa-illus"
        />
      </div>
    </section>
  );
};
