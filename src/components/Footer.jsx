import { Instagram, Facebook, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.5, y: y * 0.5 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] dark:bg-[#000000] text-white pt-8 pb-4 md:pt-10 md:pb-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 mb-6 md:mb-8">
        <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start w-fit leading-none mb-4"
          >
            <img src="/images/maakarni.png" alt="MaaKarni Logo" className="h-24 w-auto -mb-[9px] md:mb-4 -ml-[144px] md:ml-12 object-contain" />
            <h2 className="font-serif text-2xl font-bold tracking-[0.1em] leading-none">MAA KARNI</h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-1.5 mb-2 opacity-50" />
            <div className="flex justify-between w-full px-[0.5px] text-[#d4af37]">
              {"INTERIOR DESIGNS".split("").map((char, i) => (
                <span key={i} className="text-[7px] uppercase font-bold leading-none">{char === " " ? "\u00A0" : char}</span>
              ))}
            </div>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 mb-6 max-w-sm font-iceland text-lg md:text-xl tracking-wide uppercase"
          >
            CRAFTING ARTFUL SPACES
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex space-x-4"
          >
            {[
              { icon: <Instagram size={18} />, key: 'ig' },
              { icon: <Facebook size={18} />, key: 'fb' },
              { icon: <Twitter size={18} />, key: 'tw' },
              { icon: <Linkedin size={18} />, key: 'li' }
            ].map((item) => (
              <Magnetic key={item.key}>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full border border-gray-700 dark:border-gray-800 flex items-center justify-center hover:bg-[#d4af37] hover:border-[#d4af37] transition-colors"
                >
                  {item.icon}
                </motion.a>
              </Magnetic>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="hidden md:block"
        >
          <h3 className="text-xl font-iceland font-bold mb-3 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-1.5 font-iceland uppercase tracking-wider text-base">
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-[#d4af37] transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="hidden md:block"
        >
          <h3 className="text-xl font-iceland font-bold mb-3 uppercase tracking-wider">Contact Us</h3>
          <ul className="space-y-2 font-iceland uppercase tracking-wider text-base">
            <li className="flex items-start group">
              <MapPin className="text-[#d4af37] mr-3 mt-1 group-hover:scale-110 transition-transform flex-shrink-0" size={20} />
              <span className="text-gray-400 group-hover:text-white transition-colors cursor-pointer">123 Luxury Avenue, Design District, Metropolis 10001</span>
            </li>
            <li className="flex items-center group">
              <Phone className="text-[#d4af37] mr-3 group-hover:scale-110 transition-transform flex-shrink-0" size={20} />
              <span className="text-gray-400 group-hover:text-white transition-colors cursor-pointer">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center group">
              <Mail className="text-[#d4af37] mr-3 group-hover:scale-110 transition-transform flex-shrink-0" size={20} />
              <span className="text-gray-400 group-hover:text-white transition-colors cursor-pointer">hello@maakarni.com</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 border-t border-gray-800 dark:border-gray-900 pt-6 flex flex-col justify-center items-center text-sm text-gray-500">
        <div className="flex flex-col items-center space-y-1 font-iceland uppercase tracking-wider text-center">
          <p className="text-base md:text-lg">&copy; 2026 MaaKarni Interior Designs</p>
          <p className="text-base md:text-lg">Made with <span className="text-[#d4af37]">&hearts;</span> by GridLabs Prod.</p>
        </div>
      </div>
    </footer>
  );
}
