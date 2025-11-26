import React, { useState, useEffect } from 'react';
import { Scissors, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ view, setView, isMenuOpen, setIsMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
                <Scissors className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Color Cut n More
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Sparkles className="w-3 h-3" />
                <span>Premium Hair-Stylist</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['home', 'services', 'booking', 'queue', 'stylist-dashboard'].map((item) => (
              <motion.button
                key={item}
                onClick={() => setView(item)}
                whileHover={{ y: -2 }}
                className={`relative font-semibold capitalize transition-colors ${view === item
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                  }`}
              >
                {item === 'home' ? 'Home' : item === 'booking' ? 'Book Now' : item === 'queue' ? 'Live Queue' : item === 'services' ? 'Services' : 'Stylist Area'}
                {view === item && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                  />
                )}
              </motion.button>
            ))}
            <a href="#contact" className="font-semibold text-gray-600 hover:text-indigo-600 transition">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button
              onClick={() => setView('booking')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">
                Get Started
              </div>
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 glass rounded-2xl p-6 space-y-4"
            >
              {['home', 'services', 'booking', 'queue', 'stylist-dashboard'].map((item) => (
                <button
                  key={item}
                  onClick={() => { setView(item); setIsMenuOpen(false); }}
                  className="block w-full text-left py-3 px-4 rounded-lg font-semibold hover:bg-indigo-50 transition capitalize"
                >
                  {item === 'home' ? 'Home' : item === 'booking' ? 'Book Now' : item === 'queue' ? 'Live Queue' : item === 'services' ? 'Services' : 'Stylist Area'}
                </button>
              ))}
              <button
                onClick={() => { setView('booking'); setIsMenuOpen(false); }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}