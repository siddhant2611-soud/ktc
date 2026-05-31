import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Tracking } from './components/Tracking';
import { Services } from './components/Services';
import { Fleet } from './components/Fleet';
import { TruckOwner } from './components/TruckOwner';
import { WhyChooseUs } from './components/WhyChooseUs';
import { About } from './components/About';
import { Process } from './components/Process';
import { Achievements } from './components/Achievements';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { MyBookings } from './components/MyBookings';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ChatWidget } from './components/ChatWidget';
import { AdminPortal } from './components/AdminPortal'; // We will create this

function Home() {
  return (
    <div className="bg-ktc-bg-primary min-h-screen text-ktc-text font-sans selection:bg-ktc-accent-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Tracking />
        <Services />
        <Fleet />
        <TruckOwner />
        <WhyChooseUs />
        <About />
        <Process />
        <Achievements />
        <Testimonials />
        <FAQ />
        <CTA />
        <MyBookings />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppFloat />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminPortal />} />
      </Routes>
    </Router>
  );
}


