import { Navbar } from '../../../components/NavBar/LandingNavBar/Navbar';
import { Footer } from '../../../components/Footer/Footer';
import '../LegalPages.css';

export const Terms = () => {
  return (
    <div className="legal-page">
      <Navbar />
      <main className="legal-content">
        <h1>Terms of Service</h1>
        <p>Last updated: March 15, 2026</p>
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Tao, you agree to be bound by these Terms of Service and
            all applicable laws and regulations.
          </p>
        </section>
        <section>
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily use the Tao platform for personal,
            non-commercial academic purposes.
          </p>
        </section>
        <section>
          <h2>3. Disclaimer</h2>
          <p>
            The materials on Tao are provided "as is". Tao makes no warranties, expressed
            or implied, and hereby disclaims all other warranties.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};
