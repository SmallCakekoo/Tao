import { Navbar } from '../../../components/NavBar/LandingNavBar/Navbar';
import { Footer } from '../../../components/Footer/Footer';
import '../LegalPages.css';

export const Legal = () => {
  return (
    <div className="legal-page">
      <Navbar />
      <main className="legal-content">
        <h1>Legal Notice</h1>
        <p>Last updated: March 15, 2026</p>
        <section>
          <h2>General Information</h2>
          <p>
            Tao is a platform designed to help people optimize their academic/professional
            performance through improved mental health and energy management.
          </p>
        </section>
        <section>
          <h2>Intellectual Property</h2>
          <p>
            All content, including text, graphics, logos, and software, is the property of
            Tao Labs Inc. and is protected by international copyright laws.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};
