import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  { name: 'Eleanor Vance', role: 'Homeowner', text: 'MaaKarni Interior transformed our empty house into a warm, incredibly luxurious home. Their attention to detail and understanding of space is simply unmatched.', rating: 5 },
  { name: 'Richard Sterling', role: 'CEO, Sterling Tech', text: 'The commercial office redesign exceeded our expectations. It reflects our brand prestige perfectly and has genuinely improved team morale.', rating: 5 },
  { name: 'Sophia Laurent', role: 'Boutique Owner', text: 'Working with MaaKarni Interior was a dream. They took my vague ideas and turned them into a stunning, cohesive reality. Truly a world-class design firm.', rating: 5 },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-24 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h4 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
            className="text-[#d4af37] font-medium tracking-widest uppercase mb-2"
          >
            Client Stories
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl font-bold text-[#1a1a1a] dark:text-white transition-colors duration-500"
          >
            What They Say About Us
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotate: index % 2 === 0 ? -5 : 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2, type: "spring", bounce: 0.4 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="bg-[#fafafa] dark:bg-[#111] p-10 border border-gray-100 dark:border-gray-800 hover:shadow-2xl dark:hover:shadow-[#d4af37]/10 transition-all duration-500 relative rounded-sm group"
            >
              <Quote className="text-[#d4af37] opacity-20 absolute top-8 right-8 group-hover:scale-150 transition-transform duration-700 group-hover:rotate-12" size={48} />
              <div className="flex text-[#d4af37] mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2 + i * 0.1 }}
                  >
                    <Star size={18} fill="currentColor" />
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-light italic leading-relaxed mb-8 relative z-10 transition-colors duration-500">
                "{review.text}"
              </p>
              <div>
                <h4 className="font-serif font-semibold text-[#1a1a1a] dark:text-white text-lg transition-colors duration-500">{review.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-widest mt-1 transition-colors duration-500">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
