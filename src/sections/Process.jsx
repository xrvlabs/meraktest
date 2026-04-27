import { motion } from 'framer-motion';

const steps = [
  { number: '01', title: 'Consultation', desc: 'We begin with an in-depth discussion to understand your vision, lifestyle, and specific requirements for the space.' },
  { number: '02', title: 'Concept Design', desc: 'Our team develops comprehensive mood boards, 3D renderings, and material palettes for your approval.' },
  { number: '03', title: 'Execution', desc: 'We manage every aspect of the build, coordinating with master craftsmen and contractors to ensure perfection.' },
  { number: '04', title: 'Final Styling', desc: 'The finishing touch: placing art, decor, and bespoke furniture to bring the design concept to vibrant life.' },
];

export default function Process() {
  return (
    <section id="process" className="py-12 md:py-24 bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#d4af37] font-medium tracking-widest uppercase mb-2"
          >
            How We Work
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl font-bold text-[#1a1a1a] dark:text-white transition-colors duration-500"
          >
            Our Design Process
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-gray-200 dark:bg-gray-800 -z-10 origin-left" 
          />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.3, type: "spring" }}
              className="relative group"
            >
              <div className="w-24 h-24 bg-white dark:bg-[#111] rounded-full border border-gray-100 dark:border-gray-800 shadow-xl flex items-center justify-center mx-auto mb-8 relative transition-colors duration-500">
                <span className="font-serif text-3xl font-bold text-[#d4af37] group-hover:scale-125 transition-transform duration-500">{step.number}</span>
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1.15 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.3, duration: 0.5 }}
                  className="absolute inset-0 rounded-full border border-[#d4af37] opacity-50" 
                />
              </div>
              <div className="text-center bg-white dark:bg-[#111] p-8 border border-gray-50 dark:border-gray-800 shadow-sm group-hover:shadow-xl dark:group-hover:shadow-[#d4af37]/5 transition-all duration-300 h-full rounded-sm">
                <h3 className="text-xl font-serif font-semibold text-[#1a1a1a] dark:text-white mb-4 transition-colors duration-500">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed transition-colors duration-500">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
