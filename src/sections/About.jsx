import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { value: "150+", label: "Projects Completed" },
  { value: "12", label: "Years Experience" },
  { value: "98%", label: "Happy Clients" },
  { value: "25", label: "Design Awards" },
];

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const imgY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" ref={ref} className="relative py-12 md:py-24 bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#d4af37] font-iceland font-bold tracking-[0.3em] uppercase mb-2 text-lg"
          >
            Our Story
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-iceland text-4xl md:text-6xl font-bold text-[#1a1a1a] dark:text-white mb-2 md:mb-6 transition-colors duration-500 uppercase tracking-wide"
          >
            Art of Living
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div 
            style={{ y: mobile ? 0 : imgY }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="relative h-[400px] md:h-[600px] w-full"
          >
            <img 
              src="/images/about.png" 
              alt="About MaaKarni Interior" 
              className="w-full h-full object-cover shadow-2xl rounded-sm"
            />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#d4af37] hidden md:block -z-10" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -top-8 -left-8 w-32 h-32 border-2 border-[#d4af37] hidden md:block -z-10" 
            />
          </motion.div>
          <motion.div style={{ y: mobile ? 0 : textY }} className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="text-gray-600 dark:text-gray-400 mb-6 text-lg font-light leading-relaxed transition-colors duration-500">
              {/* Mobile Text */}
              <p className="block lg:hidden">
                Your environment shapes your well-being. MaaKarni Interior creates spaces that are both visually stunning and inherently comforting.
              </p>
              {/* Desktop Text */}
              <p className="hidden lg:block font-iceland tracking-wide text-2xl text-justify">
                Founded on the principle that your environment profoundly shapes your well-being, MaaKarni Interior was established to create spaces that are not only visually stunning but inherently comforting.
              </p>
            </div>
            <div className="text-gray-600 dark:text-gray-400 mb-10 text-lg font-light leading-relaxed transition-colors duration-500">
              {/* Mobile Text */}
              <p className="block lg:hidden">
                We blend timeless elegance with modern functionality, ensuring every space is unique and tailored to your lifestyle.
              </p>
              {/* Desktop Text */}
              <p className="hidden lg:block font-iceland tracking-wide text-2xl text-justify">
                Our team of award-winning designers blends timeless elegance with modern functionality, curating materials and bespoke pieces from around the globe to ensure your space is truly one of a kind.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1), type: "spring" }}
                  className="border-l-2 border-[#d4af37] pl-4"
                >
                  <div className="text-4xl font-iceland font-bold text-[#1a1a1a] dark:text-white mb-1 transition-colors duration-500 uppercase tracking-wide">{stat.value}</div>
                  <div className="text-xl text-gray-500 dark:text-gray-400 font-iceland uppercase tracking-wider transition-colors duration-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
