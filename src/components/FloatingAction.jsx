import { MessageSquare } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingAction() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [0, 1]);

  return (
    <motion.a
      href="#contact"
      style={{ scale }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 bg-[#d4af37] text-white p-4 rounded-full shadow-2xl dark:shadow-[#d4af37]/20 flex items-center justify-center hover:bg-[#b5952f] transition-colors"
    >
      <MessageSquare size={24} />
    </motion.a>
  );
}
