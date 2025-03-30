import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, Award } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
    }`}>
      <div className="container-custom flex items-center justify-between py-4">
        <a href="#" className="text-xl font-display font-bold text-foreground flex items-center">
          <Award className="text-primary mr-2" size={24} />
          Anand Salunkhe<span className="text-primary">.</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors relative overflow-hidden group"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            <span className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
        
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors mr-2 relative overflow-hidden group"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            <span className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full backdrop-blur-lg transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? "max-h-64 opacity-100 shadow-md bg-background/90" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col space-y-4 p-6">
          <a 
            href="#projects" 
            className="nav-link" 
            onClick={toggleMobileMenu}
          >
            Projects
          </a>
          <a 
            href="#about" 
            className="nav-link" 
            onClick={toggleMobileMenu}
          >
            About
          </a>
          <a 
            href="#contact" 
            className="nav-link" 
            onClick={toggleMobileMenu}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
