import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Building2, PaintBucket, Sofa, Grid, Ruler } from 'lucide-react';

const services = [
  { 
    icon: <Home size={32} />, 
    title: 'Residential Design', 
    desc: 'Crafting luxurious and comfortable living spaces tailored to your lifestyle.',
    mobileDesc: 'Luxury living spaces tailored to you.'
  },
  { 
    icon: <Building2 size={32} />, 
    title: 'Commercial Design', 
    desc: 'Elevating corporate environments to reflect brand prestige and inspire productivity.',
    mobileDesc: 'Prestige corporate environments.'
  },
  { 
    icon: <Grid size={32} />, 
    title: 'Modular Kitchens', 
    desc: 'State-of-the-art culinary spaces combining high-end aesthetics with maximum utility.',
    mobileDesc: 'High-end culinary spaces.'
  },
  { 
    icon: <Ruler size={32} />, 
    title: 'Space Planning', 
    desc: 'Strategic layout optimization to enhance flow, functionality, and spatial perception.',
    mobileDesc: 'Optimized spatial flow.'
  },
  { 
    icon: <Sofa size={32} />, 
    title: 'Furniture Styling', 
    desc: 'Curating and placing bespoke pieces that serve as functional art in your space.',
    mobileDesc: 'Bespoke furniture curation.'
  },
  { 
    icon: <PaintBucket size={32} />, 
    title: 'Renovation Consulting', 
    desc: 'Expert guidance through comprehensive remodels ensuring luxury finishes at every step.',
    mobileDesc: 'Expert renovation consulting.'
  },
];

function TiltCard({ service, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#fafafa] dark:bg-[#111] p-10 border border-gray-100 dark:border-gray-800 transition-colors duration-500 shadow-sm relative group cursor-crosshair rounded-sm snap-center"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="text-[#d4af37] mb-6 group-hover:scale-110 transition-transform duration-300"
      >
        {service.icon}
      </div>
      <h3 
        style={{ transform: "translateZ(30px)" }}
        className="text-2xl font-iceland font-bold text-[#1a1a1a] dark:text-white mb-4 transition-colors duration-500 uppercase tracking-wide"
      >
        {service.title}
      </h3>
      <p 
        style={{ transform: "translateZ(20px)" }}
        className="text-gray-600 dark:text-gray-400 font-iceland uppercase tracking-wide leading-relaxed transition-colors duration-500"
      >
        <span className="md:hidden">{service.mobileDesc}</span>
        <span className="hidden md:inline">{service.desc}</span>
      </p>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/0 dark:from-[#d4af37]/0 dark:via-[#d4af37]/10 dark:to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-12 md:py-24 bg-white dark:bg-[#050505] transition-colors duration-500 [perspective:1000px]">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <motion.h4 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-[#d4af37] font-iceland font-bold tracking-[0.3em] uppercase mb-2 text-lg"
          >
            Our Expertise
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-iceland text-4xl md:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-0 md:mb-6 transition-colors duration-500 uppercase tracking-wide"
          >
            <span className="block lg:hidden">Design Excellence</span>
            <span className="hidden lg:block whitespace-nowrap">Comprehensive Design Solutions</span>
          </motion.h2>
        </div>

        <div className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[60%] md:grid-flow-row md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 md:pb-0">
          {services.map((service, index) => (
            <TiltCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
