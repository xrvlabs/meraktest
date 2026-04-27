import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  { id: 1, title: 'The Sapphire Villa', location: 'Beverly Hills', category: 'Luxury Villa', image: '/images/portfolio_1.png', size: 'large' },
  { id: 2, title: 'Modern Culinary Art', location: 'Downtown Penthouse', category: 'Kitchen', image: '/images/portfolio_2.png', size: 'small' },
  { id: 3, title: 'Corporate Oasis', location: 'Tech District', category: 'Office', image: '/images/service_commercial.png', size: 'small' },
  { id: 4, title: 'Urban Retreat', location: 'Midtown Skyline', category: 'Living Room', image: '/images/service_residential.png', size: 'medium' },
  { id: 5, title: 'Opulent Rest', location: 'Malibu Coast', category: 'Bedroom', image: '/images/portfolio_1.png', size: 'medium' },
  { id: 6, title: 'The Executive Suite', location: 'Financial District', category: 'Office', image: '/images/about.png', size: 'large' },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(projects.map(p => p.category))];
    return cats.map((cat, index) => ({
      id: cat,
      label: cat,
      index: (index + 1).toString().padStart(2, '0'),
      count: cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length
    }));
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="pt-16 pb-8 md:pt-32 md:pb-12 bg-[#fafafa] dark:bg-[#080808] text-[#1a1a1a] dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8">
        <div className="flex flex-col mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="w-16 h-[1px] bg-[#d4af37]"></span>
                <span className="text-[#d4af37] font-semibold tracking-[0.4em] uppercase text-[10px]">Portfolio Exhibition</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="font-serif text-6xl md:text-8xl font-light mb-8 leading-[0.9] tracking-tight"
              >
                Timeless <span className="italic font-normal">Spaces</span>, <br />Modern <span className="italic font-normal text-[#d4af37]">Living</span>.
              </motion.h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden lg:flex flex-col items-end text-right"
            >
              <div className="text-5xl font-serif text-[#d4af37] mb-2">{projects.length}</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gray-400">Total Masterpieces</div>
            </motion.div>
          </div>

          {/* Unique Category Navigation */}
          <div className="mt-20 relative">
            <div className="flex flex-nowrap md:flex-wrap items-center gap-x-10 gap-y-8 border-b border-gray-200 dark:border-gray-800 pb-4 md:pb-10 overflow-x-auto scrollbar-hide no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className="relative group py-2 flex items-start gap-1 transition-all shrink-0"
                >
                  <div className="flex flex-col items-start">
                    <span className={`text-[9px] font-mono mb-1 transition-colors duration-300 ${
                      activeFilter === category.id ? 'text-[#d4af37]' : 'text-gray-400'
                    }`}>
                      {category.index}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xl md:text-2xl font-serif tracking-tight transition-all duration-500 ${
                        activeFilter === category.id 
                          ? 'text-[#1a1a1a] dark:text-white' 
                          : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                      }`}>
                        {category.label}
                      </span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border transition-all duration-500 ${
                        activeFilter === category.id
                          ? 'bg-[#d4af37] border-[#d4af37] text-white'
                          : 'border-gray-200 dark:border-gray-800 text-gray-400'
                      }`}>
                        {category.count}
                      </span>
                    </div>
                  </div>
                  
                  {activeFilter === category.id && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute -bottom-[17px] md:-bottom-[41px] left-0 right-0 h-[4px] bg-[#d4af37] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      transition={{ type: "spring", stiffness: 300, damping: 35 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div 
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="columns-2 lg:columns-3 gap-3 md:gap-8 space-y-3 md:space-y-8"
          >
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="break-inside-avoid mb-3 md:mb-8 group relative flex flex-col bg-white dark:bg-[#0f0f0f] p-1.5 md:p-3 rounded-xl md:rounded-2xl border border-gray-100 dark:border-gray-800/50 shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                <div className={`relative overflow-hidden rounded-lg md:rounded-xl ${
                  project.size === 'large' ? 'aspect-[3/4]' : 
                  project.size === 'medium' ? 'aspect-square' : 
                  'aspect-[4/3]'
                }`}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-700">
                  </div>
                </div>

                <div className="pt-2 md:pt-4 px-1 md:px-2 pb-1 md:pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-1.5">
                        <span className="w-3 md:w-6 h-[1px] bg-[#d4af37]"></span>
                        <span className="text-[#d4af37] text-[8px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold truncate">{project.category}</span>
                      </div>
                      <h3 className="text-lg md:text-3xl font-serif font-medium mb-0 group-hover:text-[#d4af37] transition-colors duration-500 leading-tight">
                        {project.title}
                      </h3>
                    </div>
                    <div className="w-6 h-6 md:w-12 md:h-12 flex items-center justify-center border border-gray-100 dark:border-gray-800 rounded-full group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500 group-hover:rotate-45 shrink-0 ml-2 mt-1">
                      <ArrowUpRight className="text-gray-300 group-hover:text-white transition-colors w-3 h-3 md:w-5 md:h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}


