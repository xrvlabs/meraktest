import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronDown } from 'lucide-react';

export default function Contact({ onFormSubmit }) {
  const [isInteracting, setIsInteracting] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const mapRef = useRef(null);
  const selectRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: 'Residential'
  });

  const projectTypes = ['Residential', 'Commercial', 'Kitchen', 'Other'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mapRef.current && !mapRef.current.contains(event.target)) {
        setIsInteracting(false);
      }
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePointerDown = () => {
    setIsInteracting(true);
  };

  const [isShaking, setIsShaking] = useState(false);
  const [errors, setErrors] = useState({ name: false, phone: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, phone, projectType } = formData;
    const newErrors = {
      name: !name.trim(),
      phone: phone.length < 10
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.phone) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    
    const whatsappMessage = `Hello MaaKarni Interior Designs 👋
    
I'm *${name}*. I would like to enquire about your *${projectType}* services.

*Details:*
Phone: +91 ${phone}

Please guide me further. Thank you!`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/917302200622?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Trigger the rating modal
    if (onFormSubmit) onFormSubmit();

    // Reset form after submission
    setFormData({
      name: '',
      phone: '',
      projectType: 'Residential'
    });
    setErrors({ name: false, phone: false });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    // Auto-capitalize name field
    if (name === 'name') {
      value = value.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSelectOption = (option) => {
    setFormData({ ...formData, projectType: option });
    setIsSelectOpen(false);
  };

  return (
    <section id="contact" className="pt-8 pb-[12px] md:pt-12 md:pb-24 bg-white dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-8 lg:mb-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h4 className="text-[#d4af37] font-iceland font-bold tracking-[0.3em] uppercase mb-2 md:mb-4 text-lg">Get in Touch</h4>
            <h2 className="font-iceland text-4xl md:text-6xl font-bold text-[#1a1a1a] dark:text-white mb-0 md:mb-8 transition-colors duration-500 leading-tight uppercase tracking-wide">
              <span className="md:hidden text-[2.5rem]">Build your space.</span>
              <span className="hidden md:inline">Let's build your <br /> dream space.</span>
            </h2>
            <p className="hidden md:block text-gray-600 dark:text-gray-400 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 max-w-xl">
              Book a consultation with our expert designers and begin the journey toward a more luxurious, thoughtfully designed environment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#fafafa] dark:bg-[#111] p-6 md:p-10 border border-gray-100 dark:border-gray-800 shadow-2xl dark:shadow-none transition-colors duration-500 rounded-sm"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-6 font-iceland uppercase tracking-widest">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    placeholder="ENTER YOUR NAME"
                    className={`w-full bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'} px-3 py-2 md:py-3 text-lg focus:outline-none focus:border-[#d4af37] dark:focus:border-[#d4af37] transition-all rounded-sm placeholder:opacity-50`} 
                  />
                </motion.div>
                
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Whatsapp Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-iceland tracking-tighter">+91</span>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel" 
                      maxLength="10"
                      placeholder="0000000000"
                      onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                      className={`w-full bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white border ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'} pl-12 pr-3 py-2 md:py-3 text-lg focus:outline-none focus:border-[#d4af37] dark:focus:border-[#d4af37] transition-all rounded-sm placeholder:opacity-50 font-iceland`} 
                    />
                  </div>
                </motion.div>
              </div>

              {/* Custom Dropdown */}
              <div className="relative" ref={selectRef}>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Project Type</label>
                <div 
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="w-full bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white border border-gray-200 dark:border-gray-800 px-3 py-2 md:py-3 text-lg cursor-pointer flex justify-between items-center transition-all rounded-sm"
                >
                  <span>{formData.projectType}</span>
                  <motion.div
                    animate={{ rotate: isSelectOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-[#d4af37]" />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {isSelectOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 w-full mt-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-xl rounded-sm overflow-hidden"
                    >
                      {projectTypes.map((type) => (
                        <div 
                          key={type}
                          onClick={() => handleSelectOption(type)}
                          className="px-4 py-3 hover:bg-[#d4af37]/10 dark:hover:bg-[#d4af37]/20 cursor-pointer transition-colors border-b last:border-b-0 border-gray-100 dark:border-gray-800"
                        >
                          {type}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button 
                animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className={`w-full py-4 ${isShaking ? 'bg-red-500 dark:bg-red-600' : 'bg-[#1a1a1a] dark:bg-[#d4af37]'} text-white font-iceland uppercase tracking-widest text-xl hover:bg-[#d4af37] dark:hover:bg-[#b5952f] transition-colors flex items-center justify-center rounded-sm`}
              >
                BOOK FREE CONSULTATION
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          ref={mapRef}
          className="w-full h-[400px] md:h-[500px] bg-gray-100 dark:bg-[#111] relative overflow-hidden group transition-all duration-500 rounded-[5px] border border-gray-200 dark:border-gray-800"
        >
          <div 
            onPointerDown={handlePointerDown}
            className={`absolute inset-0 z-20 ${isInteracting ? 'pointer-events-none' : 'pointer-events-auto cursor-grab'}`}
          />

          <div className="absolute inset-[-50px] pointer-events-auto">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d113874.29338167304!2d75.78727!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1714154400000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2) opacity(0.8)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
          
          <AnimatePresence>
            {!isInteracting && (
              <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md p-4 pr-8 border border-gray-200 dark:border-gray-800 shadow-xl rounded-sm"
                >
                  <div className="flex flex-col font-iceland uppercase tracking-widest">
                    <span className="text-[#d4af37] text-xs font-bold mb-1">Our Studio</span>
                    <h3 className="text-[#1a1a1a] dark:text-white text-2xl font-bold tracking-tight">MAA KARNI INTERIOR</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-light mt-1 tracking-wider">Jaipur, Rajasthan</p>
                  </div>
                  <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white/90 dark:bg-[#0a0a0a]/90 rotate-45 border-r border-b border-gray-200 dark:border-gray-800" />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/20 dark:from-black/20 to-transparent shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
        </motion.div>

      </div>
    </section>
  );
}
