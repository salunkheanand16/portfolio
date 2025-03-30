import { useEffect, useState, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Download, ExternalLink, User, Briefcase, Code, Github, Linkedin, Mail, Phone, MapPin, Twitter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

// Professional gradient background
const GradientBackground = () => {
  const { theme } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.sin(Date.now() * 0.001) * 20,
        y: Math.cos(Date.now() * 0.001) * 20
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-60">
      <div 
        className="absolute w-full h-full"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at center, rgba(173, 216, 230, 0.15), transparent 60%), radial-gradient(circle at 70% 40%, rgba(147, 147, 190, 0.1), transparent 50%)' 
            : 'radial-gradient(circle at center, rgba(0, 112, 148, 0.05), transparent 60%), radial-gradient(circle at 70% 40%, rgba(99, 99, 150, 0.05), transparent 50%)'
        }}
      ></div>
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle, rgba(173, 216, 230, 0.15), transparent 70%)' 
            : 'radial-gradient(circle, rgba(0, 112, 148, 0.05), transparent 70%)',
          top: `calc(30% + ${position.y}px)`,
          left: `calc(50% + ${position.x}px)`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.5s ease-out'
        }}
      ></div>
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle, rgba(190, 190, 220, 0.15), transparent 70%)' 
            : 'radial-gradient(circle, rgba(120, 120, 180, 0.05), transparent 70%)',
          bottom: `calc(30% - ${position.y}px)`,
          right: `calc(30% - ${position.x}px)`,
          transition: 'all 0.5s ease-out'
        }}
      ></div>
    </div>
  );
};

// Professional typing effect component
const TypedText = ({ textArray, speed = 100, delay = 1000 }: { textArray: string[], speed?: number, delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (!textArray.length) return;
    
    let timer: NodeJS.Timeout;
    
    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(timer);
    }
    
    if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(textArray[index].substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, speed / 2);
      } else {
        setIsDeleting(false);
        setIndex((index + 1) % textArray.length);
      }
      return () => clearTimeout(timer);
    }
    
    if (charIndex < textArray[index].length) {
      timer = setTimeout(() => {
        setDisplayText(textArray[index].substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, speed);
    } else {
      setIsPaused(true);
    }
    
    return () => clearTimeout(timer);
  }, [textArray, index, charIndex, isDeleting, isPaused, speed, delay]);
  
  return (
    <span className="relative">
      {displayText}
      <span className="absolute right-[-8px] top-0 h-full w-[2px] bg-primary animate-blink"></span>
    </span>
  );
};

const EnhancedHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 0.5], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!backgroundRef.current) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const moveX = (clientX - innerWidth / 2) / (innerWidth / 2) * -15;
    const moveY = (clientY - innerHeight / 2) / (innerHeight / 2) * -15;
    
    backgroundRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };
  
  const showExpertise = () => {
    toast({
      title: "Technical Skills",
      description: "Python, Java, JavaScript, C, C++, SQL, React, Next.js, Tailwind CSS, Machine Learning, Data Analysis, Full-Stack Development, DevOps, Cloud Computing, AWS, Azure, Docker, Kubernetes, CI/CD, Git/GitHub, Testing Frameworks, Microservices, API Design, MongoDB, PostgreSQL, Firebase, HTML5/CSS3, Redux, Material UI, Responsive Design",
      duration: 5000,
    });
  };

  const typingTexts = [
    "Software Developer",
    "Electrical Engineer",
    "Machine Learning Engineer",
    "Full-Stack Developer",
    "Problem Solver"
  ];

  // Add contact information popup
  const showContactInfo = () => {
    toast({
      title: "Contact Information",
      description: "Anand Salunkhe | Surbhi Prestige, Kasba Peth, Pune - 411011 | salunkheanand16@gmail.com | +91-7666956340",
      duration: 7000,
    });
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Professional gradient background */}
      <GradientBackground />
      
      {/* Background Elements */}
      <motion.div
        ref={backgroundRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute top-32 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </motion.div>
      
      <div className="container-custom text-center relative z-10">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight inline-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <motion.span 
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
              whileHover={{ scale: 1.02 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.1}
            >
              Anand <span className="text-primary relative">
                Salunkhe
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                />
              </span>
            </motion.span>
          </motion.h1>
          
          <motion.div
            className="text-xl md:text-2xl font-medium text-muted-foreground max-w-3xl mx-auto p-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <TypedText textArray={typingTexts} speed={80} delay={2000} />
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm bg-background/20 p-4 rounded-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Detail-oriented engineering graduate with strong foundation in software development and computer engineering principles. Proficient in Python, Java, C++ and data structures & algorithms with a focus on machine learning and full-stack development.
          </motion.p>

          <motion.div
            className="flex justify-center space-x-5 mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <a href="mailto:salunkheanand16@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
            <a href="tel:+917666956340" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Phone">
              <Phone className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/salunkheanand16/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/salunkheanand16" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/salunkheanand16" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <button onClick={showContactInfo} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Location">
              <MapPin className="w-5 h-5" />
            </button>
          </motion.div>
          
          <motion.div 
            className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <motion.button
              onClick={handleScrollDown}
              className="button-primary relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                View Portfolio
              </span>
            </motion.button>
            
            <motion.div className="flex gap-2">
              <motion.button
                onClick={showExpertise}
                className="button-secondary backdrop-blur-sm bg-background/30 hover:bg-background/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Skills
                </span>
              </motion.button>
              
              <motion.a
                href="https://drive.google.com/file/d/1A7hrnqV5ssOc_Sjpr4Ba6_64JuxIGzM0/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="button-secondary backdrop-blur-sm bg-background/30 hover:bg-background/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {['Python', 'Java', 'JavaScript', 'Machine Learning', 'Full-Stack'].map((tech, index) => (
                <motion.div
                  key={tech}
                  className="px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm text-foreground flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -5, backgroundColor: theme === 'dark' ? 'rgba(173, 216, 230, 0.1)' : 'rgba(0, 112, 148, 0.1)' }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
        transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
      >
        <motion.button
          onClick={handleScrollDown}
          className="p-2 rounded-full bg-background/30 backdrop-blur-md hover:bg-secondary/80 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default EnhancedHero;
