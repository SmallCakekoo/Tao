import { Navbar } from '../../components/NavBar/LandingNavBar/Navbar';
import { HeroSection } from '../../components/Landing/Hero/HeroSection';
import { InvisibleCostSection } from '../../components/Landing/InvisibleCostSection/InvisibleCostSection';
import { HowItWorksSection } from '../../components/Landing/HowItWorksSection/HowItWorksSection';
import { FeaturesSection } from '../../components/Landing/FeaturesSection/FeaturesSection';
import { WhyTaoSection } from '../../components/Landing/WhyTaoSection/WhyTaoSection';
import { FindAcademicSection } from '../../components/Landing/FindAcademicSection/FindAcademicSection';
import { Footer } from '../../components/Footer/Footer';
import { AnimatedLine } from '../../components/Landing/AnimatedLine/AnimatedLine';
import './Landing.css';

export const Landing = () => {
  return (
    <div className="landing">
      <main>
        <Navbar />
        <HeroSection />
        <InvisibleCostSection />
        <div className="landing-how-and-features">
          <div className="landing-bg-line-wrap">
            <AnimatedLine
              variant="second"
              triggerSelector=".landing-how-and-features"
              className="landing-bg-line"
            />
          </div>
          <HowItWorksSection />
          <FeaturesSection />
        </div>
        <WhyTaoSection />
        <FindAcademicSection />
      </main>
      <Footer />
    </div>
  );
};
