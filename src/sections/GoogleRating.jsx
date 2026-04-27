import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';

export default function GoogleRating({ isOpen, onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRate = (index) => {
    setRating(index);
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        window.open('https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID', '_blank');
        onClose();
      }, 1500);
    }, 600);
  };

  if (typeof window === 'undefined') return null;
  const isMobile = window.innerWidth < 768;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-pointer"
          />

          {/* Modal / Bottom Sheet */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.9, y: 20 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed z-[101] bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 shadow-2xl transition-colors duration-500
              ${isMobile 
                ? 'bottom-0 left-0 right-0 rounded-t-[32px] p-8 pb-12' 
                : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-2xl p-12'
              }`}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#1a1a1a] dark:hover:text-white transition-colors p-2"
            >
              <X size={24} />
            </button>

            <div className="text-center">
              <motion.h4 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#d4af37] font-iceland font-bold tracking-[0.3em] uppercase mb-4 text-lg"
              >
                Love our work?
              </motion.h4>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-iceland text-3xl md:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-8 uppercase tracking-widest leading-tight"
              >
                Rate Us On Google
              </motion.h2>

              <div className="flex justify-center items-center space-x-2 md:space-x-3 mb-10">
                {[1, 2, 3, 4, 5].map((index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20, 
                      delay: index * 0.05 
                    }}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => handleRate(index)}
                    className="relative group focus:outline-none"
                  >
                    <motion.div
                      animate={{ 
                        scale: (hover >= index || rating >= index) ? [1, 1.4, 1.2] : 1,
                        filter: (hover >= index || rating >= index) ? 'brightness(1.1)' : 'brightness(1)',
                      }}
                      transition={{ 
                        duration: 0.4,
                        times: [0, 0.6, 1],
                        ease: "easeOut"
                      }}
                    >
                      <Star 
                        size={isMobile ? 40 : 56} 
                        className={`transition-colors duration-500 ${
                          (hover >= index || rating >= index) 
                            ? 'fill-[#d4af37] text-[#d4af37]' 
                            : 'text-gray-200 dark:text-gray-800'
                        }`}
                        strokeWidth={1}
                      />
                    </motion.div>
                    
                    {/* Clean Flash Effect on click */}
                    {rating === index && (
                      <motion.div 
                        initial={{ scale: 0.5, opacity: 0.8, background: '#d4af37' }}
                        animate={{ scale: 3, opacity: 0 }}
                        className="absolute inset-0 rounded-full -z-10"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                  >
                    <p className="font-iceland text-xl text-[#d4af37] tracking-widest uppercase">Thank you for your feedback!</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Redirecting to Google Reviews...</p>
                  </motion.div>
                ) : (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="text-gray-500 dark:text-gray-400 font-light tracking-widest uppercase text-xs"
                  >
                    Your feedback helps us create better spaces.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
