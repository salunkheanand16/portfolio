
import { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  
  // Particle class for background animation
  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = `hsla(var(--primary), ${Math.random() * 0.3 + 0.2})`;
      this.ctx = ctx;
    }

    update(canvas: HTMLCanvasElement) {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize particles when canvas is resized
      particlesRef.current = [];
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 150);
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(canvas, ctx));
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach(particle => {
        particle.update(canvas);
        particle.draw();
      });
      
      // Draw connections between particles
      particlesRef.current.forEach(particleA => {
        particlesRef.current.forEach(particleB => {
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(var(--primary), ${0.2 - (distance / 100) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 pb-8 relative overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full -z-10" 
      />
      
      <div className="container-custom text-center relative z-10">
        <div className={`space-y-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Creating <span className="text-primary">stunning</span> digital experiences
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm bg-background/20 p-4 rounded-lg">
            A portfolio of modern, responsive, and beautifully crafted web applications and digital solutions.
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#projects" className="button-primary relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              View Projects
            </a>
            <a href="#contact" className="button-secondary backdrop-blur-sm bg-background/30 hover:bg-background/50 transition-all duration-300">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <a href="#projects" className="p-2 rounded-full bg-background/30 backdrop-blur-md hover:bg-secondary/80 transition-colors">
          <ChevronDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
