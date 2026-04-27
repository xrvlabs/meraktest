import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const sentence = "Artful Spaces";
const letters = sentence.split("");

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 500]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.2]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-end justify-center bg-[#1a1a1a] pb-32">
      <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full">
        <img 
          src="/images/hero.png" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 transition-colors duration-500" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-3 md:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <motion.h1 
          variants={container}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight mb-4 flex flex-wrap justify-center overflow-hidden"
        >
          {letters.map((letter, index) => (
            <motion.span variants={child} key={index} className={letter === " " ? "w-4 md:w-8" : ""}>
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
          className="hidden sm:block text-lg md:text-xl text-gray-200 dark:text-gray-300 mb-8 max-w-xl mx-auto font-iceland uppercase tracking-[0.2em]"
        >
          Crafting luxury interiors with an artistic soul.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.2, type: "spring" }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <a href="#portfolio" className="hidden sm:block relative overflow-hidden group w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#d4af37] text-[#1a1a1a] dark:text-white font-iceland uppercase tracking-widest text-xl transition-colors">
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 h-full w-full bg-gray-100 dark:bg-[#b5952f] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </a>
          <a href="#contact" className="relative overflow-hidden group w-full sm:w-auto px-8 py-4 border border-white text-white font-iceland uppercase tracking-[0.2em] text-xl transition-colors">
            <span className="relative z-10">Book Consultation</span>
            <div className="absolute inset-0 h-full w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Book Consultation</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white/50 text-lg font-iceland font-bold tracking-[0.3em] mb-2 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/70" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
