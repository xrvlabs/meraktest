import { useState, useEffect, useContext, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  return (
    <nav ref={navRef} className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-white dark:bg-[#0a0a0a] shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className={`flex items-center group transition-colors ${isScrolled || isMobileMenuOpen ? 'text-[#1a1a1a] dark:text-white' : 'text-white'}`}>
          <img src="/images/maakarni.png" alt="MaaKarni Logo" className="h-14 md:h-20 w-auto mr-3 object-contain transition-transform duration-500 group-hover:scale-110" />
          <div className="flex flex-col">
            <span className="font-serif text-lg md:text-xl font-bold tracking-[0.1em] leading-none uppercase">MAA KARNI</span>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-current to-transparent mt-1 mb-1.5 opacity-30" />
            <div className="flex justify-between w-full px-[0.5px] opacity-70">
              {"INTERIOR DESIGNS".split("").map((char, i) => (
                <span key={i} className="text-[6px] uppercase font-bold leading-none">{char === " " ? "\u00A0" : char}</span>
              ))}
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 relative z-20">
          {navLinks.map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ y: -2 }}
              className={`text-lg font-iceland uppercase tracking-widest transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'text-[#1a1a1a]/80 dark:text-white/80 hover:text-[#d4af37] dark:hover:text-[#d4af37]' : 'text-white/90 hover:text-white'}`}
            >
              {link}
            </motion.a>
          ))}

          <button
            onClick={() => {
              console.log('Toggle Theme Clicked');
              toggleTheme();
            }}
            className={`p-2 rounded-full transition-all duration-300 relative z-30 ${isScrolled || isMobileMenuOpen ? 'text-[#1a1a1a] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/20'}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        <div className="hidden md:block relative z-20">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-6 py-3 bg-[#d4af37] text-white font-iceland uppercase tracking-widest text-lg hover:bg-[#b5952f] transition-colors duration-300 shadow-lg hover:shadow-xl dark:shadow-none inline-block"
          >
            Book Consultation
          </motion.a>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center space-x-4 relative z-20">
          <button
            onClick={toggleTheme}
            className={isScrolled || isMobileMenuOpen ? 'text-[#1a1a1a] dark:text-white' : 'text-white'}
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className={isScrolled || isMobileMenuOpen ? 'text-[#1a1a1a] dark:text-white' : 'text-white'} /> : <Menu className={isScrolled || isMobileMenuOpen ? 'text-[#1a1a1a] dark:text-white' : 'text-white'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#fafafa] dark:bg-[#0a0a0a] absolute top-full w-full left-0 border-t border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-[#1a1a1a] dark:text-white font-iceland uppercase tracking-widest text-lg">
                  {link}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="inline-block mt-4 text-center px-6 py-3 bg-[#d4af37] text-white font-iceland uppercase tracking-widest text-xl">
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
