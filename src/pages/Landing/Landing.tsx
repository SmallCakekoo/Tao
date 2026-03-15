import React from 'react';
import { Navbar } from '../../components/NavBar/LandingNavBar/Navbar';
import { HeroSection } from '../../components/Landing/Hero/HeroSection';
import { InvisibleCostSection } from '../../components/Landing/InvisibleCostSection/InvisibleCostSection';
import { HowItWorksSection } from '../../components/Landing/HowItWorksSection/HowItWorksSection';
import './Landing.css';

export const Landing = (): React.ReactElement => {
  return (
    <div className="landing">
      <main>
        <Navbar />
        <HeroSection /> {/* TODO: Ajustar */}
        <InvisibleCostSection />
        <HowItWorksSection />
      </main>
    </div>
  );
};
