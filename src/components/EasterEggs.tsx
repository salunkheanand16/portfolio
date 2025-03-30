import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { Command } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EasterEggsProps {
  children: React.ReactNode;
}

const EasterEggs = ({ children }: EasterEggsProps) => {
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { theme, toggleTheme } = useTheme();
  
  // Professional command menu options
  const shortcuts = [
    { key: 'theme', description: 'Toggle dark/light theme' },
    { key: 'skills', description: 'View professional skills' },
    { key: 'experience', description: 'View work experience' },
    { key: 'projects', description: 'Navigate to projects section' },
    { key: 'contact', description: 'View contact information' },
    { key: 'about', description: 'View information about this portfolio' },
  ];
  
  const [filteredShortcuts, setFilteredShortcuts] = useState(shortcuts);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Filter shortcuts based on input
  useEffect(() => {
    if (!inputValue) {
      setFilteredShortcuts(shortcuts);
      return;
    }
    
    const filtered = shortcuts.filter(shortcut => 
      shortcut.key.toLowerCase().includes(inputValue.toLowerCase()) ||
      shortcut.description.toLowerCase().includes(inputValue.toLowerCase())
    );
    
    setFilteredShortcuts(filtered);
    setSelectedIndex(0);
  }, [inputValue]);
  
  // Key commands
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command + K to open command menu
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandMenu(prev => !prev);
        return;
      }
      
      // Handle arrow navigation in command menu
      if (showCommandMenu) {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex(prev => 
              prev < filteredShortcuts.length - 1 ? prev + 1 : prev
            );
            break;
            
          case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
            break;
            
          case 'Enter':
            e.preventDefault();
            if (filteredShortcuts[selectedIndex]) {
              executeCommand(filteredShortcuts[selectedIndex].key);
              setShowCommandMenu(false);
            }
            break;
            
          case 'Escape':
            e.preventDefault();
            setShowCommandMenu(false);
            break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCommandMenu, filteredShortcuts, selectedIndex]);
  
  // Keyboard shortcut implementation
  useEffect(() => {
    const specialCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let codeIndex = 0;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      // Check if the pressed key matches the next key in the code sequence
      if (e.key.toLowerCase() === specialCode[codeIndex].toLowerCase()) {
        codeIndex++;
        
        // If we've reached the end of the code sequence, trigger the action
        if (codeIndex === specialCode.length) {
          showVisualEffect();
          toast({
            title: "Feature Activated",
            description: "You discovered a hidden feature with the keyboard shortcut.",
            duration: 5000
          });
          codeIndex = 0; // Reset for next time
        }
      } else {
        codeIndex = 0; // Reset if the sequence is broken
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  // Command execution functions
  const executeCommand = (command: string) => {
    switch (command) {
      case 'theme':
        toggleTheme();
        toast({
          title: "Theme Changed",
          description: `Switched to ${theme === 'dark' ? 'light' : 'dark'} mode`,
          duration: 3000
        });
        break;
        
      case 'skills':
        toast({
          title: "Professional Skills",
          description: "Frontend Development, UX/UI Design, React, TypeScript, TailwindCSS, ThreeJS",
          duration: 5000
        });
        break;
        
      case 'experience':
        toast({
          title: "Work Experience",
          description: "View the About section for detailed professional experience and qualifications.",
          duration: 5000
        });
        break;
        
      case 'projects':
        scrollToSection('projects');
        break;
        
      case 'contact':
        scrollToSection('contact');
        break;
        
      case 'about':
        toast({
          title: "About This Portfolio",
          description: "This interactive portfolio showcases professional work using modern web technologies including React, TypeScript, and TailwindCSS.",
          duration: 5000
        });
        break;
    }
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const showVisualEffect = () => {
    try {
      import('canvas-confetti').then(({ default: confetti }) => {
        const duration = 2 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }
  
        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
  
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
  
          const particleCount = 40 * (timeLeft / duration);
          
          confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          }));
          
          confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          }));
        }, 250);
      }).catch(err => {
        console.error("Failed to load visual effect:", err);
      });
    } catch (error) {
      console.error("Error with visual effect:", error);
    }
  };

  return (
    <div className={isAnimating ? "subtle-animation" : ""}>
      {/* Command + K pop-up menu */}
      <AnimatePresence>
        {showCommandMenu && (
          <motion.div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCommandMenu(false)}
          >
            <motion.div 
              className="w-full max-w-md bg-card shadow-lg rounded-lg border border-border overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                  <Command size={16} />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search commands..."
                    className="flex-1 bg-transparent border-none outline-none"
                    autoFocus
                  />
                </div>
              </div>
              
              <div className="py-2 max-h-80 overflow-auto">
                {filteredShortcuts.map((shortcut, index) => (
                  <div
                    key={shortcut.key}
                    className={`px-4 py-2 cursor-pointer hover:bg-secondary flex justify-between items-center ${
                      index === selectedIndex ? 'bg-secondary' : ''
                    }`}
                    onClick={() => {
                      executeCommand(shortcut.key);
                      setShowCommandMenu(false);
                    }}
                  >
                    <span className="font-medium">{shortcut.key}</span>
                    <span className="text-muted-foreground text-sm">{shortcut.description}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-2 border-t text-xs text-muted-foreground flex justify-between">
                <span>Press ↑ ↓ to navigate</span>
                <span>Press Enter to select</span>
                <span>Press Esc to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Command Tooltip */}
      <div className="fixed bottom-4 right-4 z-40">
        <motion.button
          className="p-2 bg-card border border-border rounded-full shadow-lg flex items-center gap-2 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCommandMenu(true)}
        >
          <Command size={14} />
          <span className="hidden sm:inline-block">Press</span> <kbd className="px-2 py-0.5 bg-secondary rounded text-xs">Ctrl+K</kbd>
        </motion.button>
      </div>
      
      {/* Main content with subtle animation if activated */}
      <style>{`
        .subtle-animation * {
          animation: subtle-move 2s infinite alternate ease-in-out;
        }
        
        .subtle-animation *:nth-child(2n) {
          animation-delay: 0.4s;
        }
        
        .subtle-animation *:nth-child(3n) {
          animation-delay: 0.6s;
        }
        
        @keyframes subtle-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-3px);
          }
        }
      `}</style>
      
      {children}
    </div>
  );
};

export default EasterEggs;
