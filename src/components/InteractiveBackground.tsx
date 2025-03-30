import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set canvas dimensions with higher pixel density for retina displays
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(pixelRatio, pixelRatio);
    
    // Create particles
    const particlesArray: Particle[] = [];
    // Adjust number of particles based on screen size for better performance
    const numberOfParticles = Math.min(Math.floor((width * height) / 12000), 80);
    
    // Enhanced color palette based on theme
    const primaryColor = theme === 'dark' 
      ? 'rgba(173, 255, 241, 0.4)' 
      : 'rgba(0, 184, 148, 0.4)';
    const secondaryColor = theme === 'dark' 
      ? 'rgba(255, 207, 122, 0.4)' 
      : 'rgba(255, 177, 66, 0.4)';
    const tertiaryColor = theme === 'dark' 
      ? 'rgba(147, 130, 255, 0.4)' 
      : 'rgba(99, 66, 255, 0.4)';
    const accentColor = theme === 'dark'
      ? 'rgba(255, 156, 205, 0.4)'
      : 'rgba(255, 105, 180, 0.4)';
    
    // Gradient background setup
    const createGradientBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      if (theme === 'dark') {
        gradient.addColorStop(0, 'rgba(10, 15, 30, 0.2)');
        gradient.addColorStop(1, 'rgba(15, 20, 40, 0.2)');
      } else {
        gradient.addColorStop(0, 'rgba(245, 250, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(240, 245, 255, 0.2)');
      }
      return gradient;
    };
    
    // Create a subtle light beam effect
    class LightBeam {
      x: number;
      y: number;
      size: number;
      angle: number;
      speed: number;
      intensity: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 200 + 100;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.001 + 0.001;
        this.intensity = Math.random() * 0.05 + 0.05;
      }
      
      update() {
        this.angle += this.speed;
        
        // Rotate around center point
        this.x = width/2 + Math.cos(this.angle) * this.size;
        this.y = height/2 + Math.sin(this.angle) * this.size;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        
        const color = theme === 'dark' 
          ? `rgba(150, 180, 255, ${this.intensity})` 
          : `rgba(100, 150, 255, ${this.intensity})`;
        
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Enhanced particle class with fluid movement
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      originalX: number;
      originalY: number;
      density: number;
      force: number;
      angle: number;
      directionChangeTime: number;
      lastDirectionChange: number;
      wobbleSpeed: number;
      wobbleAngle: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.originalX = this.x;
        this.originalY = this.y;
        this.baseSize = Math.random() * 4 + 1;
        this.size = this.baseSize;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        
        // More varied and vibrant colors
        const colorRandom = Math.random();
        if (colorRandom > 0.75) {
          this.color = accentColor;
        } else if (colorRandom > 0.5) {
          this.color = primaryColor;
        } else if (colorRandom > 0.25) {
          this.color = secondaryColor;
        } else {
          this.color = tertiaryColor;
        }
        
        this.density = Math.random() * 25 + 5;
        this.force = 0;
        this.angle = 0;
        this.directionChangeTime = Math.random() * 200 + 50;
        this.lastDirectionChange = 0;
        
        // Add subtle wobble movement
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobbleAngle = Math.random() * Math.PI * 2;
      }
      
      // Update particle position with more natural movement
      update(mouseX: number, mouseY: number, frame: number) {
        // Mouse interaction with improved physics
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 180;
        
        if (distance < maxDistance) {
          this.force = (maxDistance - distance) / maxDistance;
          this.angle = Math.atan2(dy, dx);
          
          // Apply easing to the movement for more natural feel
          const pushX = Math.cos(this.angle) * this.force * this.density;
          const pushY = Math.sin(this.angle) * this.force * this.density;
          
          this.x -= pushX * 0.075;
          this.y -= pushY * 0.075;
          
          // Grow size slightly when interacted with
          this.size = this.baseSize + this.force * 2;
        } else {
          // Return particles to original position with easing
          if (this.x !== this.originalX) {
            const dx = this.x - this.originalX;
            this.x -= dx * 0.03;
          }
          if (this.y !== this.originalY) {
            const dy = this.y - this.originalY;
            this.y -= dy * 0.03;
          }
          
          this.size = this.baseSize;
          
          // Periodically change direction for more natural movement
          this.lastDirectionChange++;
          if (this.lastDirectionChange >= this.directionChangeTime) {
            this.speedX = Math.random() * 0.6 - 0.3;
            this.speedY = Math.random() * 0.6 - 0.3;
            this.lastDirectionChange = 0;
            this.directionChangeTime = Math.random() * 200 + 50;
          }
        }
        
        // Add wobble movement
        this.wobbleAngle += this.wobbleSpeed;
        const wobbleX = Math.sin(this.wobbleAngle) * 0.3;
        const wobbleY = Math.cos(this.wobbleAngle) * 0.3;
        
        // Normal movement with wobble
        this.x += this.speedX + wobbleX;
        this.y += this.speedY + wobbleY;
        
        // Improved boundary check with bounce effect
        if (this.x > width || this.x < 0) {
          this.speedX = -this.speedX * 0.8;
          if (this.x > width) this.x = width;
          if (this.x < 0) this.x = 0;
        }
        
        if (this.y > height || this.y < 0) {
          this.speedY = -this.speedY * 0.8;
          if (this.y > height) this.y = height;
          if (this.y < 0) this.y = 0;
        }
      }
      
      // Draw particle with subtle glow effect
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        
        // Create soft glow effect around particle
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        
        const baseColor = this.color.replace(/[^,]+(?=\))/, '0.8');
        const outerColor = this.color.replace(/[^,]+(?=\))/, '0');
        
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(1, outerColor);
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw core of particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = baseColor;
        ctx.fill();
      }
    }
    
    // Create lighting beams
    const lightBeams: LightBeam[] = [];
    const numberOfBeams = 3;
    
    const createLightBeams = () => {
      lightBeams.length = 0;
      for (let i = 0; i < numberOfBeams; i++) {
        lightBeams.push(new LightBeam());
      }
    };
    
    // Create particles
    const init = () => {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
      createLightBeams();
    };
    
    // Mouse position with smoothing
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.x;
      targetMouseY = e.y;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Touch position for mobile with smoothing
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      targetMouseX = e.touches[0].clientX;
      targetMouseY = e.touches[0].clientY;
    };
    
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Frame counter for timing effects
    let frame = 0;
    
    // Animate particles with smoother rendering
    const animate = () => {
      frame++;
      
      // Apply mouse smoothing for more fluid interaction
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      
      // Clear screen with subtle gradient background
      ctx.fillStyle = createGradientBackground();
      ctx.fillRect(0, 0, width, height);
      
      // Draw light beams
      for (let i = 0; i < lightBeams.length; i++) {
        lightBeams[i].update();
        lightBeams[i].draw(ctx);
      }
      
      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mouseX, mouseY, frame);
        particlesArray[i].draw(ctx);
      }
      
      // Draw connections with improved opacity and color blending
      connectParticles();
      
      requestAnimationFrame(animate);
    };
    
    // Connect particles with lines, improved visual quality
    const connectParticles = () => {
      // Optimize connection algorithm by checking fewer pairs
      const checkDistance = 150;
      const connectionOpacity = theme === 'dark' ? 0.15 : 0.1;
      
      ctx.lineWidth = 0.5;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < checkDistance) {
            // Create a smooth gradient opacity based on distance
            const opacity = ((checkDistance - distance) / checkDistance) * connectionOpacity;
            
            // Get colors from both particles to create gradient
            const colorA = particlesArray[a].color.replace(/[^,]+(?=\))/, `${opacity}`);
            const colorB = particlesArray[b].color.replace(/[^,]+(?=\))/, `${opacity}`);
            
            // Create gradient line
            const gradient = ctx.createLinearGradient(
              particlesArray[a].x, particlesArray[a].y,
              particlesArray[b].x, particlesArray[b].y
            );
            
            gradient.addColorStop(0, colorA);
            gradient.addColorStop(1, colorB);
            
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Handle window resize with debounce for performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        
        // Update canvas dimensions for retina displays
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(pixelRatio, pixelRatio);
        
        // Recreate particles on resize
        init();
      }, 200);
    };
    
    // Initialize and start animation
    init();
    animate();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      clearTimeout(resizeTimeout);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 opacity-60"
      style={{ mixBlendMode: theme === 'dark' ? 'screen' : 'multiply' }}
    />
  );
};

export default InteractiveBackground;
