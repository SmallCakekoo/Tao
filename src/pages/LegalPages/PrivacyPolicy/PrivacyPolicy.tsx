import { Navbar } from '../../../components/NavBar/LandingNavBar/Navbar';
import { Footer } from '../../../components/Footer/Footer';
import '../LegalPages.css';

export const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <Navbar />
      <main className="legal-content">
        <h1>Privacy Policy</h1>
        <p>Last updated: March 15, 2026</p>
        <section>
          <h2>1. Introduction</h2>
          <p>
            At Tao, we take your privacy seriously. This policy explains how we collect,
            use, and protect your personal data when you use our services.
          </p>
        </section>
        <section>
          <h2>2. Data Collection</h2>
          <p>
            We collect information you provide directly to us, such as when you create
            an account or log your mood and energy levels.
          </p>
        </section>
        <section>
          <h2>3. Data Usage</h2>
          <p>
            Your data is used solely to provide personalized insights and recommendations
            to help you manage your academic performance and well-being.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};
