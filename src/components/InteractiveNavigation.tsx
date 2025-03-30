import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';
import { X, Menu, ChevronDown, ChevronUp, Home, Rocket, User, Mail, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const InteractiveNavigation = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showNavigation, setShowNavigation] = useState(false);
  const navigationRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const sections = ['hero', 'projects', 'about', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navigationRef.current && 
        !navigationRef.current.contains(event.target as Node) &&
        showNavigation
      ) {
        setShowNavigation(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNavigation]);

  const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  const navLinks = [
    { id: 'hero', label: 'Home', icon: <Home size={18} strokeWidth={2} /> },
    { id: 'projects', label: 'Projects', icon: <Rocket size={18} strokeWidth={2} /> },
    { id: 'about', label: 'About', icon: <User size={18} strokeWidth={2} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} strokeWidth={2} /> },
  ];

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setShowNavigation(false);
    }
  };

  const variants = {
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1, 
        when: "beforeChildren" 
      } 
    },
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.05, 
        staggerDirection: -1, 
        when: "afterChildren" 
      } 
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    },
    closed: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <div 
      ref={navigationRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="text-xl font-display font-bold text-foreground flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="mr-2 text-primary relative"
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut"
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </motion.div>
            <span className="font-medium">Anand</span><span className="text-primary font-bold"> Salunkhe</span>
          </motion.div>

          {isMobile ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleNavigation}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label={showNavigation ? "Close menu" : "Open menu"}
            >
              {showNavigation ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          ) : (
            <div className="flex items-center gap-4">
              <motion.nav 
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {navLinks.map((link) => (
                  <motion.button
                    key={link.id}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: activeSection === link.id ? "rgba(var(--primary-rgb), 0.9)" : "rgba(var(--secondary-rgb), 0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-4 py-2 rounded-full transition-all duration-300 overflow-hidden ${
                      activeSection === link.id 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-secondary/30"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-current">{link.icon}</span>
                      <span>{link.label}</span>
                    </span>
                    
                    {activeSection === link.id && (
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-current" 
                        layoutId="activeIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.nav>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMobile && (
          <motion.div
            variants={variants}
            initial="closed"
            animate={showNavigation ? "open" : "closed"}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2">
              <motion.nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.id}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.03,
                      x: 5
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeSection === link.id 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-secondary/30"
                    }`}
                  >
                    <span className="flex items-center justify-between w-full">
                      <span className="flex items-center gap-2">
                        <span className="text-current">{link.icon}</span>
                        <span>{link.label}</span>
                      </span>
                      {activeSection === link.id && (
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight size={16} className="text-current" />
                        </motion.div>
                      )}
                    </span>
                  </motion.button>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-primary"
        initial={{ width: "0%" }}
        animate={{ 
          width: `${Math.min((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%` 
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

export default InteractiveNavigation;
