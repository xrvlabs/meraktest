import { Instagram, ArrowRight, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const posts = [
  { id: 1, img: '/images/hero.png', likes: '1.2k', comments: '84' },
  { id: 2, img: '/images/about.png', likes: '890', comments: '42' },
  { id: 3, img: '/images/service_residential.png', likes: '2.4k', comments: '156' },
  { id: 4, img: '/images/portfolio_1.png', likes: '3.1k', comments: '210' },
  { id: 5, img: '/images/portfolio_2.png', likes: '1.5k', comments: '98' },
  { id: 6, img: '/images/service_commercial.png', likes: '4.2k', comments: '315' },
];

export default function InstagramFeed() {
  return (
    <section className="pt-8 pb-8 md:pt-12 md:pb-12 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center md:flex-row md:items-end justify-between mb-12 text-center md:text-left gap-6 md:gap-0">
          <div className="max-w-2xl flex flex-col items-center md:items-start">
            <motion.h4
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#d4af37] font-iceland font-bold tracking-[0.3em] uppercase mb-3 flex items-center justify-center md:justify-start gap-2 text-2xl"
            >
              <Instagram size={22} /> On Instagram
            </motion.h4>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl font-bold text-[#1a1a1a] dark:text-white transition-colors duration-500"
            >
              @maakarni.interior
            </motion.h2>
          </div>

          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href="#"
            className="hidden md:flex items-center gap-2 text-[#1a1a1a] dark:text-white hover:text-[#d4af37] dark:hover:text-[#d4af37] font-iceland uppercase tracking-[0.2em] text-xl transition-colors group"
          >
            Follow Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>

      {/* Infinite Marquee Feed */}
      <div className="relative w-full flex overflow-x-hidden">
        <motion.div
          animate={{ x: [0, -2016] }} // 6 images * (320px width + 16px gap) = 2016px
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35
          }}
          className="flex whitespace-nowrap gap-4 px-2"
        >
          {/* Duplicate feed multiple times for seamless looping */}
          {[...posts, ...posts, ...posts].map((post, index) => (
            <div
              key={index}
              className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] shrink-0 cursor-pointer overflow-hidden rounded-sm group"
            >
              <img src={post.img} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

              {/* Insta-style Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <Heart fill="white" size={24} /> {post.likes}
                </div>
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <MessageCircle fill="white" size={24} /> {post.comments}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-6 mt-8 text-center md:hidden">
        <a href="#" className="inline-flex items-center gap-2 text-[#1a1a1a] dark:text-white hover:text-[#d4af37] dark:hover:text-[#d4af37] font-iceland uppercase tracking-[0.2em] text-xl transition-colors group">
          Follow Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

    </section>
  );
}
