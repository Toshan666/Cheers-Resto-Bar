import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin } from 'lucide-react';

interface HeaderProps {
  onCallNow: () => void;
  onGetDirections: () => void;
}

export default function Header({ onCallNow, onGetDirections }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'About', action: () => scrollToSection('about') },
    { label: 'Menu', action: () => scrollToSection('menu') },
    { label: 'Contact', action: () => scrollToSection('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-background">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-2xl md:text-3xl text-foreground">
              Cheers Resto Bar
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.label}
                onClick={link.action}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              onClick={onCallNow}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="font-paragraph px-6 py-2 border-2 border-accent-gold text-accent-gold bg-transparent rounded-lg hover:bg-accent-gold hover:text-primary-foreground transition-all duration-300 text-sm font-medium flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </motion.button>
            <motion.button
              onClick={onGetDirections}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-paragraph px-6 py-2 border-2 border-primary text-primary bg-transparent rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm font-medium flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Directions
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-background overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300 block w-full text-left py-2"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 space-y-3 border-t border-background">
                <button
                  onClick={() => {
                    onCallNow();
                    setIsMenuOpen(false);
                  }}
                  className="font-paragraph w-full px-6 py-3 border-2 border-accent-gold text-accent-gold bg-transparent rounded-lg hover:bg-accent-gold hover:text-primary-foreground transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </button>
                <button
                  onClick={() => {
                    onGetDirections();
                    setIsMenuOpen(false);
                  }}
                  className="font-paragraph w-full px-6 py-3 border-2 border-primary text-primary bg-transparent rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
