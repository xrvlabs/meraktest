import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import InstagramFeed from './sections/InstagramFeed';
import GoogleRating from './sections/GoogleRating';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  const [showRating, setShowRating] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] selection:bg-[#d4af37] selection:text-white transition-colors duration-500">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <InstagramFeed />
        <Contact onFormSubmit={() => setShowRating(true)} />
      </main>
      <Footer />
      
      {/* Rating Modal / Bottom Sheet */}
      <GoogleRating isOpen={showRating} onClose={() => setShowRating(false)} />
    </div>
  );
}

export default App;
