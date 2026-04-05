import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IconChartBar,
  IconStar,
  IconAlarm,
  IconBook,
  IconShield,
  IconLeaf,
} from '@tabler/icons-react';
import yogaImg from '../../../assets/yoga.png';
import './FeaturesSection.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 'energy',
    title: 'Energy Tracking',
    description:
      'Visualize your emotional peaks and valleys to understand your productivity cycles.',
    icon: IconChartBar,
    color: 'var(--base-orange)',
    bgColor: 'var(--orange-100)',
  },
  {
    id: 'recommendations',
    title: 'Recommendations',
    description:
      "Personalized activities like 'Time to rest' based on your biological data.",
    icon: IconStar,
    color: 'var(--base-violet)',
    bgColor: 'var(--violet-100)',
  },
  {
    id: 'focus',
    title: 'Focus Tracker',
    description: 'Smart tracker that suggests breaks based on real energy levels.',
    icon: IconAlarm,
    color: 'var(--accent-yellow)',
    bgColor: '#fff9e6',
  },
  {
    id: 'confidence',
    title: 'Confidence Journal',
    description:
      'Reflection space to build academic self-efficacy and celebrate small wins.',
    icon: IconBook,
    color: 'var(--accent-yellow)',
    bgColor: '#fff9e6',
  },
  {
    id: 'burnout',
    title: 'Burnout Indicator',
    description:
      'Early warning system that alerts you when load exceeds recovery capacity.',
    icon: IconShield,
    color: 'var(--base-orange)',
    bgColor: 'var(--orange-100)',
  },
  {
    id: 'insights',
    title: 'Insights Dashboard',
    description:
      'Visual correlations between sleep, mood, workload, and academic performance.',
    icon: IconLeaf,
    color: 'var(--base-violet)',
    bgColor: 'var(--violet-100)',
  },
];

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.landing-features-header',
        { opacity: 0, y: 24 },
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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.05 * (i % 3),
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="landing-features" ref={sectionRef}>
      <div className="landing-features-container">
        <div className="landing-features-header">
          <div className="landing-features-text">
            <h2>Features for better growth.</h2>
            <p>
              A comprehensive toolkit designed to help you navigate the pressures of
              student life with zero friction.
            </p>
          </div>

          <div className="landing-features-character">
            <img src={yogaImg} alt="Yoga character" className="yoga-img" />
          </div>
        </div>

        <div className="landing-features-grid">
          {features.map(({ id, title, description, icon: Icon, color, bgColor }, i) => (
            <article
              key={id}
              className="landing-feature-card"
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
            >
              <div className="landing-feature-card-top">
                <div
                  className="landing-feature-card-icon"
                  style={{ backgroundColor: bgColor }}
                >
                  <Icon size={24} color={color} stroke={2} />
                </div>
                <h4>{title}</h4>
              </div>

              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
