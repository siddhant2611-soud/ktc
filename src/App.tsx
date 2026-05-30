import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Services } from './components/Services';
import { Fleet } from './components/Fleet';
import { WhyChooseUs } from './components/WhyChooseUs';
import { About } from './components/About';
import { Process } from './components/Process';
import { Achievements } from './components/Achievements';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="bg-ktc-bg-primary min-h-screen text-ktc-text font-sans selection:bg-ktc-accent-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Fleet />
        <WhyChooseUs />
        <About />
        <Process />
        <Achievements />
        <Testimonials />
        <Gallery />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

